// Register
module.exports = app =>
{
    const registerSevice = require('../service/register.service')
    var router = require('express').Router();
    router.post('/register/check',registerSevice.checkValidEmail)
    app.use('/',router);

}