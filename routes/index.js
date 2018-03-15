var express=require("express");
var router=express.Router();
var flash=require("connect-flash");

var User=require("../models/user");
var passport=require("passport");

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "please login first!");
    res.redirect("/login");
}


//root route
router.get("/",function(req,res){
        res.render("front.ejs");
    }
);


//register form
router.get("/register",function(req,res){
    res.render("register.ejs");
});

//sign up logic
router.post("/register",function (req,res) {
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function (err,user) {
        if(err)
        {
            console.log(err);
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/mobiles");
        });
    });



});
//login
router.get("/login",function(req,res){
    console.log(req.flash("error"));
    res.render("login.ejs",{message: req.flash("error")});
});

// app.post("/login", middleware,callback)
//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/mobiles",
        failureRedirect:"/login"
    }),function(req,res){

});

//logout
router.get("/logout",function (req,res) {
    req.logout();
    res.redirect("/mobiles");


});


module.exports=router;