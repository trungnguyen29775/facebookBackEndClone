
module.exports = app =>
{
    const userService = require('../service/user.service')
    var router = require('express').Router();
    router.post('/register',userService.create)
    router.post('/login',userService.login)
    router.post('/search',userService.homeSearch)
    router.post('/sugesst',userService.suggestFriend)
    router.post('/home-contact',userService.findContact)
    router.post('/friend-request',userService.findAddFriendRequest)
    router.post('/mess/:targetUserName',userService.findInfo)
    router.post('/message/current/:currentUserName/target/:targetUserName',userService.message)

    app.use('/',router);
}

