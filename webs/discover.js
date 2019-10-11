const fs = require('fs');
const env=require('../env');
const {SwiperModel,PlaylistModel,RecommendSongsModel}=require('../seqDB/models/index');
module.exports=async (c)=>{
    let requestUrls=[];
    const queue=()=>{
        return new Promise((resolve,reject)=>{
            c.queue([{
                uri: '/discover',
                headers: {
                    referer: 'https://music.163.com/',
                },
                callback: (err, res, done) => {
                    fs.writeFile(`${env.dirname}/crawlerPages/discover.html`, res.body, (err) => {
                        if (err) {
                            return console.error(err);
                        }
                    });
                    const swiperReg=/window\.Gbanners(.|\n)+}\n*]\;/gi;
                    let imgList=res.body.match(swiperReg);
                    imgList=imgList? eval(imgList[0].replace(/window.Gbanners =/g,'')) : [];
                    const data=imgList.map((item)=>({
                        picUrl:item.picUrl,
                        url:item.url,
                        backgroundUrl:item.backgroundUrl,
                        targetId:item.targetId,
                        targetType:item.targetType
                    }));
                      SwiperModel.bulkCreate(data, {ignoreDuplicates: true}).then(()=>{});

                    const $=res.$;
                    const playlist=[];
                    $(".m-cvrlst>li").each(function(){
                        const _img=$(this).find('img');
                        const _link=$(this).find('a.msk');
                        const _nb=$(this).find('.nb');
                        const picUrl=_img.attr('src');
                        const title=_link.attr('title');
                        const href=_link.attr('href');
                        const discoverId=_link.attr('data-res-id');
                        const listening=_nb.text();
                        if(discoverId){
                            playlist.push({picUrl,title,href,discoverId,listening});
                            if(href.indexOf('playlist')>0){
                                requestUrls.push(href);
                            }
                        }
                    });
                    PlaylistModel.bulkCreate(playlist,{ignoreDuplicates:true}).then(()=>{});
                    resolve()
                    done();
                }
            }]);
        })
    };
     await queue();

    requestUrls.map((uri)=>{
        c.queue([{
            uri,
            headers: {
                referer: 'https://music.163.com/',
            },
            callback:(err,res,done)=>{
                const $=res.$;
                const playId=uri.split('=')[1];
                const data=[];
                $(".f-hide li>a").each(function(){
                    const musicUrl=$(this).attr('href');
                    const urlArr=musicUrl? musicUrl.split('=') : null;
                    const musicId=urlArr && urlArr[1];
                    const name=$(this).text();
                    data.push({
                        playId,musicId,musicUrl,name
                    })
                });
                RecommendSongsModel.bulkCreate(data,{ignoreDuplicates:true}).then(()=>{});
                done();
            }
        }])
    })
}
