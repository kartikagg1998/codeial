const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=tequire('path');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user:'akartik1998',
        pass:'subhash@1998',
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template)
        {
            if(err)
            {
                console.log("error in rendering template");
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
    
