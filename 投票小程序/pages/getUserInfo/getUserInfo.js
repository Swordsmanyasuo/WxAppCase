const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
    nickName:''
  },
  onLoad() {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },
  onInput: function (e) {
    // console.log('输入的内容为：', e.detail.value);
    this.setData({
      nickName:e.detail.value
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  saveData(){
    wx.setStorageSync('avatarUrl',this.data.avatarUrl); 
    wx.setStorageSync('nickName', this.data.nickName);
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
