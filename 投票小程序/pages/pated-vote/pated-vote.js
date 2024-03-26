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
    let data = []
    voteList.map(item=>{
      let info = item.info
      let flag = false
      info.map(item2=>{
        if(item2.name==name){
          flag = true
        }
      })
      if(flag){
        data.push(item)
      }
    })

    this.setData({
      voteList:data
    })
  },

})