
module.exports = app =>
{
    const userService = require('../service/user.service')
    var router = require('express').Router();
    router.post('/register',userService.create)
    router.post('/login',userService.login)
    router.post('/search',userService.homeSearch)
    router.post('/sugesst',userService.suggestFriend)
    router.post('/home-contact',userService.findContact)
    app.use('/',router);
}

