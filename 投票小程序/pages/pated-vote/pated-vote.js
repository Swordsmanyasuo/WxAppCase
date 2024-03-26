// pages/vote-page/vote-page.js
import voteList from '../../utils/vote'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteList:[]
  },

  onShow() {

    let name = wx.getStorageSync('nickName');
    let voteList = voteList.map(item=>{
      let info = item.info
      let flag = false
      info.map(item=>{
        if(item.name==name){
          flag = true
        }
      })
      if(flag){
        return item
      }
    })

    this.setData({
      voteList:voteList
    })
  },

})