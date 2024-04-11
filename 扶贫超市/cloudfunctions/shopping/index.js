const login = require('./login/index');
// 添加商品
const addGoods = require('./addGoods')
// 添加商品介绍
const addGoodsIntro = require('./addGoodsIntro')
// 删除商品
const delGoods = require('./delGoods')
// 修改商品
const upDateGoods = require('./upDateGoods')
// 修改商品介绍
const updateGoodsIntro = require('./updateGoodsIntro')
// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'login':
            return await login.main(event, context);
        case 'addGoods':
            return await addGoods.main(event, context);
        case 'addGoodsIntro':
            return await addGoodsIntro.main(event, context);
        case 'delGoods':
            return await delGoods.main(event, context);
        case 'updateGoods':
            console.log(1);
            return await upDateGoods.main(event, context);
        case 'updateGoodsIntro':
            return await updateGoodsIntro.main(event, context);
    }
};
