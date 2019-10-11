/**
*Desc: 初始化映射表
*User: Debby.Deng
*Date: 2019/6/11,
*Time: 8:27 PM
*/
const model=require('./models/index');
const crawl=require('../crawler');

module.exports= async ()=>{
    await model.sync();
    crawl();
};
