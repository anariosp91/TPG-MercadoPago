module.exports =(req,res,next) => {
    // Step 1
    let cart = []
    if(req.session && !req.session.cart){
        req.session.cart = cart
    }
    res.locals.cart = req.session.cart
    next();
};