var express=require("express");
var router=express.Router();
var mobile=require("../models/mobile");
var Comment=require("../models/comment");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


router.get("/mobiles/:id/comments/new",isLoggedIn,function(req,res){
    mobile.findById(req.params.id,function(err,mobile){
        if(err)
            console.log(err);
        else
            res.render("../views/comments/new1.ejs",{mobile:mobile});
    });

});


router.post("/mobiles/:id/comments",function (req,res) {
    mobile.findById(req.params.id,function(err,mobile) {
        if(err)
        {
            console.log(err);
            res.redirect("/mobiles");
        }
        else
        {
            Comment.create(req.body.comment,function(err,comment){
                mobile.comments.push(comment);
                mobile.save();
                console.log(mobile.comments+"fuuuuudd");
                // res.render("../views/show.ejs",{mobile:mobile});

                res.redirect("/mobiles/"+mobile._id);
            });
        }
    });

})

module.exports=router;