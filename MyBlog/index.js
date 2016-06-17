var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");
mongoose.connect("mongodb://localhost/myblogapp");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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

app.post("/blogs", function (req, res) {
	 /* body... */ 
	 Blog.create(req.body.blog, function (err, newBlog) {
	 	 /* body... */ 
	 	if (err) {
	 		res.render("new");
	 	}else {
	 		res.redirect("/blogs");
	 	}
	 });
});


app.listen(8080, function () {
	 /* body... */ 
	 console.log("Blog Server Is Running");
})