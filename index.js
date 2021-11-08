const express  = require('express');
const env = require('./config/enviroment');
const logger = require('morgan') // clling morgan for log purpose
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session'); // this library is responsible for encrypting and storing user-id into session cookie
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');
// importing passport google strategy
const passsportGoogle = require('./config/passport-google-oauth2-strategy'); // if we didnt declare the an error willthrow so it imrtan t to import this strategy

// importing passport jwt- strategey
const passportJWT = require('./config/passport-jwt-stragegy'); // importing JWT file form the given locatn
const MongoStore = require('connect-mongo')(session); // here  connect mongo reuired and aurgument 'session'
//const MongoStore = require('connect-mongo').default

//const { use } = require('./routes');

const sassmiddleWare = require('node-sass-middleware'); // css design middle ware
const flash = require('connect-flash') // for showing flash message
const customMware = require('./config/middleware') //  getting middle ware

// setting up the chat server to use with socket.io
// here we are doing for chat server part
const chatServer = require('http').Server(app); // setting up chat server
// passing chatServer on this
const chatSockets = require('./config/chat_socket').chatSockets(chatServer) // impoeting the configurationof our chat file
chatServer.listen(5000); // making chatServer to listen on port 5000
console.log('chat server is listining on port 5000');
// creting path for deploying into developmen org
const path = require('path');
// we are doing this as our Saas is running in production mode and it getting saas out-put in console log
if(env.name = 'development'){
    app.use(sassmiddleWare({
    /* old before getiing in enviroment.js file  
        src:'./assets/scss',
        dest:'./assets/css',
        debug:true, // this will be set ture if we need to display error if we find any issue while converting scss file to css
        outputStyle:'extended',
        prefix:'/css' // this for node server to find scss file i.e for layoyt 
        */
        // new way
        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true, // this will be set ture if we need to display error if we find any issue while converting scss file to css
        outputStyle:'extended',
        prefix:'/css' // this for node server to find scss file i.e for layoyt 
        

    }))
}
// make the uploads avaliable to the browsers
app.use('/uploads',express.static(__dirname + '/uploads')); // for using in image displaying in profile
app.use(logger(env.morgan.mode, env.morgan.options));
const cookieParser = require('cookie-parser'); // cookie parser
app.use(express.urlencoded());
app.use(cookieParser()) //setting up the cookie parser
// we need to implement out layout befor our routes beacause in routes views is going to be render
app.use(expressLayout);
// uses express route
//app.use(express.static('./assets'))//older defore movinf to enviremint.js
// we are moving './assets' to asset_path in development object in enviroment.js
//app.use(express.static(env.asset_path)) // passing './asset'
app.use(express.static(path.join(__dirname, env.asset_path)));

// extract style and scrit from the sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)


// setting up view engine for our app
app.set('view engine','ejs');
app.set('views','./views')
// Mongostore is used to store the session cookie in the db
// we need to follow order
//here we are creating this middle ware it will going to take the session cookie i.e session and then encrypt it
app.use(session({
    name:'codeial', // neme of the session cookei
    //TODO:change before deployment in production mode
    secret:env.session_cookie_key, // when ever encryption happens there is a key to encode and decode and here we are usinf secrte to enceode and decode
    saveUninitialized:false,  // whenever there is a request which is nt initilize i.e a session which is not initilize that also mean that the user has not logged in so in that case we don't need to store extra data in session cookie
    resave:false, // in resave if the identity is estiblished or some sort o data is present i.e session data do we need to re-write it? no we dont need to save again
    cookie:{ // giving time limit after which our coookie will get expire
        maxAge:(1000*60*100)
    },
    // Mongostore is used to store the session cookie in the db
    store: new MongoStore(
        {
        
            mongooseConnection: db, // connecting to DB
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
        )

    // store: MongoStore.create(
    //     {
        
    //         mongooseConnection: 'mongodb://localhost/codeial_dev', // connecting to DB
    //         autoRemove:'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok')
    //     }
    // )
   
}))

// here when ever app is initilize passport is also initilize and then app.use(passport.setAuthenticatedUser) is called 

app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser)
app.use(flash()); // using flase after session is being used
app.use(customMware.setFlash) // using custom middle ware 
app.use('/',require('./routes')) // any request is comming required the index of route

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port ${port}`);
    console.log('process enviromt',process.env.CODEIAL_ASSET_PATH)
})
// hi added some commnets