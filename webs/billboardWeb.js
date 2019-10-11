const fs = require('fs');
const env=require('../env');
module.exports=(c,dbModal)=>{
    c.queue([{
        uri: '/discover/toplist?id=60198',
        headers: {
            referer: 'https://music.163.com/',
        },
        callback: (err, res, done) => {
            if (err) {
                console.log(err)
            } else {
                const $ = res.$;
                fs.open(`${env.dirname}/crawlerPages/billboard.html`, 'w+', (err, fd) => {
                    if (err) {
                        return console.error(err);
                    }
                    fs.writeFile(`${env.dirname}/crawlerPages/billboard.html`, res.body, (err) => {
                        if (err) {
                            return console.error(err);
                        }
                    });
                    const resString=$("#song-list-pre-data").val();
                    const resJson=JSON.parse(resString);
                    const data=resJson.map((item)=>({
                        musicUrl:'',
                        musicId:item.privilege.id,
                        name:item.album.name,
                        picUrl:item.album.picUrl,
                        duration:item.duration,
                        author:item.artists[0].name,
                        publishTime:item.publishTime
                    }));
                    dbModal.bulkCreate(data, {ignoreDuplicates: true}).then(()=>{})
                });
            }
            done();
        }
    }])
}
