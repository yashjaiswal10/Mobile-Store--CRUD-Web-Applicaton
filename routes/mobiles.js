var seedDB=require("../seed");
var methodOverride=require("method-override");

var express=require("express");
var router=express.Router();
var mobile=require("../models/mobile");
var Comment=require("../models/comment");
var bodyParser=require("body-parser");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

router.get("/mobiles",function (req,res) {

    // res.render("mobiles.ejs",{mobile:mobiles});
    // console.log(req.user+"jiu");/////
    mobile.find({},function (err,allmobile){
        if(err) {
            console.log("hi");

        }
        else {
            res.render("mobiles.ejs",{mobile:allmobile,currentUser:req.user});
        }

    });

});

router.post("/mobiles",function (req,res) {
    // console.log(req.User+"ff");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newmobile = {name: name, image: image, description: desc,author:author};
    // var newmobiles={name:name,image:image};
    // mobile.push(newmobiles);
    //body parser no db

    mobile.create(newmobile, function (err, newlymobile) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newlymobile);
            res.redirect("/mobiles");
        }
    });
});



    router.get("/mobiles/new",isLoggedIn,function (req,res) {
        res.render("new.ejs");
    });
    router.get("/mobiles/:id",isLoggedIn,function (req,res) {
        mobile.findById(req.params.id).populate("comments").exec(function (err,mobile) {
            if(err)
                console.log("ooo");
            else
            { 
                console.log("comments-"+mobile.comments);
                             // Comment.create(
                //     {
                //         text:"This is the most selling phone",
                //         author:"Yash"
                //     },function(err,Comment){
                //         if(err)
                //             console.log(err);
                //         else
                //         {
                //             mobile.comments.push(Comment);
                //             mobile.save();
                //             console.log(mobile+"hiiiiii");
                //             console.log("fffkkk"+mobile+"ddddd"+req.params.id);
                            res.render("show.ejs",{mobile:mobile});
                //             // console.log(comment);
                //         }
                // console.log(mobile+"kkj");
                    // }
                // );


            }

        });

    });


router.get("/mobiles/:id/edit",function (req,res) {if(req.isAuthenticated()){
    mobile.findById(req.params.id,function(err,found)
    {
        if(err){
            res.redirect("/mobiles");
        }
        else
        {if(found.author.username==req.user.username){
            res.render("edit.ejs",{mobile:found});}else{console.log(found.author.username);console.log(req.user.username);
            res.redirect("/mobiles/"+req.params.id);
        }}
    });
}
else{res.redirect("/login");
}
});

router.post("/mobiles/:id",function (req,res) {
    mobile.findByIdAndUpdate(req.params.id,req.body.mobile,function (err,update) {
        if(err){
            res.redirect("/mobiles");
        }
        else{
            res.redirect("/mobiles/"+req.params.id);
        }
    })

});
router.post("/mobiles/:id/delete",function(req,res){
    mobile.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            res.redirect("/mobiles");
        }
        else{
console.log("fffkl");
            res.redirect("/mobiles");        }
    })});

module.exports=router;


