    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    getPosts(){
        return $.get('/posts')
        .then(  (data) => {
            this.posts =  data;
            
        })



    }

    addPost(postText) {
        
        return $.post('/posts', {text: postText})
        .then(  (data) => {
            if (data.text == "Saved")
               this.posts.push({ text: postText, comments: [], _id: data.id });
            
        })

    }

    removePost(index) {
        
        return $.ajax({
            type: 'Delete',
            url: '/delete/'+this.posts[index]._id
          })
          
        .then(  (data) => {
            if (data == "Deleted")
              this.posts.splice(index, 1);
             
        })
        
    }
    
    addComment(newComment, postIndex) {
        
        return $.post('/posts/'+this.posts[postIndex]._id +'/comments',newComment)
        .then(  (data) => {
            console.log(data)
            if (data.text == "Updated"){
                newComment._id = data.id
                this.posts[postIndex].comments.push(newComment);
                
            }
        })
        
    };

    deleteComment(postIndex, commentIndex) {
        
        return $.ajax({
            type: 'Delete',
            url: '/posts/del-comment/'+this.posts[postIndex]._id +"/"+this.posts[postIndex].comments[commentIndex]._id
          })
       
        .then(  (data) => {
            if (data == "Deleted"){
                this.posts[postIndex].comments.splice(commentIndex, 1);
                return
            }
        })

        
      };
}

export default PostsRepository