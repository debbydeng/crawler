const db=require('../db');

module.exports=db.defineModel('music',{
    name:db.STRING(50),
    author:db.STRING(50),
    picUrl:db.STRING(100),
    musicId:{
        type:db.BIGINT,
        primaryKey:true,
        allowNull:false,
    },
    musicUrl:db.STRING(50),
    duration:db.BIGINT,
    publishTime:db.BIGINT,
});
