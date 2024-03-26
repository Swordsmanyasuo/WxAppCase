import voteList from '../../utils/vote'
Page({
  data: {
    data:[],
    title:'',
    maxNum:[],//被投票最多的人 
    isvote:true,//是否能投票
    radioItems: [],//投票选项
    checked:null,//我投票的人
  },
  // 获取传递的title并设置当前页面标题
  onLoad(option){
    let title = option.title
    this.setData({
      title:title
    })
    wx.setNavigationBarTitle({
      title: '投票详情——'+title
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
    // 获取排行最高的投票数渲染进度条
    let maxNum = 0
    radioItems.map(item=>{
      if(maxNum<item.num){
        maxNum = item.num
      }
    })
    // 获取投票选项信息，判断当前用户是否能投票
    let isvote = true
    let  name = wx.getStorageSync('nickName');
    data.info.map(item=>{
      // 已经投过票
      if(name==item.name){
        isvote = false
      }
    })
    this.setData({
      data:data,
      radioItems:radioItems,
      maxNum:maxNum,
      isvote:isvote
    })
  },
  // 选择投票选项
  radioChange(e) {
      const checked = e.detail.value
      this.setData({
        checked:checked
      })
  },
  // 点击提交投票记录
  next(){
    // 如果已经投过票，返回
    if(!this.data.isvote)
    { 
      return false
    }

    this.setData({
      isvote:false
    })
    let name = wx.getStorageSync('nickName');
    let data = this.data.data
    // 向当前投票选票信息中添加新记录
    data.info.push({
      name:name,
      value:this.data.checked
    })
    // 更新信息
    this.setData({
      data:data
    })
    // 重新渲染信息
    this.init(data)

    voteList.map(item=>{
      // 找到对应投票，更新信息
      if(item.title = this.data.title){
        return data
      }
    })

    wx.showToast({
      title: '投票成功',
      icon:'success',
      duration:1000
    })
  }
})