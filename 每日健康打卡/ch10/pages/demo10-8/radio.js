// pages/demo10-8/radio.js
Page({
  data: {
    radioItems: [{ chooseitem: 'A.抽象数据类型', value: 'A' },
    { chooseitem: 'B.逻辑结构', value: 'B' },
    { chooseitem: 'C.存储结构', value: 'C' },
    { chooseitem: 'D.运算', value: 'D' },]
  },

  radioChange: function (e) {
    console.log('radio当前选中：' + e.detail.value)
  }
})

