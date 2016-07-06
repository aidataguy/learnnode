var express              = require("express"),
    mongoose             = require("mongoose"),
    User                 = require("./models/user"),
    passport             = require("passport"),
    bodyParser           = require("body-parser"),
    localstrat           = require("passport-local"),
    mongoosePassport     = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost/authdemo");



var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Wonkyport",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', function(req, res) {
    res.render("home");
});
// SECRET ROUTE
app.get('/secret', isLoggedIn, function(req, res) {
res.render("secret");
});
// ====================================
// Authentication Routes
// ====================================
// show signup form
app.get("/register", function(req, res){
    res.render("register");
});
// handling user signup routes
app.post("/register", function(req, res){
   req.body.username
   req.body.password
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render('register');
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
       });
   });   
});

// LOGIN ROUTES
// render login form
app.get("/login", function(req, res){
    res.render("login");
});

//LOGIN LOGIC
// MIDDLEWARE
app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login",
}) ,function(req, res) {
    
});
// LOGOUT ROUTES
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
})

// middleware creation
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(8080, function() {
    console.log('App listening on port 8080!');
});