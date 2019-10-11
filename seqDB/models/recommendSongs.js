/**
*Desc: 热门推荐歌曲列表
*User: Debby.Deng
*Date: 2019/6/11,
*Time: 3:01 PM
*/

const db=require('../db');

module.exports=db.defineModel('recommendSongs',{
    name:db.STRING(50),
    author:db.STRING(50),
    picUrl:db.STRING(100),
    musicId:{
        type: db.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    musicUrl:db.STRING(50),
    duration:db.BIGINT,
    publishTime:db.BIGINT,
    playId:db.BIGINT
});
