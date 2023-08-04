const db = require('../models')
const Post = db.Post
exports.create = async (req,res) => 
{
    try{
    {
        const post = 
        {   
            content: req.body.content,
            img_post_file_path:req.body.imgPostFilePath?req.body.imgPostFilePath:null,
            date_post:req.body.datePost,

        }
        await Post.create(post)
          res.redirect('Store Post!')
    }
  }
    catch(err)
    {
        console.log("Fail in Post Service, Err: ",err)
    }
}

exports.findAll = (req, res) => {
    Post.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Post."
        });
      });
};

exports.update = (req,res)=>
{
    const postId = req.body.postId;
    Post.update(req.body, {
      where: { post_id: postId }
    })
      .then(num => {
        if (num == 1) {
          res.send('Update Post!');
        } else {
          res.send({
            message: `Cannot update Post with id=${postId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Post with PostId=" + postId
        });
      });
}

exports.destroy = (req,res)=>
{
    const postId = req.body.postId;
    Cars.destroy({
        where: { post_id: postId }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Post was deleted successfully!"
            });
          } else {
            res.send('Can not delete Post');
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Post with PostId=" + postId
          });
        });
}
