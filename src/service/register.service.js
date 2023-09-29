const axios = require('axios')
exports.checkValidEmail = async(req,res)=>
{
    const email = req.body.email; // Địa chỉ email cần kiểm tra
    const apiKey = '950ddf0769dd999be2e401308ffe3c02'; // Thay YOUR_API_KEY bằng khóa API của bạn
    
    axios.get(`http://apilayer.net/api/check?access_key=${apiKey}&email=${email}`)
      .then(response => {
        const { format_valid, smtp_check } = response.data;

        if (format_valid && smtp_check) {
         res.send('Valid email')
        } else {
            res.send('Invalid email')

        }
      })
      .catch(error => {
        console.error(error);
      });
    
}