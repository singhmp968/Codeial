const nodemailer= require('nodemailer');
// on google gmail smtp settings
const ejs = require('ejs')
const path = require('path');
const env = require('./enviroment')
// this is is used to definre the paths
let transporter = nodemailer.createTransport(
  // before setting up enviroment.js file  
  /*{
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rahulxinghyadavmp968@gmail.com', // generated ethereal user
      pass: '8409857915', // generated ethereal password
    } }*/

    // after creating developmen in enviroment file
    env.smtp // this is a abojec as above check in enviroment file
  );

// this is the path for rrenderingthe templates 
  let renderTemplate = (data,relativePath)=>{
      let mailHtml;
      ejs.renderFile(
          path.join(__dirname, '../views/mailers', relativePath), // user in comment_mailer to defined the path do check where we are adding the path of comment and 'relativePat' this will come from comment_mailer.js file
          data,
          function(err,template){
              if(err){console.log('error in rendering the templates',err);return;}
              mailHtml = template;
          }
      )
          return mailHtml;
  }

  module.exports = {
      transporter : transporter,
      renderTemplate : renderTemplate
  }