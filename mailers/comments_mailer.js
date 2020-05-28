const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail(
        {
            from: 'akartik1998@gmail.com',
            to: comment.user.email,
            subject: "New Comment Published",
            //    html:'<h1>yup! your comment is published!<h1>',
            html: htmlString

        }, (err, info) => {
            if (err) {
                console.log("error in sending email", err);
                return;
            }
            console.log("message sent", info);
            return;
        });
}