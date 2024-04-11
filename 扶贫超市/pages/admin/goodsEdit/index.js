// pages/admin/goodsEdit/index.js
const app = getApp()
const cloud = wx.cloud;
const db = wx.cloud.database({});
Page({
    data: {
        goodsId: '',
        delImage: [],
        newAdd: [],
        imagesOldLen: 0,
        status: 1,
        iconUrl: '', //采用fileID
        changedUrl: 0,
        goodsClassify: '未分类',
        newLen: 0,
        countIndex: 6, //展示图片的张数限制为6张
        count: [1, 2, 3, 4, 5, 6, 7],
        imageList: [],
        isDisabled: true,
        goodStatus: ['下架', '出售中'],
        goodStatusIndex: '',
        categoriesArray: [],
        categoriesArrayIndex: 0,

    },
    onLoad(options) {
        var goodId = options.id//接收从商品管理页面传下来的商品Id
        this.setData({
            goodsId: goodId
        })
        this.getAllCategories()
        this.getGoodInfoById(goodId)
    },

    /** 通过商品名获取商品信息*/
    getGoodInfoById(goodId) {
        var that = this
        const db = wx.cloud.database(); //初始化数据库
        db.collection("goods").where({
            _id: goodId
        }).get().then(res => {
            console.log("res", res)
            //绑定基础数据
            that.setData({
                "iconUrl": res.data[0].iconUrl,
                "name": res.data[0].name,
                "price": res.data[0].price,
                "storage": res.data[0].storage,
                "status": res.data[0].status,
                'goodStatusIndex': res.data[0].status,
                "specification": res.data[0].specification,
                "goodsClassify": res.data[0].classify,
                "description": res.data[0].description
            })
            db.collection("goods_introduce").where({
                goodsId: goodId
            }).get().then(res => {
                // console.log(res)
                that.data.imagesOldLen = res.data[0].imagesUrl.length
                // console.log("原数组长：" + that.data.imagesOldLen)
                that.setData({
                    "text": res.data[0].text,
                    "imageList": res.data[0].imagesUrl,
                    "listLength": res.data[0].imagesUrl.length
                })

            })

        })
    },

    /** 关于按钮是否可编辑的事件 */
    changeIsDisabled() {
        var that = this
        this.setData({
            isDisabled: !that.data.isDisabled
        })
    },

    /** 商品出售还是下架的状态更改 */
    goodStatusChange(e) {
        this.setData({
            goodStatusIndex: e.detail.value
        })
    },

    /** 商品分类picker的监听 */
    categoriesArrayChange(e) {
        this.setData({
            categoriesArrayIndex: e.detail.value
        })
    },

    /**查询分类表，获取所有分类*/
    getAllCategories() {
        var that = this
        app.getDBPromiseAll({
            db_name: 'category',
        }).then(res => {
            console.log(res)
            that.setData({
                categories: res.data
            })
            this.categories2Array() //转分类数组
        })
    },

    /** 获取全部分类需要转为一个分类数组 */
    categories2Array() {
        var that = this
        for (var i = 0; i < this.data.categories.length; i++) {
            var temp = this.data.categories[i].cateName
            // console.log(temp)
            if (that.data.goodsClassify == temp) {
                that.setData({
                    categoriesArrayIndex: i
                })
            }
            this.data.categoriesArray.push(temp)
        }
        this.setData({
            categoriesArray: this.data.categoriesArray
        })
    },

    /** 表单收集信息 上传数据 */
    getInfo(e) {
        var that = this
        // 获取表单里的数据
        wx.showModal({
            title: '提示',
            content: '确认修改？',
            success: function (res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '请稍后....',
                        mask: true,
                        duration: 3000
                    })
                    var _description = e.detail.value.description
                    var _name = e.detail.value.name
                    var _price = e.detail.value.price
                    var _specification = e.detail.value.specification
                    var _storage = e.detail.value.storage
                    var _category = that.data.categoriesArray[that.data.categoriesArrayIndex]
                    var _goodStatus = that.data.goodStatusIndex //index为1代表出售中,这里非运算变成布尔值false
                    console.log("检查表单数据是否正确", _description, _name, _price, _specification, _storage, _category, _goodStatus)
                    if (that.checkValidate(_description, _name, _price, _specification, _storage, _category, _goodStatus)) { //检查数据有效性
                        const db = wx.cloud.database()
                        wx.showLoading({
                            title: '正在上传...',
                            duration: 3000
                        })
                        let promise = new Promise(function (resolve, reject) {
                            let promise2 = new Promise(function (resolve, reject) {
                                if (that.data.changedUrl == 0) {
                                    resolve()
                                } else {
                                    var hz = that.data.iconUrl.match(/\.[^.]+?$/)[0]
                                    //先删除之前的
                                    wx.cloud.deleteFile({
                                        fileList: [that.data.goodsId + 'ico' + hz],
                                        success: res => {
                                            console.log("删除原本的头像")
                                            //存头像
                                            wx.cloud.uploadFile({
                                                filePath: that.data.iconUrl,
                                                cloudPath: that.data.goodsId + 'ico' + that.data.iconUrl.match(/\.[^.]+?$/)[0],
                                                success: res => {
                                                    console.log("上传头像成功")
                                                    console.log(res)
                                                    that.data.iconUrl = res.fileID
                                                    //promise2回调
                                                    resolve()
                                                }
                                            })
                                        },
                                        fail: res => {
                                            console.log(res)
                                        }
                                    })
                                }
                            })
                            promise2.then(res => {
                                //删除不需要的
                                wx.cloud.deleteFile({
                                    fileList: that.data.delImage,
                                    success: res => {
                                        console.log("删除不需要的展示图片成功 接下来保存图片")
                                        if (that.data.newAdd.length == 0) {
                                            console.log("不需要添加 直接进入保存")
                                            resolve()
                                        }
                                        that.data.newAdd.forEach(function (item, index) {
                                            wx.cloud.uploadFile({
                                                filePath: item,
                                                cloudPath: that.data.goodsId + 'img' + (index + that.data.imageList.length) + item.match(/\.[^.]+?$/)[0],
                                                success: res => {
                                                    console.log(res)
                                                    that.data.imageList[index + that.data.imagesOldLen] = res.fileID
                                                    if (index == (that.data.newAdd.length - 1)) {
                                                        //最外围的promise结束
                                                        resolve()
                                                    }
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        })
                        promise.then(res => {
                            console.log("图片数组为：")
                            console.log(that.data.imageList)
                            wx.hideLoading()
                            wx.cloud.callFunction({
                                name: 'shopping',
                                data: {
                                    type: 'updateGoods',
                                    name: _name,
                                    price: parseFloat(_price),
                                    description: _description,
                                    storage: parseFloat(_storage),
                                    specification: _specification,
                                    _id: that.data.goodsId,
                                    status: parseInt(_goodStatus),
                                    iconUrl: that.data.imageList[0],
                                    classify: _category
                                },
                                success: function (res) {
                                    console.log(res)
                                    console.log('更新完成！！！！！')
                                },
                                fail: function (res) {
                                    console.log(res)
                                }
                            })
                            wx.cloud.callFunction({
                                name: 'shopping',
                                data: {
                                    type:'updateGoodsIntro',
                                    _id: that.data.goodsId,
                                    text: e.detail.value.text,
                                    images: that.data.imageList
                                },
                                success: function (res) {
                                    console.log(res)
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '修改成功！',
                                        icon: 'success',
                                        duration: 2000,
                                    })
                                    wx.redirectTo({
                                      url: '/pages/admin/index/index',
                                    })
                                },
                                fail: function (res) {
                                    wx.hideLoading();
                                    var info = '修改失败'
                                    this.showToast(info);
                                    console.log(res)
                                }
                            })
                        })
                    } else {
                        wx.hideLoading();
                        var info = '请检查表单！'
                        this.showToast(info);
                    }
                } else if (res.cancel) {

                }
            },
            fail: function (res) {
                console.error(res)
            },
        })
    },

    /** 添加商品图片的框进行照片的选择 */
    chooseImage(e) {
        var that = this
        wx.chooseImage({
            sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            count: 6,
            success: res => {
                that.data.imageList = that.data.imageList.concat(res.tempFilePaths)
                that.data.newAdd = that.data.newAdd.concat(res.tempFilePaths) //给新元素添加上
                let promise = new Promise(function (resolve, reject) {
                    console.log(res.tempFilePaths)
                    resolve();
                });
                promise.then(function () {
                    console.log(that.data.imageList)
                    that.setData({
                        "imageList": that.data.imageList,
                        "listLength": that.data.imageList.length
                    })
                });
            }
        })
    },

    /** 删除图片的事件 */
    removeImage(e) {
        var that = this
        var id = parseInt(e.currentTarget.id)
        console.log(id)
        console.log(parseInt(this.data.newAdd.length))
        this.data.delImage.push(this.data.imageList[id])
        // console.log("删除图片" + ((id - parseInt(this.data.newAdd.length) - 1)))
        console.log(this.data.delImage)
        this.data.imageList.splice(id, 1)
        if ((id - parseInt(this.data.imagesOldLen)) >= 0) {
            console.log("从新添加的里面删除：" + (id - parseInt(this.data.imagesOldLen)))
            this.data.newAdd.splice((id - parseInt(this.data.imagesOldLen)), 1)
        }
        console.log("改变后的新数组为")
        console.log(this.data.newAdd)
        this.setData({
            "imageList": that.data.imageList,
            "listLength": that.data.imageList.length
        })
    },

    /** 点击图片可以进行预览 */
    handleImagePreview(e) {
        const idx = e.target.dataset.idx
        const imageList = this.data.imageList
        wx.previewImage({
            current: imageList[idx], //当前预览的图片
            urls: imageList, //所有要预览的图片
        })
    },

    /** 检查表单数据有效性 */
    checkValidate(_description, _name, _price, _specification, _storage, _category, _goodStatus) {
        if (_description == '' || _description == undefined) {
            return false
        }
        if (_name == '' || _name == undefined) {
            var info = '请检查表单！'
            this.showToast(info);
            return false
        }
        //其他数据的验证待完善
        return true
    },

    /** 检查表单的吐司 */
    showToast(_title) {
        wx.showToast({
            title: _title,
            icon: '',
            image: '../../../images/fail.png',
            duration: 2000,
        })
    },

})