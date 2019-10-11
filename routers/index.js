const music=require('../controllers/music');
const billboard=require('../controllers/billboard');
const env=require("../env")
const fs=require('fs');
const Router=require('koa-router');
const router = new Router();
const routerList={};

const files=fs.readdirSync(env.dirname+'/controllers');
files.map((f)=>{
    Object.assign(routerList,require(`${env.dirname}/controllers/${f}`));
});
console.log(routerList)

const routers=()=>{
    for(let url in routerList){
        const handle=routerList[url];
        if(url.startsWith('GET ')){
            const path=url.substring(4);
            router.get(path,handle)
        }else if(url.startsWith('POST ')){
            const path=url.substring(5);
            router.post(path,handle)
        }
    }
    router.get('/test', (ctx, next) => {
        ctx.body = 'Hello World!';
    })

    router.get('/music/test', (ctx, next) => {
        ctx.body = 'hot list!';
    })


    return router.routes();
}
module.exports=routers;
