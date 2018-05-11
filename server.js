var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');
//var Comment = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// var post = new Post({
//   text: "Post Number 2",
//   comments: [{text: "comment 1_2", user:"user2"}, {text: "comment2_2", user:"user2"}]
//   })
//post.save();


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments

     app.get('/posts',function (req, res){
          
          
          Post.find(function (req, posts){
            
            res.send(posts);

          })
          
     })

     

     



// 2) to handle adding a post

  app.post('/posts',function (req,res){

      var newPost = new Post(req.body)
      
      newPost.save(function (err, respond){
        if(err)
            res.send("failed")
        else{
          res.send({id: respond.id, text:"Saved"})
        }
      })

  })

//3) to handle deleting a post

     app.delete('/delete/:id', function (req,res){
       
        id = req.params.id;
              
        Post.find({ _id: id}, (req,res) =>{
          console.log(res)
        })
        
        Post.remove({ _id : id}, function(err, res1){
           if(err)
             res.send("failed")
           else{
            
            console.log ("removed")
            res.send("Deleted")
           }
        })
  })

// 4) to handle adding a comment to a post

    app.post("/posts/:id/comments", function (req, res){
      id = req.params.id;
      newComment = {text: req.body.text, user: req.body.user}
      Post.findByIdAndUpdate(id, {
        $push: { comments: newComment }
      }, { 'new': true}, function (err, res1){
              if(err)
                res.send("failed")
              else {  
                var comId = res1.comments[res1.comments.length-1]._id
                res.send({id: comId, text:"Updated"}) 
                
              }})

      });



      // Post.update({_id :id} ,{$push: { comments: newComment } },function (err, res1) {
      //       if(err)
      //         res.send("failed")
      //       else   
      //         console.log(res1)
      //         res.send({id: res1.id, text:"Updated"}) 
      //         //res.send("Updated")
      //       })
      //   });

    

  
// 5) to handle deleting a comment from a post

        app.delete("/posts/del-comment/:id/:idC", function (req, res){
           
            id = req.params.id;
            idC = req.params.idC;
            
            Post.update({ _id: id},{$pull: { comments : {_id : idC} } },function (err, res1) {
            if(err)
              res.send("failed")
            else    
              res.send("Deleted")
            })
        });




app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
