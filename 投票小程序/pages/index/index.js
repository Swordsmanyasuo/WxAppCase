// pages/vote-page/vote-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:null,
    nickName:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
        // 获取本地存储的 nickname
        wx.getStorage({
          key: 'nickName',
          success: (res) => {
            this.setData({
              nickName: res.data
            });
          }
        });
        
        // 获取本地存储的 avatar
        wx.getStorage({
          key: 'avatarUrl',
          success: (res) => {
            this.setData({
              avatar: res.data
            });
          }
        });
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