import voteList from '../../utils/vote'
Page({
  data: {
    data:[],
    title:'',
    maxNum:[],//被投票最多的人 
    radioItems: [],//投票选项
  },
  // 获取传递的title并设置当前页面标题
  onLoad(option){
    let title = option.title
    this.setData({
      title:title
    })
    wx.setNavigationBarTitle({
      title: '投票排行——'+title
    });
  },
  // 数据初始化
  onShow(){
  // 通过title获取对应投票信息
    let data = []
    voteList.map(item=>{
      if(item.title = this.data.title){
        data = item
      }
    })
    this.init(data)
  },
  init(data){

    let radioItems = []
    let info = data.info
    // 初始化投票选项
    data.option.map(item=>{
      let num = 0
      info.map(item2=>{
        if(item2.value==item){
          num++
        }
      })
      let checked = false
      // 如果已经投了这个人
      if(this.data.checked==item){
        checked = true
      }
      let res = {
        name:item,
        value:item,
        num:num,
        checked:checked
      }
      radioItems.push(res)
    })
    // 根据num排序
    radioItems.sort((a, b) => {
      return b.num - a.num; // 从小到大排序
    });

    // 获取排行最高的投票数渲染进度条
    let maxNum = radioItems[0].num

    this.setData({
      data:data,
      radioItems:radioItems,
      maxNum:maxNum,
    })

  }
})