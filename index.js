const Koa=require('koa');
const app=new Koa();
const bodyParser = require('koa-bodyparser');
const initDB=require('./seqDB/init');
const routers=require('./routers/index');
app.use(async (ctx,next)=>{
    await next();
});
app.use(bodyParser());
app.use(routers());
app.listen(3000);
//initDB();
console.log('app started at port 3000...');



