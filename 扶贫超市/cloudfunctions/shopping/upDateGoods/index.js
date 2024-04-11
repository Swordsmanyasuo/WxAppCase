// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    try {
        return await db.collection('goods').doc(event._id).update({
            data: {
                name: event.name,
                price: event.price, 
                specification: event.specification, 
                iconUrl: event.iconUrl, 
                classfiy: event.classfiy,
                storage: event.storage,
                status: event.status, 
                description: event.description, 
                classify: event.classify
            }
        });
    } catch (e) { }
}