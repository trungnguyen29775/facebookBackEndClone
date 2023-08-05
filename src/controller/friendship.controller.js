
module.exports = app =>
{
    const friendshipService = require('../service/friendship.service')
    var router = require('express').Router();
    router.post('/add-friend',friendshipService.createFriendShip)
    router.post('/remove-friend-request',friendshipService.destroyFriendShip)
    app.use('/',router);
}

