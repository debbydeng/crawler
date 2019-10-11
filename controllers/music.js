const Music=require('../seqDB/models/music');


const getMusicList=async (ctx,next)=>{
    try{
        const instances=await Music.findAll({});
        ctx.response.body={data:instances};

    }catch(err){
        console.log(err);
    }
};

module.exports={
    'GET /music':getMusicList
};
