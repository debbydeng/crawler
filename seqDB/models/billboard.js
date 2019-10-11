const db=require('../db');

module.exports=db.defineModel('billboard',{
    name:db.STRING(100),
    author:db.STRING(100),
    picUrl:db.STRING(100),
    musicId:{
        type: db.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    musicUrl:db.STRING(50),
    duration:db.BIGINT,
    publishTime:db.BIGINT,
});
