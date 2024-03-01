Page({
  data: {
    //swiper部分数据
    indicatorDots: true,
    autoplay:true,
    current:0,
    interval:5000,
    duration:1000,
    images:['https://ts1.cn.mm.bing.net/th/id/R-C.7ac5e746062d30c19a9423201ff09b68?rik=oQCeSWDPHcuMPg&riu=http%3a%2f%2fimg.fsonline.com.cn%2fa%2f10001%2f202006%2f9938f37a7dbe6292c5b7dd7ef66579a3.jpeg&ehk=u3DTtCF%2bJiphBXlR2CFqa%2bvzfc%2bFpdN%2briKjbuHdRIc%3d&risl=&pid=ImgRaw&r=0',
		'https://ts1.cn.mm.bing.net/th/id/R-C.a8f84f03f3d4cbc222a39932e7cb48b2?rik=VBCfyBujCNQZ8g&riu=http%3a%2f%2fres.sgfb.sgxw.cn%2fa%2f10001%2f202009%2ffa944b14fbd403386fd1eb388ed7e6e4.png&ehk=urtirvdEHel85kkb1iLGwXalKAAHESw7clCCQkI6XZo%3d&risl=1&pid=ImgRaw&r=0',
		'https://tse4-mm.cn.bing.net/th/id/OIP-C.fQjcSQM14r3RTunEquQ2IgHaE7?rs=1&pid=ImgDetMain'
  ],

  // 分类数据
  categoryContents: [{
    name: '特产',
    imgsrc: '../../images/cate-techan.png',
    backgroundColor: '#FE9446'
  }, {
    name: '手工',
    imgsrc: '../../images/cate-shougong.png',
    backgroundColor: '#FB6348'
  }, {
    name: '水果',
    imgsrc: '../../images/cate-shuiguo.png',
    backgroundColor: '#F5EF50'
  }, {
    name: '蔬菜',
    imgsrc: '../../images/cate-shucai.png',
    backgroundColor: '#55E26D'
  },
  {
    name: '农家',
    imgsrc: '../../images/cate-nongjia.png',
    backgroundColor: '#3BC6E6'
  }, {
    name: '家禽',
    imgsrc: '../../images/cate-jiaqin.png',
    backgroundColor: '#CF60ED'
  }, {
    name: '其他',
    imgsrc: '../../images/cate-qita.png',
    backgroundColor: '#F5956A'
  }, {
    name: '全部',
    imgsrc: '../../images/cate-quanbu.png',
    backgroundColor: '#81A5EA'
  }]
  },
})