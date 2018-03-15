var express=require("express");
var router=express.Router();
var mobile=require("../models/mobile");
var methodOverride=require("method-override");

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
               console.log(req.user.username+"fg")
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                console.log(comment.author.username+"fgead")      ;
                mobile.comments.push(comment);
                mobile.save();
                console.log(mobile.comments+"fuuuuudd");
                // res.render("../views/show.ejs",{mobile:mobile});

                res.redirect("/mobiles/"+mobile._id);
            });
        }
    });

});

router.get("/mobiles/:id/comments/:comment_id/edit",function (req,res) {
    Comment.findById(req.params.comment_id,function (err,found) {
        if(err){
            res.redirect("/mobiles");
        }
        else{
                res.render("edit1.ejs",{mobile_id:req.params.id,comment:found})

        }
    });
});

router.post("/mobiles/:id/comments/:comment_id/editdone",function (req,res) {
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.Comment,function (err,update) {
        if(err){
            res.redirect("/mobiles");
        }
        else{
            console.log(req.params.comment_id+"fdf"+req.body.Comment)
            res.redirect("/mobiles/"+req.params.id);
        }
    })

});

router.post("/mobiles/:id/comments/:comment_id/delete",function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function (err) {
        if(err){
            res.redirect("/mobiles");
        }
        else{
            console.log("fffklskp");
            res.redirect("/mobiles/"+req.params.id);        }
    })});

module.exports=router;