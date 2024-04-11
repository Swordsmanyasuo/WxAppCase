// pages/admin/index/index.js
const app = getApp()
const cloud = wx.cloud;
const db = wx.cloud.database({});
Page({
    /** 其他数据*/
    data: {
        limit: 20,//一页显示的调试条数
        skip: 0,  /*end*/
        curIndex: 0,
        categories: [],
        goodsList: [],
        reload: true//用于判断是切换分类后的重新
    },
    onShow: function (options) {
        this.getAllCategories() //查询分类表，获取所有分类
    },

    /**查询分类表，获取所有分类*/
    getAllCategories() {
        var that = this
        app.getDBPromiseAll({
            db_name: 'category',
        }).then(res => {
            // console.log(res)
            that.setData({
                categories: res.data
            })
            that.getGoodsByCate(this.data.limit, this.data.skip) //根据分类查询商品,默认第一个分类的商品加载
        })
    },
    /** 通过分类名得到商品 */
    getGoodsByCate(limit, skip) {
        var that = this;
        wx.showLoading({
            title: '加载中....',
        });
        const db = wx.cloud.database();
        // console.log(that.data.categories[that.data.curIndex].cateName, that.skip, that.limit)
        db.collection('goods').where({
            classify: that.data.categories[that.data.curIndex]?.cateName || ''
        }).skip(skip).limit(limit).get({
            success: res => {
                // console.log(res);
                if (res.data.length == 0) {
                    wx.showToast({
                        title: '暂无更多内容！',
                        icon: 'none',
                        duration: 3000,
                    })
                }
                if (!that.data.reload) { //只是滑到底部，需要刷新，不需要重新加载
                    that.setData({
                        goodsList: that.data.goodsList.concat(res.data),
                        prompt: (that.data.goodsList.length + res.data.length > 0) ? {
                            hidden: true
                        } : app.globalData.emptyPrompt
                    });
                    that.skip += res.data.length;
                } else { //切换分类，需要重新加载
                    that.setData({
                        goodsList: res.data,
                        prompt: (that.data.goodsList.length + res.data.length > 0) ? {
                            hidden: true
                        } : app.globalData.emptyPrompt
                    });
                    that.skip += res.data.length;
                }

            },
            fail: err => {
                console.log(err);
                that.setData({
                    prompt: app.globalData.erroPrompt
                });
            },
            complete: res => {
                //隐藏加载提示框
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            }
        });
    },
    /** 左方分类条目切换事件 */
    switchLeftTab(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            curIndex: index
        });
        this.limit = 0
        this.skip = 0
        this.getGoodsByCate(this.limit, this.skip) //根据分类重新查询商品
    },
    /** 点击编辑按钮跳转到编辑商品页面 */
    bindViewEditGoods(e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '../goodsEdit/index?type=edit&id=' + e.currentTarget.dataset.id
        })
    },
    /** 点击新建商品按钮跳转到添加商品页面 */
    bindViewAddGoods(e) {
        wx.navigateTo({
            url: '../goodsAdd/index'
        })
    },
    /** 删除（下架商品） */
    deleteGoods(e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '您确定要删除该商品吗？删除后不可恢复',
            success: res => {
                if (res.confirm) {
                    wx.showLoading({
                        title: '删除ing',
                    })

                    wx.cloud.callFunction({
                        name: "shopping",
                        data: {
                            type: 'delGoods',
                            id: e.target.dataset.id,
                            status: '0'
                        },

                        //如果保存成功的话 
                        success: res => {
                            wx.hideLoading()
                            wx.showToast({
                                title: '删除成功',
                            })
                            that.getAllCategories()
                        }
                    })
                }
            }
        })
    }
})