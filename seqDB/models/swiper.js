const db = require('../db');

module.exports = db.defineModel('swiper', {
    picUrl: {
        type: db.STRING(150),
        primaryKey: true,
        allowNull: false,
    },
    url: db.STRING(150),
    backgroundUrl: db.STRING(150),
    targetId:db.STRING(50),
    targetType:db.STRING(50),
});
