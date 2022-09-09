const {index,one} = require('../models/product.model');

module.exports ={
    index: (req,res) => res.render('home',{
        products:index(),
        styles:['home']
    }),
    // Step 3
    addCart: (req,res) => {
        //find product in DB
        let product = one(req.body.id)
        // Check product exist in cart
        let check = req.session.cart.find(item => item.id == product.id)
        if(check){
            req.session.cart = req.session.cart.map(item => {
                if(item.id == product.id){
                    item.quantity ++
                }
                return item
            })
        }else{
            req.session.cart.push({...product, quantity:1})
        }
        
        return res.redirect("/")
    },
    // Step 5
    updateCart: (req,res) => {
        // Check quantity
        if(parseInt(req.body.quantity) <= 0){
            req.session.cart = req.session.cart.filter(item => item.id != req.body.id)
        }else{
            req.session.cart = req.session.cart.map(item => {
                if(item.id == req.body.id){
                    item.quantity = parseInt(req.body.quantity)
                }
                return item
            })
        }
        // Case 1: Is equal to zero then remove product
        // Case 2: Update all cart items setting quantity in product selected
        return res.redirect("/")
    }, 
    // Step 6
    removeCart: (req,res) =>{
            req.session.cart = req.session.cart.filter(item => item.id != req.body.id)
            return res.redirect("/")
        }
        
    
}