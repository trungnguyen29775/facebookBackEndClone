
module.exports = app =>
{
    const userService = require('../service/user.service')
    var router = require('express').Router();
    router.post('/register',userService.create)
    router.post('/login',userService.findOne)
    app.use('/',router);
}

