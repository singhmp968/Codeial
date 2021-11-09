const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory) // check if logDirectory exist or not id not then it will be created
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});

const development = {
    name:'development',
    asset_path : '/assets',
    session_cookie_key:'something',
    db:'codeial_dev',
    smtp: {
        // adding it for smtp configurating  
        
          service:'gmail',
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'rahulxinghyadavmp968@gmail.com', // generated ethereal user
            pass: '8409857915', // generated ethereal password
          }
        },
        google_client_id : "511740367557-l5d1g64grtnhmsfg6oohdh62kk407557.apps.googleusercontent.com",
        google_client_secret : "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",
        google_call_back_URL: "http://localhost:8000/user/auth/google/callback", // call-back url similar and it is comming from same call back that we have provided in google console
        jwt_secret:'codeial',
        morgan: {
          mode: 'dev',
          options: {stream: accessLogStream}
      }
}
const production = {
    name:'production',

    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        // adding it for smtp configurating  
        
          service:'gmail',
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, // generated ethereal user
            pass: process.env.CODEIAL_GMAIL_PASSWORD, // generated ethereal password
          }
        },
        google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
        google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
        google_call_back_URL: process.env.CODEIAL_GOOGLE_CALLBACK_RURL, // call-back url similar and it is comming from same call back that we have provided in google console
        jwt_secret: process.env.CODEIAL_JWT_SECRET,
        morgan: {
          mode: 'combined',
          options: {stream: accessLogStream}
      }

}

//module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);