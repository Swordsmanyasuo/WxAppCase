// pages/demo10-7/textarea.js
Page({
  onInput(e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
  onFocus(e) {
    console.log(e)
    this.setData({
      inputValue2: e.detail.value,
      keyBoardHeight: e.detail.height
    })
  },
  onConfirm(e) {
    console.log(e)
    this.setData({
      inputValue3: e.detail.value,
    })
  },
  onBlur(e) {
    console.log(e)
    this.setData({
      inputValue4: e.detail.value,
    })
  },
  replaceInput(e) {
    const value = e.detail.value
    let pos = e.detail.cursor
    let left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
})