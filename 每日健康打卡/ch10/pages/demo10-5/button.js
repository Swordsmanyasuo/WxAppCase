// pages/demo10-5/buttons.js
Page({
  getUserInfo: function() {
    wx.getUserInfo({
      success: res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})