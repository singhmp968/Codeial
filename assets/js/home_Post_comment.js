// reffered from sir' solution the home_post.js can also be done like this
class PostComment {
    constructor(postId){
    this.postId = postId; // getting post -Id 
    this.postContainer = $(`#post-${postId}`); // here we are actualling the post in which comments is associated please check home_post.js line no 40 let newPostDom = function(post,datas){ return $(`<li id="post-${post._id}"> when we are creating aa new post  
      // this.newCommentForm = $(`#post-${postId}-comments-form`); // this is included in the comment creating form 
   this.newCommentForm = $(`#post-${postId}-comments-form`); 
    
   console.log('aasddsas',this.newCommentForm)
    this.createComment(postId)
    //TODO : get Som help here need to clearify immeditely by rommorow
    let self = this;
   // gettig all the existing comments
    $(' .delete-comment-button',this.postContainer).each(function(){ // iteratinf to each to send that sepcifice that need to be deleted
        self.deleteComment($(this));
    });
    }

    createComment(postId){
        console.log('--***-->',this);
        let pSelf = this;
          
        //console.log('ppppoo=>',this.newCommentForm);
       this.newCommentForm.submit(function(e){
            console.log('inside')
            e.preventDefault(); // preventing default of 
            let self = this;
            $.ajax({
                type : 'post',
                url : '/comment/create',
                data : $(self).serialize(),
                success : function(data){  
                    console.log('dddaattaa=>',data) 
                        let newComment = pSelf.newCommentDom(data.data.comment,data.data.userDetails);
                        $(`#post-comments-${postId}`).prepend(newComment);
                        pSelf.deleteComment($(' .delete-comment-button', newComment));

                }, error : function(error) {
                    console.log('error',error.responseText);

                } 
            });
        
        });
    
    }

    newCommentDom(comment,username){
        return $(`<li id="comment-${comment._id}">
        <p>
                <small>
                    <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                </small>
            
    
            ${comment.content}
            <br>
        <small>
            ${ username }
        </small>
    
        </p>    
    
    </li>`)
    }
    deleteComment(deleteLink){
        console.log($(deleteLink).prop('href'));
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success: function(data){ // got comment Id for deleting 
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                }, error: function(err){
                    console.log('error',err.responseText);
                }
            })
        })
    }

}

// {   // method to create post
//     let createComment = function() {
//         let commentForm = $(`post-${post._id}-comments-form`);
//         commentForm.submit(function(e){
//             console.log('@clciedd');
//             e.preventDefault();
//         })
//     }
//     // method to display post

// createComment();
// }