const nodeMailer = require('../config/nodemailer');
exports.frogotpasswordLink = function(resetpassobj,email){
    console.log('forgetpsooo==>',resetpassobj);
    let htmlString = nodeMailer.renderTemplate({resetpassobj : resetpassobj,email:email},'/forgotEmail/forgotEmailtemp.ejs');
    nodeMailer.transporter.sendMail({
        from:'xinghmp968@gmail.com',
        to:email,
        subject:'new comment published',
        //html:'<h1> yup, your comment is now published link is http://localhost:8000/user/reset_password/?sadas</h1>'
        //html:'<h1> yup, your comment is now published link is http://localhost:8000/user/reset_password/?access_token='+resetpassobj.accessToken +'</h1>'
        
        html:htmlString
    },(err,info)=>{ // in case if there is some error
        if(err){console.log('errroe in sending mail',err); return}
        console.log('Message sent',info);
        return;
    
    })

}