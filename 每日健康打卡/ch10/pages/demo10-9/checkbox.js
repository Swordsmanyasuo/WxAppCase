// pages/demo10-9/checkbox.js
Page({
  data: {
    checkboxItems: [{ chooseitem: 'A.采用非递归方式重写递归程序时必须使用栈 ', value: 'A' },
    { chooseitem: 'B.函数调用时，系统要用栈保存必要的信息 ', value: 'B' },
    { chooseitem: 'C.只要确定了入栈次序，即可确定出栈次序   ', value: 'C' },
    { chooseitem: 'D.栈是一种受限的线性表，允许在其两端进行操作', value: 'D' },]
  },

  checkboxChange: function (e) {
    console.log('监听checkbox多选框组件变化，当前选中的值是：' + e.detail.value)
  }
})

