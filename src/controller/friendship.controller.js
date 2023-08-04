
module.exports = app =>
{
    const friendshipService = require('../service/friendship.service')
    var router = require('express').Router();
    router.post('/add-friend',friendshipService.addFriend)
    
    app.use('/',router);
}

