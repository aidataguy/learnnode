var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	method_override = require("method-override"),
	sanitizer =require("express-sanitizer");
mongoose.connect("mongodb://localhost/myblogapp");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(method_override("_method"));
app.use(sanitizer());

// Mongoose & Model Configs
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}// create
});

var Blog = mongoose.model("Blog", blogSchema);

// Restful Routes 
app.get("/", function (req, res) {
	 /* body... */ 
	 res.redirect("/blogs");
})


app.get("/blogs", function (req, res) {
	 /* body... */ 
	 Blog.find({}, function (err, blogs) {
	 	 /* body... */ 
	 	 if(err){
	 	 	console.log(err)
	 	 }else {
	 	 	res.render("index", {blogs: blogs});
	 	 }
	 });
})

// New Route
app.get("/blogs/new", function (req, res) {
	 /* body... */ 
	 res.render("new");
});
// create route
app.post("/blogs", function (req, res) {
	 /* body... */ 
	 console.log(req.body);
	 req.body.blog.body = req.sanitize(req.body.blog.body)
	 console.log(req.body);
	 Blog.create(req.body.blog, function (err, newBlog) {
	 	 /* body... */ 
	 	if (err) {
	 		res.render("new");
	 	}else {
	 		res.redirect("/blogs");
	 	}
	 });
});

// Show Route

app.get("/blogs/:id", function (req, res) {
	 /* body... */ 
	 Blog.findById(req.params.id, function (err, foundBlog) {
	 	 /* body... */ 
	 	 if (err) {
	 	 	res.redirect("/blogs");
	 	 } else{
	 	 	res.render("show", {blog: foundBlog});
	 	 }
	 })
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
})


// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

// Destroy Route (need to work on Destroy)
app.delete("/blogs/:id", function (req, res) {
	 /* body... */ 
	 // destroy Blog
	 Blog.findByIdAndRemove(req.params.id, function (err) {
	 	 /* body... */ 
	 	 if (err) {
	 	 	res.redirect("/blogs");
	 	 }else {
	 	 	res.redirect("/blogs");
	 	 }
	 })
	 // redirect somewhere
});



app.listen(8080, function () {
	 /* body... */ 
	 console.log("Blog Server Is Running");
})