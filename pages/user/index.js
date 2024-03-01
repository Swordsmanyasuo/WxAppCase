// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {icon:'../../images/iconfont-order.png',text:'我的订单',path:'/pages/order/list/index'},
      {icon:'../../images/iconfont-addr.png',text:'收货地址',path:'/pages/address/list/index'},
      {icon:'../../images/iconfont-kefu.png',text:'联系客服',path:''},
      {icon:'../../images/iconfont-order.png',text:'常见问题',path:'/pages/hlep/list/index'},
    ],
    setting:[{ icon:'../../images/iconfont-clear.png',text:'清除缓存',path:'0.0KB'},
    {icon:'../../images/iconfont-about.png',text:'关于我们',path:'/pages/about/index'},]
  },
})