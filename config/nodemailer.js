const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter = nodemailer.createTransport({ //transporter defines the configuration throgh which person send the message
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user:'akartik1998@gmail.com',
        pass:'subhash@1998'
    }
});

// ab hogya thik

let renderTemplate=(data,relativePath)=>{
    let mailHTML;//here we define the html which will be sent with email
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),//relative path is the path through which function is called
                                                            //view/mailers contains the html for mail
        data,
        function(err,template)
        {
            if(err)
            {
                console.log("error in rendering template",err);
                return;
            }
                mailHTML=template;
            })
    
        
    return mailHTML;
    
        }

module.exports=
{
    transporter:transporter,
    renderTemplate:this.renderTemplate,
}
    
