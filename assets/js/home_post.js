{
   // method to send data on Db using ajax to prevent refresh 
    let createPost = function() {
        let newPostForm = $('#new-post-form'); // gettint from from home.ejs
        newPostForm.submit(function(e){
           // console.log('clicked @ hrere')
            e.preventDefault(); // here we are preventing defailts action of submit so with the help of ajax we can proceed further

            $.ajax({ // making Ajax request using jquery to senda tata commin =g from form to DB
                type:'POST',
                url: '/posts/create',
                data : newPostForm.serialize(), // this will convert data comming from form to JSON Format i.e content : 'valeu of the post content';
                success : function(data){
                   // console.log(data)
                    //let newpost = newPostDom(data.data.post); old method
                    let newpost = newPostDom(data.data.post,data.data); // added value
                    
                    $('#posts-list-container>ul').prepend(newpost); // here using prepend we are addint at the top not at the bottom i.e wevery ne comment will be added at the top
                    deletePost($(' .delete-post-button', newpost));  // here this space impless means  .delete-post-button insede the newPost
                    new PostComment(data.data.post._id);
                    // displaying Notification for post creation
                    new Noty({
                        theme:'relax',
                        text: 'Post Published',
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                        
                    }).show();
    

                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
        
    }
  

    // method to create a post in Dom
    let newPostDom = function(post,datas){
        return $(`<li id="post-${post._id}"> 
        <p>
            <!-- making check for checking if the user is sign in and the user who created that post -->
             <small>
                 <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>
             </small>
            
             ${post.content} 
            <br>
            <small> 
            ${datas.userName}
           </small>
         </p>
         <div class="post-comments">
                 <form id="post-${ post._id }-comments-form" action="/comment/create" method="POST">
                     <input type="text" name="content" placeholder="add comments..." required>
                     <!-- sending the id of the post by hiding from the usrs-->
                     <input type="hidden" name="post" value="${post._id}">
                     <input type="submit" value="Add comments">
                 </form>

         </div>
         <div class="post-comments-list">
             <ul id="post-comments-${post._id}">
                    
            </ul>
         </div>
    
    
     </li> `)
    }

    
    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    // displaying Notification for post creation
                    new Noty({
                        theme:'relax',
                        text: 'Post Deleted',
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                        
                    }).show();
    
                    
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    // CONVERTING ALL THE POST INTO AJAX
 let convertAlPostInToAjax = function() {
        $('#posts-list-container>ul>li').each(function() {
            let self = $(this) // hete each list
            let deleteButton = $(' .delete-post-button',this);
            deletePost(deleteButton);
            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            //console.log(postId);
            new PostComment(postId);
            
        });
    }


// let convertPostsToAjax = function(){
//     $('#posts-list-container>ul>li').each(function(){
//         let self = $(this);
//         let deleteButton = $(' .delete-post-button', self);
//         deletePost(deleteButton);

//         // get the post's id by splitting the id attribute
//         let postId = self.prop('id').split("-")[1]
//         //new PostComment(postId);
//     });
//}

createPost();
convertAlPostInToAjax();
//convertPostsToAjax();

}
