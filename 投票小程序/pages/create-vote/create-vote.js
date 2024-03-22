Page({

  /**
   * 页面的初始数据
   */
  data: {
    conLists: [], //内容标题（如：今天完成工作、备注、次日工作安排）可以添加或者删除
  },

  /**
 * 添加内容
 */
  add(e) {
    // 点击添加按钮，就往数组里添加一条空数据
    var _list = this.data.conLists;
    _list.push("")
    this.setData({
      conLists: _list
    })
  },

  /**
   * 删除内容
   */
  del(e) {
    var idx = e.currentTarget.dataset.index;
    var _list = this.data.conLists;
    console.log(idx)
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list.splice(idx, 1)
      }
    }
    this.setData({
      conLists: _list
    })
  },

  /**
 * 获取输入的内容标题
 */
  changeConTitle(e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    var val = e.detail.value; //当前输入的值
    var _list = this.data.conLists; //data中存放的数据
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = { modelLabel: val } //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      conLists: _list
    })
  },

  /**
 * 下一步
 */
  next(e) {
    var _conLists = this.data.conLists;
    console.log('这是模板内容标题数组', _conLists)
    for (let i = 0; i < _conLists.length; i++) {
      if (!_conLists[i]) {
        wx.showToast({
          title: '请输入第' + `${i * 1 + 1}` + '条的模板内容标题！',
          icon: 'none'
        })
        return;
      }
    }
  },

})