// pages/admin/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      {categoryId:0,cateName:'未分类'},
      {categoryId:1,cateName:'蔬菜'},
      {categoryId:2,cateName:'水果'},
      {categoryId:3,cateName:'农家'},
      {categoryId:4,cateName:'家禽'},
      {categoryId:5,cateName:'特产'},
      {categoryId:6,cateName:'手工'},
      {categoryId:7,cateName:'其他'}
    ],
    goodsList: [
      {
      classify: "未分类", description: "好吃又正宗的兴国县鱼丝", name: "兴国鱼丝",
      iconUrl:"https://p1.itc.cn/images01/20220326/9cd99528df884e968c54be71fbd6fe4a.jpeg",    
      price:39,sales: 999,specification: "500g",status: 1,storage: 999,_id:'1'},
      { 
      classify: "未分类", description: "赣南脐橙果肉鲜嫩多汁", name: "脐橙",
      iconUrl: "https://img2.baidu.com/it/u=3789706499,3442127525&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800",
      price: 29.9, sales: 999, specification: "250g", status: 1,storage: 999,_id: "2"}
    ]
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