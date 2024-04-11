// app.js
App({
    onLaunch() {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
          } else {
            wx.cloud.init({
              // env 参数说明：
              //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
              //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
              //   如不填则使用默认环境（第一个创建的环境）
              // env: 'my-env-id',
              traceUser: true,
            });
          }
    },
    onShow() {
		// 判断是否存在openid即用户是否已登录
		if(!this.globalData.userInfo.openId){
			wx.showLoading({
				title: '正在登录……',
				mask:true,
			})
			this.getOpenId();
		}
    },
    globalData: {
        userInfo: {
            openId:''
        }
    },
    // 获取openid的方法
    getOpenId: function () {
        // 获取openid
        wx.cloud.callFunction({
            name: 'shopping',
            data: {
                type: 'login'
            },
            success: res => {
                this.globalData.userInfo.openId = res.result.openid;
                console.log("我的openId", res.result.openid);
                this.isAdmin();
            },
            fail: err => {
                console.log(err);
                wx.showModal({
                    title: '提示',
                    content: '获取用户信息失败，请重试',
                    complete: (res) => { }
                })
            }
        })
    },
    // 判断是否为admin
    isAdmin: function () {
        var that = this;
        // 通过openid获取admin表中的数据 需要先在云数据库中先建立索引

        this.getDBPromise({
            db_name: "admin",
            entity: {
                openId: this.globalData.userInfo.openId
            }
        }).then(res => {
            wx.hideLoading();
            console.log("admin查询结果", res)
            if (res.data.length > 0) {
                this.globalData.isAdmin = true;
                // 跳转到admin管理界面
                wx.showModal({
                    title: '提示',
                    content: '检测到您是管理员身份，是否跳转到管理员界面？',
                    success: function (res) {
                        if (res.confirm) {
                            console.log("跳转到管理员界面");
                            wx.redirectTo({
                                url: '/pages/admin/index/index',
                            })
                        } else if (res.cancel) {
                            console.log("取消进入管理员页面")
                            setTimeout(wx.switchTab, 500, ({ url: "/pages/index/index" }));
                        }
                    },
                    fail: function (res) {
                        console.error(res)
                    },
                })
            } else {
                that.isNewUser();
            }
        })
    },
    	// 判断用户是否为新用户
	isNewUser:function(){
		// 通过openid获取admin表中的数据
		this.getDBPromise({
			db_name:'user',
			entity:{
				openId:this.globalData.userInfo.openId
			}
		}).then(res=>{
			var userInfo={
				openId:null,
				lastLoginTime:""+new Date().getTime(),
				LastLoginIp:null,
				status:1,
				defaultAddress:null
			};
			if(res.data.length == 0){
				// 获取用户信息
				userInfo.lastLoginTime = new Date().getTime()+"";
				userInfo.openId = this.globalData.userInfo.openId;
				userInfo.status = 1;
				userInfo.defaultAddress = this.globalData.userInfo.defaultAddress;
				userInfo.lastLoginTime = this.globalData.ip;
				// 添加新用户信息
				wx.cloud.database().collection('user').add({data:userInfo}).then(res=>{
					wx.hideLoading();
					wx.showToast({
						title: '登录成功',
						icon:'success',
					});
					setTimeout(wx.switchTab,500,({url:"/pages/index/index"}));
				})
			}else{
				userInfo = this.globalData.userInfo = res.data[0];
				// 更新用户信息
				userInfo.lastLoginTime = new Date().getTime()+"";
				wx.cloud.init();
				wx.cloud.database().collection('user').doc(userInfo._id).update({
					data:{
						lastLoginTime:userInfo.lastLoginTime,
						LastLoginIp:this.globalData.ip
					}
				}).then(res=>{
					// 用户更新成功
					console.log("用户信息更新成功:",res);
				}).catch(err=>{console.log("update:"+err);});
				wx.hideLoading();
				wx.showToast({
					title: '登录成功',
					icon:'success'
				});
				setTimeout(wx.switchTab,500,({url:"/pages/index/index"}))
			}
		}).catch(err=>{
			console.log("getDBPromise:"+err);
		})
	},
	// 根据请求参数对指定数据库进行查询操作
	getDBPromise(e){
		var db_name = e.db_name;
		var entity = e.entity;
		const db = wx.cloud.database();
		console.log("使用数据库：",db_name);
		return db.collection(db_name).where(entity).get();
    },
    // 查询指定数据库中所有数据
	getDBPromiseAll(e){
		var db_name = e.db_name;
		const db = wx.cloud.database();
		return db.collection(db_name).get();
	},
	getAddress:function(){
		var address = {
			openId:null,
			name:null,
			phone:null,
			postCode:null,
			province:null,
			city:null,
			detailInfo:null
		}
		return address;
	}
})
