const db = require('../models')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const FriendShip = db.Friendship
const User = db.Users
exports.create = async (req,res) => 
{
    try{
    {
      const password = req.body.registerPassword
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
          if (err) {
            console.error(err);
            return;
          }
          const hashedPassword = hash;
          const user = 
          {   
              user_name:req.body.userName,
              password:hashedPassword,
              first_name:req.body.registerFirstName,
              last_name:req.body.registerLastName,
              dob:req.body.dob,
              gender:req.body.gender,
              avt_file_path:req.body.avtFilePath
  
          }
        await User.create(user)
        res.status(200).send( user)

        });
      });
    }
  }
    catch(err)
    {
      res.status(500).send('Failed to store user in database')
    }
}

exports.login = (req, res) => {
    User.findOne(
        {
        where: {
            user_name:req.body.userName
          },
        }
    )
      .then(result => {
        const userData = result.dataValues
        bcrypt.compare(req.body.password, userData.password, (err, isMatch) => {
          if (err) {
            console.error(err);
            return;
          }
        
          if (isMatch) {
            res.status(200).json({
              message: 'Authentication successful',
              userName: userData.user_name,
              avtFilePath: userData.avt_file_path,
              dob: userData.dob,
              firstName: userData.first_name,
              lastName:userData.last_name,
              gender: userData.gender
              
            });
          } else {
            res.status(401).json({
              message: 'Authentication failed',
              error: 'Invalid username or password'
            });
          }
        })
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
};

exports.homeSearch = (req, res) => {
    User.findAll(
        {
          where: {
            [Op.or]: [
              {
                first_name: {
                  [Op.like]: `%${req.query.q}%`
                }
              },
              {
                last_name: {
                  [Op.like]: `%${req.query.q}%`
                }
              }
            ]
          }
        }
    )
      .then(data => {
        let usersData =[]
        data.map((item)=>
        {
          let userData ={
            userName:item.user_name,
            firstName:item.first_name,
            lastName:item.last_name,
            avtFilePath:item.avt_file_path
          }
          usersData.push(userData)
        })
        res.send(usersData)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
};

exports.findContact = (req,res)=>{
  FriendShip.findAll({
    where:{
      user_name:req.body.userName,
      status: 'accepted'
    }
  })
  .then(data=>
    {
      let targetUserNames =[]
      data.map(item=>targetUserNames.push(item.friend_user_name))
      return User.findAll({
        where:{
          user_name:{
            [Op.in]:targetUserNames
          }
        }
      })
    })
    .then(result=>{
      let responseDatas = []
      result.map(item=>
        {
          let responseData = {
            userName: item.user_name,
            avtFilePath:item.avt_file_path,
            firstName:item.first_name,
            lastName:item.last_name,
          }
          responseDatas.push(responseData)
        })
      res.status(200).send(responseDatas)
    })
    .catch(e=>
      res.status(500).send(e)
      )
}



exports.suggestFriend = (req, res) => {
 FriendShip.findAll({
    where:{
      user_name:req.body.userName
    }
  })
  .then(data=>
    {
      let friendUserNames =[]
      data.map(item=>friendUserNames.push(item.friend_user_name))
      return User.findAll({
        where:{
          user_name:{
            [Op.notIn]:friendUserNames,
            [Op.not]:req.body.userName
          }
        }
      })
    })
    .then(data => {
      let usersData =[]
      data.map((item)=>
      {
        let userData ={
          userName:item.user_name,
          firstName:item.first_name,
          lastName:item.last_name,
          avtFilePath:item.avt_file_path,
          status:null
        }
        usersData.push(userData)
      })
      res.send(usersData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};

exports.findAddFriendRequest = (req,res)=>{
  FriendShip.findAll({
    where:{
      user_name:req.body.userName,
      status: 'pending'
    }
  })
  .then(data=>
    {
      let targetUserNames =[]
      data.map(item=>targetUserNames.push(item.friend_user_name))
      return User.findAll({
        where:{
          user_name:{
            [Op.in]:targetUserNames
          }
        }
      })
    })
    .then(result=>{
      let responseDatas = []
      result.map(item=>
        {
          let responseData = {
            userName: item.user_name,
            avtFilePath:item.avt_file_path,
            firstName:item.first_name,
            lastName:item.last_name,
          }
          responseDatas.push(responseData)
        })
      res.status(200).send(responseDatas)
    })
    .catch(e=>
      res.status(500).send(e)
      )
}

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

exports.findInfo = (req,res)=>{
  User.findOne({
    where:{
      user_name:req.params.targetUserName
    }
  })
  .then(data=>{
    let responseData = {
      userName: data.user_name,
      avtFilePath:data.avt_file_path,
      firstName:data.first_name,
      lastName:data.last_name,
    }
    res.send(responseData)
  })
  .catch(e=>{
    res.send(e)
  })
}
exports.message = (req,res)=>{
  const currentUserName = req.params.currentUserName;
  const targetUserName = req.params.targetUserName;
  res.send(`From ${currentUserName} to ${targetUserName}`)
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
