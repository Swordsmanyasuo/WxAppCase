//  miniprogram/pages/admin/goodsAdd/index.js
const app = getApp()
const cloud = wx.cloud;
const db = wx.cloud.database({});
Page({
    data: {
        countIndex: 5, //展示图片的张数限制为5张
        count: [1, 2, 3, 4, 5, 6],
        imageList: [],
        isDisabled: true,
        goodStatus: ['下架', '出售中'],
        goodStatusIndex: 1,
        categoriesArray: [],
        categoriesArrayIndex: 0,
        //图片问题
        delImage: [],
        newAdd: [],
        imagesOldLen: 0,
        listLength: 0
    },

    onLoad: function (options) {
        this.getAllCategories()
        var that = this
    },

    /**预览照片 */
    previewImage(e) {
        const current = e.target.dataset.src
        wx.previewImage({
            current,
            urls: this.data.imageList
        })
    },
    goodStatusChange(e) {
        this.setData({
            goodStatusIndex: e.detail.value
        })
    },
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
    /** 数据库得到的分类数据转为数组显示在picker组件中 */
    categories2Array() {
        for (var i = 0; i < this.data.categories.length; i++) {
            var temp = this.data.categories[i].cateName
            console.log(temp)
            this.data.categoriesArray.push(temp)
        }
        this.setData({
            categoriesArray: this.data.categoriesArray
        })
    },

    /** 新增商品 */
    addGoods(e) {
        var that = this
        // 获取表单里的数据
        var _description = e.detail.value.description
        var _name = e.detail.value.name
        var _price = e.detail.value.price
        var _specification = e.detail.value.specification
        var _storage = e.detail.value.storage
        var _category = that.data.categoriesArray[that.data.categoriesArrayIndex]
        var _goodStatus = that.data.goodStatusIndex //index为1代表出售中,这里非运算变成布尔值false
        if (this.checkValidate(_description, _name, _price, _specification, _storage, _category, _goodStatus)) { //检查数据有效性
            const db = wx.cloud.database();
            console.log(e)
            wx.showLoading({
                title: '正在上传...',
            })
            let promise = new Promise(function (resolve, reject) {
                wx.cloud.callFunction({
                    name: 'shopping',
                    data: {
                        type: 'addGoods',
                        name: e.detail.value.name,
                        price: parseFloat(e.detail.value.price),
                    },
                    success: function (res) {
                        console.log('callFunction test result: ', res)
                        that.setData({
                            iconUrl: that.data.imageList[0],
                            goodsId:res.result._id
                        })
                        //上传图片
                        wx.cloud.uploadFile({
                            filePath: that.data.iconUrl,
                            cloudPath: that.data.goodsId + 'ico' + that.data.iconUrl.match(/\.[^.]+?$/)[0],
                            success: res => {
                                console.log("上传图片成功",1)
                                console.log(res)
                                that.data.iconUrl = res.fileID
                                //更新goods库
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
                                        status: 1,
                                        iconUrl: that.data.iconUrl,
                                        classify: _category,
                                    },
                                    success: function (res) {
                                        //可以退出这个Promise
                                        resolve()
                                        wx.showToast({
                                            title: '提交成功！',
                                            icon: 'success',
                                            duration: 2000,
                                        })
                                    }

                                })
                            }
                        })
                    }
                })
            })
            promise.then(res => {
                let promise2 = new Promise(function (resolve, reject) {
                    //存展示图片
                    that.data.imageList.forEach(function (item, index) {
                        wx.cloud.uploadFile({
                            filePath: item,
                            cloudPath:that.data.goodsId + 'img' + (index + that.data.imageList.length) + item.match(/\.[^.]+?$/)[0],
                            success: res => {
                                that.data.imageList[index] = res.fileID
                                if (index == (that.data.imageList.length - 1)) {
                                    //promise2结束
                                    resolve()
                                }
                            }
                        })
                    })
                })
                promise2.then(res => {
                    wx.cloud.callFunction({
                        name: 'shopping',
                        data: {
                            type:'addGoodsIntro',
                            _id: that.data.goodsId,
                            text: e.detail.value.description,
                            images: that.data.imageList
                        },
                        success: function (res) {
                            wx.hideLoading()
                            wx.showToast({
                                title: '上传图片成功',
                                icon: 'success',
                                duration: 2000,
                            })
                            console.log(res)
                            wx.redirectTo({
                              url: '/pages/admin/index/index',
                            })
                        },
                        fail: function (res) {
                            console.log(res)
                            wx.hideLoading()
                            wx.showToast({
                                title: '上传图片失败！',
                                icon: 'none',
                                duration: 2000,
                            })
                        }
                    })
                })
            })

        } else {
        }
    },

    /** 检查表单数据有效性 */
    checkValidate(_description, _name, _price, _specification, _storage, _category, _goodStatus) {
        if (_description == '' || _description == undefined) {

            return false
        }
        if (_name == '' || _name == undefined) {
            this.showToast();
            return false
        }
        //其他数据的验证待完善
        return true
    },

    /** 点击加号选择图片 */
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
                    resolve();
                });
                promise.then(function () {
                    that.setData({
                        "imageList": that.data.imageList,
                        "listLength": that.data.imageList.length
                    })
                });

            }
        })
    },
    /** 点击图片右上角红色叉删除当前图片 */
    removeImage(e) {
        var that = this
        var id = parseInt(e.currentTarget.id)
        console.log(id)
        console.log(parseInt(this.data.newAdd.length))
        this.data.delImage.push(this.data.imageList[id])
        // console.log("删除图片" + ((id - parseInt(this.data.newAdd.length) - 1)))
        console.log(this.data.delImage)
        this.data.imageList.splice(id, 1)//从数组中删除项目，然后返回被删除的项目。
        if ((id - parseInt(this.data.imagesOldLen)) >= 0) {
            console.log("从新添加的里面删除：" + (id - parseInt(this.data.imagesOldLen)))
            //向/从数组中删除项目，然后返回被删除的项目
            this.data.newAdd.splice((id - parseInt(this.data.imagesOldLen)), 1)
        }
        console.log("改变后的新数组为")
        console.log(this.data.newAdd)
        this.setData({
            "imageList": this.data.imageList,
            "listLength": that.data.imageList.length
        })
    },
    /** 预览图片 */
    handleImagePreview(e) {
        const idx = e.target.dataset.idx
        const imageList = this.data.imageList
        wx.previewImage({
            current: imageList[idx], //当前预览的图片
            urls: imageList, //所有要预览的图片
        })
    },

    showToast() {
        wx.showToast({
            title: '请检查表单！',
            icon: '',
            image: '../../../images/fail.png',
            duration: 2000,
        })
    }

})