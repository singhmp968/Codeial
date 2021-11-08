module.exports.setFlash = function(req,res,next){ // for passing this to the html or ejs we need to create a middle-ware that fetch every thing from req.flash
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
next() // passing the controll to next middle ware 
}