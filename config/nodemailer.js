const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env=require('./environment');

let transporter = nodemailer.createTransport(env.smtp); //transporter defines the configuration throgh which person send the message
    


let renderTemplate = (data, relativePath) => {
    let mailHTML;//here we define the html which will be sent with email
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),//relative path is the path through which function is called
        //view/mailers contains the html for mail
        data,
        function (err, template) {
            if (err) {
                console.log("error in rendering template", err);
                return;
            }
            mailHTML = template;
        })


    return mailHTML;

}

module.exports =
{
    transporter: transporter,
    renderTemplate: renderTemplate,
}

