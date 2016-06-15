var express = require("express");
var bodyParser = require("body-parser");


var app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");

var friends = ["Aby", "clarke", "Miranda", "Justin", "Tiffany"];

app.get("/", function (req, res) {
	 /* body... */ 
	res.send("home");
});
// Posting Stuff :3
app.post("/addfriend", function (req, res) {
	 /* body... */ 
	 var newFriend = req.body.newfriend;
	 friends.push(newFriend);
	 res.redirect("friends");
});

app.get("/friends", function (req, res) {
	 /* body... */ 
	res.render("friends", {names: friends});
});


app.listen(8080);