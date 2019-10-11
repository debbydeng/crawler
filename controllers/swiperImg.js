const {SwiperModel}=require('../seqDB/models/index');

const getImgs=async (ctx,next)=>{
    try{
        const instances=await SwiperModel.findAll({});
        ctx.response.body={data:instances};

    }catch(err){
        console.log(err);
    }
}

module.exports={
    'GET /music/swiper/list': getImgs
}


