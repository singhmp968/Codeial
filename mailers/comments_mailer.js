const nodeMailer = require('../config/nodemailer');

// module.export = newComment can be re write as
// this is another way of exporting
//exports.newComment = (comment) => { // original modifide beacause of some reason do check commne t conteoller for reason
    exports.newComment = (comment,oirCommData) => {
  
console.log('inside new mailer');
    console.log('asdad comments=>>',comment)
        let htmlString = nodeMailer.renderTemplate({comment : comment,oirCommData:oirCommData},'/comments/new_comments.ejs') // well passinng the comment data to new_comments page and passing the relative path we are getting the relative path from  nodemailer go and check line no 18 relativePath 'let renderTemplate = (data,relativePath)=>{}' this method as we heve already defined the previous path
    nodeMailer.transporter.sendMail({
        from:'xinghmp968@gmail.com',
        to:comment.user.email,
        subject:'new comment published',
       // html:'<h1> yup, your comment is now published </h1>'
       html:htmlString
    },(err,info)=>{ // in case if there is some error
        if(err){console.log('errroe in sending mail',err); return}
        console.log('Message sent',info);
        return;
    
    })
}