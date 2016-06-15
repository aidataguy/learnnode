var express = require("express");

var app = express();

// When Visiting "/" gives "Hi there, Welcome to my assignment"
app.get("/", function (req, res) {
	 /* body... */ 
	 res.send("Hi there, Welcome to my assignment");
});

// When Visiting "/speak/pig" gives "The pig says 'oink'""
app.get("/speak/:animal", function (req, res) {
	 /* body... */ 
	 
	 var sound = {
	 	pig: "oink",
	 	cow: "moo",
	 	dog: "woof woof",
	 	cat: "I hatez you hooman",
	 	goldfish: "..."
	 }
	 var animal = req.params.animal.toLowerCase();
	 var sound = sound[animal];
	res.send("The " + animal + " says '" + sound + "'");
});

// Repeat routes

app.get("/repeat/:message/:times", function (req, res) {
	 /* body... */ 
	 var message = req.params.message;
	 var times = Number(req.params.times);
	 var result = " ";
	 for (var i = 0; i < times; i++) {
	 	result += message + " ";
	 }
	 res.send(result);
});

app.get("*", function (req, res) {
	 /* body... */ 
	 res.send("Sorry something went wrong what are you dojng");
});

app.listen(8080);