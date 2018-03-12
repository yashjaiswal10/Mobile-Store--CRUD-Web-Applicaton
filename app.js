
var express =require("express");
var app=express();
var bodyParser=require("body-parser");
var mobile=require("./models/mobile");
var seedDB=require("./seed");
var Comment=require("./models/comment");
var flash=require("connect-flash");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");

//required routes
var commentRoutes=require("./routes/comments");
var mobilesRoutes=require("./routes/mobiles");
var indexRoutes=require("./routes/index");

// mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/mobilestore");
// mongoose.connect('mongodb://10.7.0.3:27107/data/mobilestore');

app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("design"));
var currentUser;

seedDB();



app.use(require("express-session")({
    secret:"Redmi Note 4 is the best",
    resave:false,
    saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
    res.locals.currentUser=req.user;
    next();
});

app.use(indexRoutes);
app.use(mobilesRoutes);
app.use(commentRoutes);

app.listen(1000,function(){
    console.log("Server Ready");
});