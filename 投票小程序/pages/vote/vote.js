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
    this.setData({
      voteList:voteList
    })
  },

})