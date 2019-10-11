const Crawler = require('crawler');
const fs = require('fs');
// const Music=require('./seqDB/models/music');
// const BillboardModal=require('./seqDB/models/billboard');
const billboard=require( "./webs/billboardWeb");
const discover=require( "./webs/discover");
const {MusicModel,BillboardModel}=require('./seqDB/models/index');
module.exports =  () => {
    const c = new Crawler({
        maxConnections: 1,
        rateLimit: 1000, // `maxConnections` will be forced to 1
        jQuery: {
            name: 'cheerio',
            options: {
                normalizeWhitespace: true,
                xmlMode: true
            }
        },
        preRequest:(options,done)=>{
            options.uri='https://music.163.com'+options.uri;
            done();
        },
        callback: (err, res, done) => {
            if (err) {
                console.log(err)
            } else {

            }
            done();
        }
    })
    c.queue([{
        uri: '/discover',
        headers: {
            referer: 'https://music.163.com/',
        },
        callback: (err, res, done) => {
            if (err) {
                console.log(err)
            } else {
                const $ = res.$;
                fs.open('demo.html', 'w+', (err, fd) => {
                    if (err) {
                        return console.error(err);
                    }
                    fs.writeFile('demo.html', res.body, (err) => {
                        if (err) {
                            return console.error(err);
                        }
                    });
                    const data=[];
                    $(".n-bilst ol li>a").each(function(index,item){
                        const musicUrl=$(this).attr('href');
                        const name=$(this).text();
                        const musicId=musicUrl? musicUrl.split('=')[1] : null;
                        data.push({
                            musicUrl,
                            musicId,
                            name
                        })
                    });
                    MusicModel.bulkCreate(data, {ignoreDuplicates: true}).then(()=>{})
                })
            }
            done();
        }
    }]);
    billboard(c,BillboardModel);
    discover(c);

}
