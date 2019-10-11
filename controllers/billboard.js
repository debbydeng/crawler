const Billboard=require('../seqDB/models/billboard');


const getBillBoardList=async (ctx,next)=>{
    try{
        const body=ctx.request.body;
        const {pageNo,pageSize}=body;
        // console.log(pageNo,pageSize)
        // ctx.response.body={size:1};

        const instances=await Billboard.findAll({limit:pageSize,offset:(pageNo-1)*pageSize});
        ctx.response.body={data:instances,pageNo,pageSize};


    }catch(err){
        console.log(err);
    }
};

module.exports={
    'POST /billboard':getBillBoardList
};
