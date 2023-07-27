const db = require('../models')
const Comment = db.Comment  
exports.create = async (req,res) => 
{
    try{
    {
        const comment = 
        {   
            content: req.body.content,
            img_comment_file_path:req.body.imgCommentFilePath?req.body.imgCommentFilePath:null,
            date_comment:req.body.dateComment,

        }
        await Comment.create(comment)
          res.redirect('Store Comment!')
    }
  }
    catch(err)
    {
        console.log("Fail in Comment Service, Err: ",err)
    }
}

exports.findAll = (req, res) => {
    Comment.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Comment."
        });
      });
};

exports.update = (req,res)=>
{
    const commentId = req.body.commentId;
    Comment.update(req.body, {
      where: { comment_id: commentId }
    })
      .then(num => {
        if (num == 1) {
          res.send('Update Comment!');
        } else {
          res.send({
            message: `Cannot update Comment with id=${commentId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Comment with commentId=" + commentId
        });
      });
}

exports.destroy = (req,res)=>
{
    const commentId = req.body.commentId;
    Cars.destroy({
        where: { comment_id: commentId }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Comment was deleted successfully!"
            });
          } else {
            res.send('Can not delete comment');
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Comment with commentId=" + commentId
          });
        });
}
