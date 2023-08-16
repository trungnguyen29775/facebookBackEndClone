const e = require('cors');
const db = require('../models')
const { Op } = require('sequelize');
const FriendShip = db.Friendship

exports.createFriendShip = async (req,res) => 
{
    try{
    {
        const currentUserDataAddFriend = 
        {   
            user_name:req.body.currentUser,
            friend_user_name:req.body.targetUser,
            status:"pending",
            add_friend_date:req.body.addFriendDate,
        }
        const targetUserDataAddFriend = 
        {   
            user_name:req.body.targetUser,
            friend_user_name:req.body.currentUser,
            status:"pending",
            add_friend_date:req.body.addFriendDate,
        }
        

        await FriendShip.create(currentUserDataAddFriend)
        await FriendShip.create(targetUserDataAddFriend)
        res.status(200).send('Store friendship in database succed')
    }
  }
    catch(err)
    {
      res.status(500).send('Failed to store user in database')
    }
}

exports.destroyFriendShip = async (req, res) => {
  FriendShip.destroy({
    where: {
      [Op.or]: [
        {
          user_name: req.body.currentUser,
          friend_user_name: req.body.targetUser
        },
        {
          user_name: req.body.targetUser,
          friend_user_name: req.body.currentUser
        }
      ]
    }
  })
    .then((result) => {
      res.status(200).send("Delete Friend Request");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};


exports.updateFriendShip = async (req, res) => {
  try{
    const currentUserFriendShip = await FriendShip.findOne({
      where:{
        user_name:req.body.currentUserName,
        friend_user_name:req.body.targetUserName
      }
    })
    const targetUserFriendShip = await FriendShip.findOne({
      where:{
        user_name:req.body.targetUserName,
        friend_user_name:req.body.currentUserName
      }
    })
    const newCurrentUserFriendShip = {
      ...currentUserFriendShip,
      status:"accepted"
    }
    const newTargetUserFriendShip = {
      ...targetUserFriendShip,
      status:"accepted"
    }
    await currentUserFriendShip.update(newCurrentUserFriendShip)
    await targetUserFriendShip.update(newTargetUserFriendShip)
    res.status(200).send("Accept Friend!!")
  }
  catch(err)
  {
    res.status(500).send(err)
  }
};



// exports.login = (req, res) => {
//     User.findOne(
//         {
//         where: {
//             user_name:req.body.userName
//           },
//         }
//     )
//       .then(result => {
//         const userData = result.dataValues
//         if(userData.password===req.body.password)
//         res.status(200).json({
//           message: 'Authentication successful',
//           userName: userData.user_name,
//           avtFilePath: userData.avt_file_path,
//           dob: userData.dob,
//           firstName: userData.first_name,
//           lastName:userData.last_name,
//           gender: userData.gender
          
//         });
//         else
//         res.status(401).json({
//           message: 'Authentication failed',
//           error: 'Invalid username or password'
//         });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving User."
//         });
//       });
// };

// exports.homeSearch = (req, res) => {
//     User.findAll(
//         {
//           where: {
//             [Op.or]: [
//               {
//                 first_name: {
//                   [Op.like]: `%${req.query.q}%`
//                 }
//               },
//               {
//                 last_name: {
//                   [Op.like]: `%${req.query.q}%`
//                 }
//               }
//             ]
//           }
//         }
//     )
//       .then(data => {
//         let usersData =[]
//         data.map((item)=>
//         {
//           let userData ={
//             userName:item.user_name,
//             firstName:item.first_name,
//             lastName:item.last_name,
//             avtFilePath:item.avt_file_path
//           }
//           usersData.push(userData)
//         })
//         res.send(usersData)
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving User."
//         });
//       });
// };

// exports.suggestFriend = (req, res) => {
//   User.findAll(
//       {
//         where: {
//           user_name: {
//             [Op.not]: "trungnguyen29775@gmail.com"
//           }
//         }
//       }
//   )
//     .then(data => {
//       console.log(data)
//       let usersData =[]
//       data.map((item)=>
//       {
//         let userData ={
//           userName:item.user_name,
//           firstName:item.first_name,
//           lastName:item.last_name,
//           avtFilePath:item.avt_file_path
//         }
//         usersData.push(userData)
//       })
//       res.send(usersData)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving User."
//       });
//     });
// };


// exports.update = (req,res)=>
// {
//     const userId = req.body.userId;
//     User.update(req.body, {
//       where: { user_id: userId }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send('Update User!');
//         } else {
//           res.send({
//             message: `Cannot update User with id=${userId}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating User with UserId=" + userId
//         });
//       });
// }

// exports.destroy = (req,res)=>
// {
//     const userId = req.body.userId;
//     User.destroy({
//         where: { user_id: userId }
//       })
//         .then(num => {
//           if (num == 1) {
//             res.send({
//               message: "User was deleted successfully!"
//             });
//           } else {
//             res.send('Can not delete User');
//           }
//         })
//         .catch(err => {
//           res.status(500).send({
//             message: "Could not delete User with UserId=" + userId
//           });
//         });
// }
