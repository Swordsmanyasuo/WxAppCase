// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  // console.log(event)
  var _id = event._id
  var imagesUrl = event.images
  var text = event.text
  try {
    return await db.collection('goods_introduce').where({
      goodsId: _id
    }).update({
      data: {
        imagesUrl: imagesUrl,
        text: text
      }
    }).then(res => {})


  } catch (e) { console.log(e)}
 
}