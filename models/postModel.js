var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//design the two schema below and use sub docs 
//to define the relationship between posts and comments


let commentSchema = new Schema({
    text: String,
    user: String
    

});

//let Comments = mongoose.model('comment', commentSchema)

let postSchema = new Schema({
    text: String,
    comments: [commentSchema]
});

let Post = mongoose.model('post', postSchema)


module.exports = Post;




