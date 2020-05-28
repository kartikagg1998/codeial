/*{
    let createComment=function()
{
    let newCommentForm= $('#new-comment-form');
    newCommentForm.submit(function(e)
    {
        e.preventDefault();
    
    $.ajax({
        type:'post',
        url:'/comments/create',
        data:newCommentForm.serialize(),//convert form data int json
        success:function(data)
        {
            console.log(data);
            /// PCL = btn.parent().parent().children("#post-comment-list")
             let newComment=newCommentDom(data.data.comment);
             $("#post-comments-list>ul").prepend(newComment);
            // deletePost($(' .delete-post-button',newPost));
            new Noty({
                theme: 'relax',
                text: "Comment published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
           
        },error:function(error)
        {
            console.log(error.responseText);
        }
    });
});
    
}
//method to create a comment in DOM
let newCommentDom=function(comment)//here post is the data which we received
{
    return $(`<li id="comment-${comment._id}">
    
    <p>
            
                <small>
    <a href="/comments/destroy/${comment._id}">X</a>
    </small>
  
    
  
           
   <p> ${comment.content}</p>
   <p>${comment.post._id}</p>
</p>

</li>`)
}
createComment();
}*/








// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX


class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        console.log("aaaa");
        let pSelf = this; // pSelt cur obj
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;    // current cmt form btn 

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    //change::enable the function of toggle like button on new comment

                    newToggleLike($('.toggle-like-button',newComment));


                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                            <br>
                        <small>
                        <a class="toggle-like-button" data-likes="0" href="likes/toggle/?id="${comment._id}&type=Comment">
                        0 Likes
                        </a>
                        </small>
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}

