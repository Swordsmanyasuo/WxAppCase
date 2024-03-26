// pages/vote-page/vote-page.js
import voteList from '../../utils/vote'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteList:[],
    avatarUrl:null
  },

  onShow() {
    // 获取本地存储的 nickname
    let data = voteList
    wx.getStorage({
      key: 'nickName',
      success: (res) => {
        let nickName = res.data
        let voteList = []
        for (let index = 0; index < data.length; index++) {
          const item = data[index];
          if(nickName == item.name){
            voteList.push(item)
          }
        }

        this.setData({
          voteList:voteList
        })
      }
    });
    wx.getStorage({
      key: 'avatarUrl',
      success: (res) => {
        this.setData({
          avatarUrl:res.data
        })
      }
    });

  },

})