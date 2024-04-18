// index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imageArray:[],
        array:[],
        image:'/image/曼陀罗.jpg'
	},
	// 上传图片
	takePicture(){
		wx.chooseMedia({
			count:1,
			mediaType:['image'],
			sourceType: ["album",'camera'],
			maxDuration: 30,
			camera: 'back',
			success:(res)=>{
				// console.log("图片",res)
				// console.log(res.tempFiles[0].tempFilePath)
                const tempFilePaths = res.tempFiles[0].tempFilePath;
                console.log(tempFilePaths);
				this.getB64ByUrl(tempFilePaths);
        this.setData({
          image:tempFilePaths
				})
			}
		})
	},
	// 开始识别
	plantIdentify(){
		if(!this.data.base64Img){
      this.setData({
        isShow:true
      })
    }
		this.getToken()
	},
  //图片转为base64
  getB64ByUrl(url){
    wx.getFileSystemManager().readFile({
      filePath:url,
      encoding:'base64',
      success:(res)=>{

        this.setData({
          base64Img:res.data
				})
      }
    })
  },
	// 获取token
	getToken(){
    wx.showLoading({
      title: '识别中...',
    })
    let client_id = "zxRNX905zpKMOEX857o6LLK9"
    let client_secret = "s9HmRIHShSMr25XMy0aAbpynwD6LguVW"
    wx.request({
    
      url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
      success:(res)=>{
        const token = res.data.access_token
        this.getResult(token)
      }
    })
	},
	//获取识别结果
  getResult(token){
		var that = this;
		wx.request({
			url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + token,
			method:'POST',
			data:{
			 image:this.data.base64Img,
			 baike_num:4
			},
			header:{
				'Content-Type':'application/x-www-form-urlencoded'
			},
			success:(res)=>{
				this.setData({
					result:that.resultFilter(res.data.result)
				})
				// 组合要传入的数据
				var recordObject = {
					image:this.data.image,
					result:this.data.result
				}
				this.data.array.push(recordObject)
				wx.setStorage({
					key: 'record',
					data: JSON.stringify(this.data.array),

				})
			},
			complete:()=>{
				wx.hideLoading()
                wx.switchTab({
                  url: '/pages/mine/mine',
                })
			}
		})
	 },
	 //result结果过滤
	 resultFilter(arr){
		//  console.log("arr",arr);
		 arr.forEach((item)=>{
			 item.score = (item.score.toFixed(4)*100).toFixed(2) + '%'
		 })
		 return arr
		 },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		
	}
})