Page({
  data: {
    //swiper部分数据
    indicatorDots: true,
    autoplay:true,
    current:0,
    interval:5000,
    duration:1000,
    images:[
      '/images/swiper/1.jpg',
      '/images/swiper/2.jpg',
      '/images/swiper/3.jpg'

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