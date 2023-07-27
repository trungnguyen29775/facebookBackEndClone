const db = require('../models')
const User = db.Users
exports.create = async (req,res) => 
{
    try{
    {
        const user = 
        {   
            user_name:req.body.userName,
            password:req.body.registerPassword,
            first_name:req.body.registerFirstName,
            last_name:req.body.registerLastName,
            dob:req.body.dob,
            gender:req.body.gender,
            avt_file_path:req.body.avtFilePath

        }
        

        await User.create(user)
          res.send('Store User Succeed with data ')
    }
  }
    catch(err)
    {
      res.status(500).send('Failed to store user in database')
    }
}

exports.findOne = (req, res) => {
    User.findOne(
        {
        where: {
            user_name:req.body.userName
          },
        }
    )
      .then(result => {
        const userData = result.dataValues
        if(userData.password===req.body.password)
        res.status(200).json({
          message: 'Authentication successful',
          userName: userData.user_name,
          avtFilePath: userData.avt_file_path,
          dob: userData.dob,
          firstName: userData.first_name,
          lastName:userData.last_name,
          gender: userData.gender
          
        });
        else
        res.status(401).json({
          message: 'Authentication failed',
          error: 'Invalid username or password'
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
};

exports.findAll = (req, res) => {
    User.findAll(
        {
            where:
            {

            }
        }
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
};

exports.update = (req,res)=>
{
    const userId = req.body.userId;
    User.update(req.body, {
      where: { user_id: userId }
    })
      .then(num => {
        if (num == 1) {
          res.send('Update User!');
        } else {
          res.send({
            message: `Cannot update User with id=${userId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with UserId=" + userId
        });
      });
}

exports.destroy = (req,res)=>
{
    const userId = req.body.userId;
    User.destroy({
        where: { user_id: userId }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was deleted successfully!"
            });
          } else {
            res.send('Can not delete User');
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete User with UserId=" + userId
          });
        });
}
