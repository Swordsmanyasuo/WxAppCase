// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
	var name = event.name;
	var price = event.price;
	return await db.collection('goods').add({data:{name:event.name,price:event.price}})
}