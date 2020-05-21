const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment) =>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    //console.log('inside new comment mailer',comment);
nodeMailer.transporter.sendMail(
    {
        from:'akartik1998@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
    //    html:'<h1>yup! your comment is published!<h1>',
       html:htmlString

    },(err,info) => {
        if(err)///what happenent mail to jaa rha h ab tumne tempolate poora glt path vath de rkha h fir glt folder me file bhi banai h
        {
            console.log("error in sending email",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}