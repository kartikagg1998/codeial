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
    <a class="delete-post_button"href="/posts/destroy/${post.id}">X</a>  
  
    </small>
    <p>${post.content}</p>
<small>
   <p>${post.user.name}</p>
</small>



<div class="post-comments">
   
    <form action="/comments/create"method="POST">
            <input type="text" name="content" placeholder="type here for comment...">
            <input type="hidden"name="post" value="<${post._id}">
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
                    $('#post-$(data.data.post_id}').remove();
                },error:function(error)
                {
                    console.log(error.responseText);
                }
            }
        )
    })
}
createPost();

}