/**
 *Desc: 热门推荐歌单列表
 *User: Debby.Deng
 *Date: 2019/6/11,
 *Time: 2:42 PM
 */

const db = require('../db');

module.exports = db.defineModel('playlist', {
    title: db.STRING(50),
    href: db.STRING(100),
    picUrl: db.STRING(100),
    discoverId: {
        type: db.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    listening: db.BIGINT,
});
