const env = require('./enviroment');
const fs = require('fs');
const path = require('path');
module.exports = (app)=>{
    app.locals.assetPath = function(filepath){
        if(env.name = 'development'){
            return filepath // here we dont need to change any thing we only need to change only if enviroment is production
        }
        // we are reading the manifest and parsing the json file
        return '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filepath]
    }
}