module.exports.home=function(request,response)
{
    console.log(request.cookies);
    response.cookie('user_id',20);

    //response.end('<h1>Express is up for codeial</h1>');
    response.render('home',{
        title:"Home"
    });
}

