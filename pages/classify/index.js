// 分类页面 shop/pages/classify/index.js
Page({
  data: {
    cateId:0,//当前分类的ID
    windowHeight: 0,
    windowWidth: 0,
    categories: [
      { categoryId: 0, cateName: '未分类'},
      { categoryId: 1, cateName: '蔬菜类'},
      { categoryId: 2, cateName: '水果类'},
      { categoryId: 3, cateName: '农家'  },
      { categoryId: 4, cateName: '家禽类'},
      { categoryId: 5, cateName: '特产'  },
      { categoryId: 6, cateName: '手工类'},
      { categoryId: 7, cateName: '其他'  },
    ],
    goodsList: [
      {
      classify: "未分类", description: "好吃又正宗的兴国县鱼丝", name: "兴国鱼丝",
      iconUrl:"https://p1.itc.cn/images01/20220326/9cd99528df884e968c54be71fbd6fe4a.jpeg",    
      price:39,sales: 999,specification: "500g",status: 1,storage: 999,_id:'1'},
      { 
      classify: "未分类", description: "赣南脐橙果肉鲜嫩多汁", name: "脐橙",
      iconUrl: "https://img2.baidu.com/it/u=3789706499,3442127525&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800",
      price: 29.9, sales: 999, specification: "250g", status: 1,storage: 999,_id: "2"}]
  },
  changeCate: function (e) {
    this.setData({
      cateId: e.target.dataset.id,
    }),
    wx.showToast({ title: '加载中..', icon: 'loading', duration: 1000 })
    this.getGoods(this.limit, this.skip);//请求数据，传入需要的数据条数限制limit，以及
    //起始点skip
  },
  onShow: function (e) {
    //用于设置商品滑动视图的宽高
    wx.getSystemInfo({  //调用API函数
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },   
})
