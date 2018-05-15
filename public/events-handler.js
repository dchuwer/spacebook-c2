class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {
                var newPost = this.postsRepository.addPost($input.val());
                newPost.then( () =>  {
                    this.postsRenderer.renderPosts(this.postsRepository.posts);
                    $input.val("");
                })
                
            }
            });        
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            
            let index = $(event.currentTarget).closest('.post').index();
            
            var delPost = this.postsRepository.removePost(index);
            delPost.then( () => {
                this.postsRenderer.renderPosts(this.postsRepository.posts);
            })
            
          });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
          
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
          
            let postIndex = $(event.currentTarget).closest('.post').index();
            let newComment = { text: $comment.val(), user: $user.val() };
          
            var resNewComment = this.postsRepository.addComment(newComment, postIndex);
            resNewComment.then( () => {
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
                $comment.val("");
                $user.val("");

            })
            
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            var delComment = this.postsRepository.deleteComment(postIndex, commentIndex);
            delComment.then( () => {
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);

            })
           
        });
    }

    upPhoto() {
        $('.formPhoto').submit(function(e){
            e.preventDefault();
            this.postsRepository.uploadPhoto($post)
            // var $post= $(event.currentTarget).closest('.formPhoto');
            // return $(form).ajaxSubmit({
            //     data: {title: "photo"},
            //     contentType: 'application/json',
                
            //     success: function(response){
            //       console.log('image uploaded and form submitted');     
            //     },
            //     error:function(res, err){
            //         console.error(err);
            //     }
            // });
            //   return false;
          
      }
          
      //    var newPhoto = this.postsRepository.uploadPhoto($post)
        //   newPhoto.then({
              
        //   })
            
               
     
    )}
}

export default EventsHandler