//this middleware is used to pass  messages which are written in controller of users in ejs/html file
module.exports.setFlash=function(request,response,next)
{
    response.locals.flash=
    {
        'success':request.flash('success'),
        'error':request.flash('error'),

    }
    next();
}