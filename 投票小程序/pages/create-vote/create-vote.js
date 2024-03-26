
import voteList from '../../utils/vote'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    subtitle:'',
    conLists: [], //内容标题（如：今天完成工作、备注、次日工作安排）可以添加或者删除
  },
  inputTitle(e){
    this.setData({
      title:e.detail.value
    })
  },
  inputSubtitle(e){
    this.setData({
      subtitle:e.detail.value
    })
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
    console.log(this.data.conLists);
    let option = this.data.conLists.map(item=>{
      return item.modelLabel
    })
    wx.getStorage({
      key: 'nickName',
      success: (res) => {
        let nickName = res.data
        let data = {
          title:this.data.title,
          subtitle:this.data.subtitle,
          name:nickName,
          option,
          info:[]
        }
        voteList.push(data)
        wx.showToast({
          title: '创建成功',
          icon:'success',
          duration:1000
        })
      }
    });

  },

})