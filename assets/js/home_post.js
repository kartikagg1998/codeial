{
    //method to submit form data using ajax
    console.log("hello");
    let createPost=function()
{
    let newPostForm= $('#new-post-form');
    newPostForm.submit(function(e)
    {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/posts/create-post',
            data:newPostForm.serialize(),//convert form data int json
            success:function(data)
            {
                //console.log(data);
                let newPost=newPostDom(data.data.post);
                $("#post-list-container>ul").prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
                 // call the create comment class
                new PostComments(data.data.post._id);

                //change::enable the function of toggle like button on new post

                newToggleLike($('.toggle-like-button',newPost));

                new Noty({
                    theme: 'relax',
                    text: "Post published!",
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


//method to create a post in DOM
let newPostDom=function(post)//here post is the data which we received
{
    return $(`<li id="post-${post._id}">
    <small>
            
              <!-- used for deleting the post only this a tag -->
    <a class="delete-post-button"href="/posts/destroy/${post._id}">X</a>  
  
    </small>
    <p>${post.content}</p>
<small>
   <p>${post.user.name}</p>
</small>
<br>
<small>
    <a class="toggle-like-button" data-likes="0" href="likes/toggle/?id="${post._id}&type=Post">
    0 Likes
    </a>
    </small>



<div class="post-comments">
   
    <form action="/comments/create"method="POST">
            <input type="text" name="content" placeholder="type here for comment...">
            <input type="hidden"name="post" value="${post._id}">
            <input type="submit" value="Add comment">
    </form>


<div class="post-comments-list">
<ul id="post-comments-${post._id}">

</ul>
</div>
   

</div>
</li>`)
}

//method to delete a post from DOM
let deletePost=function(deleteLink)
{
    $(deleteLink).click(function(e)
    {
        e.preventDefault();
        $.ajax(
            {
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data)
                {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post is deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error)
                {
                    console.log(error.responseText);
                }
            }
        )
    })
}


 //loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
 let convertPostsToAjax = function(){
     $('#post-list-container>ul>li').each(function(){
         let self = $(this); // in self actually the DOM object is stored  The post(which are already exists before the creation of post through ajax)
                              // you are adding event listner to is stored in self
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1];//this first fetched the property id of the post as we know the post id is of the form
        //                post-<%=post_._id %> so we split the array by using split function this splits the string wherever it encounters
        //                a '-' and covert it in to an array on the array's 1 element will be the Id of the post
//                        




        new PostComments(postId);
    });
}



createPost();
convertPostsToAjax();
}
