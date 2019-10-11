/**
*Desc: 自动读取数据库model
*User: Debby.Deng
*Date: 2019/6/11,
*Time: 3:13 PM
*/
const fs=require('fs');
const db=require('../db');
const env=require("../../env")
const files=fs.readdirSync(`${env.dirname}/seqDB/models`);
let models={
    sync:db.sync
};
files.map(f=>{
    if(f!=='index.js'){
        let key=f.substring(0,1).toUpperCase()+f.substring(1,f.length-3)+"Model";
        Object.assign(models,{[key]:require(`./${f}`)});
    }
});
module.exports=models;
