// pages/queryResults/queryResults.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	// 查看详情
	lookDetail(e){
		var index = e.currentTarget.dataset.index
		console.log("e")
		wx.navigateTo({
			url: '/pages/detail/detail?result='+encodeURIComponent(JSON.stringify(this.data.result[index]))
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
        console.log(options);
        wx.getStorage({
			key: "record",
			success:(res)=>{
                let data = JSON.parse(res.data)[options.index]
                console.log(data);
                this.setData({
                    image:data.image,
                    result:data.result
                })
			}
		})

		// console.log("option data",this.data);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})