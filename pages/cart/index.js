// 购物车页面
Page({
  data: {
    carts: [{ goodsId: 1, amount: 1, status: 1, }, 
      { goodsId: 2, amount: 1, status: 1, }],
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
})