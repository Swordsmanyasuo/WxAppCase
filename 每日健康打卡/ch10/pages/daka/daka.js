// pages/daka/daka.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:'2024-3-20',
    radioItems: [{ chooseitem: '<36℃', value: 'A' },
    { chooseitem: '36℃~37℃', value: 'B' },
    { chooseitem: '37℃~38℃', value: 'C' },
    { chooseitem: '>38℃', value: 'D' },]
  ,
  radioItems2: [{ chooseitem: '未接种', value: 'A' },
    { chooseitem: '已接种第一针', value: 'B' },
    { chooseitem: '已接种第二针', value: 'C' },
    { chooseitem: '已接种第三针', value: 'D' },]
  ,
  radioItems3 : [{ chooseitem: '一切正常', value: 'A' },
    { chooseitem: '发热', value: 'B' },
    { chooseitem: '干咳', value: 'C' },
    { chooseitem: '腹泻', value: 'D' },
    { chooseitem: '感冒', value: 'F' },

  ]
  },
  radioChange: function (e) {
    console.log('radio1当前选中：' + e.detail.value)
  },
  radioChange2: function (e) {
    console.log('radio2当前选中：' + e.detail.value)
  },

  radioChange3: function (e) {
    console.log('radio3当前选中：' + e.detail.value)
  },

  checkboxChange: function (e) {
    console.log('监听checkbox多选框组件变化，当前选中的值是：' + e.detail.value)
  },
  onInputname: function (e) {
    console.log('姓名：' + e.detail.value)
  },
  onInputaddr: function (e) {
    console.log('地址：' + e.detail.value)
  },

  onSubmit(e){
    console.log('表单提交：');
    console.log(e.detail.value)
  },
  
  onReset(e){
    console.log(e)
  },

  onInputName:function(e){
      console.log(e.detail.value)
  },

  onCommit(e){
    // console.log('当前提交：' + e.detail.value)
  },

  regionChange:function(e){
    let value = e.detail.value;
    this.setData({
      region:value
    })
  },

  //获取当前日期
  getMyDate: function (e) {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var resultDate = Y + '-' + M + '-' + D;
    return resultDate
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var myDate = this.getMyDate()
    this.setData({
      today: myDate
    })
  }
})