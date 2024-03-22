// pages/jzw/jzw.js
var common=require('../../utils/jzwTopics')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     number:0 ,
     count:0,
     title:'',
     answer: '', //题目与答案
     switchAns:false,
     navigationTitle:'' //第几题文本
  },

  btnCheckAns:function(e){
      this.setData({
        switchAns:true
      })
  },

  toLeft:function(e){
    var curNumber=this.data.number
    if(curNumber-1>-1) {
      curNumber=curNumber-1;
      this.setData({
        switchAns:false,
      title: '题目:'+common.getTopicsList()
      [curNumber].title,
      answer:common.getTopicsList()[curNumber].answer,
      number:curNumber
      })
      wx.setNavigationBarTitle({
        title: '第'+curNumber+'题',
      })
    }
    else{
      wx.showToast({
        title: '前面没有了',
      })
    }
   
  },

  toRight:function(e){
    var curNumber=this.data.number
    if(curNumber+1<this.data.count) {
      curNumber=curNumber+1;
      this.setData({
        switchAns:false,
      title: '题目:'+common.getTopicsList()[curNumber].title,
      answer:common.getTopicsList()[curNumber].answer,
      number:curNumber
      })
      wx.setNavigationBarTitle({
        title: '第'+curNumber+'题',
      })
    }
    else{
      wx.showToast({
        title: '后面没有了',
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      var curNumber=this.data.number
      this.setData({
        title:'题目：'+common.getTopicsList()[0].title,
        answer:common.getTopicsList()[0].answer,
        count:common.getTopicsList().length
      })
      wx.setNavigationBarTitle({
        title: '第'+(parseInt(curNumber)+1)+'题',
      })
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