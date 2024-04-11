// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var _id = event._id
  var imagesUrl = event.images
  var text = event.text

  return await db.collection('goods_introduce').add({
    data: {
      goodsId:_id,
      imagesUrl:imagesUrl,
      text:text
    }
  })
}