const Sequelize=require('sequelize');
const config=require('./config');
const seq=new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:10000
    }
});

const ID_TYPE=Sequelize.INTEGER;
function defineModel(name,attributes){
    const attrs={};
    for(let key in attributes){
        let value=attributes[key];
        if(typeof value==='object' && value['type']){
            value.allowNull=value.allowNull||false;
            attrs[key]=value;
        }else{
            attrs[key]={
                type:value,
                allowNull:true
            }
        }
    }

    attrs.version={
        type:Sequelize.BIGINT,
        allowNull:true,
    }

    return seq.define(name,attrs,{
        hooks: {
            beforeValidate: (obj) => {
                if (obj.isNewRecord) {
                    obj.version = 0;
                    console.log(obj.version)
                }else{
                    obj.version++;
                }
            }
        }
    })

}
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN','DATE'];
let exp={defineModel,STRING:null,INTEGER:null,BIGINT:null};
for (let type of TYPES) {
    exp[type] = Sequelize[type];
}
exp.sync=()=>{
    return seq.sync({force:true})
};
module.exports=exp;
