var express = require("express");

var app = express();

// "/" => "Hi There!"
app.get("/", function(req, res){
	res.send("Hi There!");
});

// "/bye" => "bye!"
app.get("/bye", function(req, res){
	res.send("Bye Bye");
});

// "/dog" => "bow!"
app.get("/dog", function(req, res){
	res.send("bow bow");
});

app.get("/r/:subredditName", function (req, res) {
	 /* body... */ 
	 console.log(req.params);
	 res.send("So you are a reddit scroller eh :D!");
});

app.get("/r/:subredditName/comments/:id/:title/", function (req, res) {
	 /* body... */ 
	 res.send("Welcome to comments page");
});

app.get("*", function(req, res){
	res.send("Can't understand what you were looking for");
});


// Tells express to listen for requests at an specified port
app.listen(8080);