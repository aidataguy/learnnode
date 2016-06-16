// var express = require("express");
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/city_app");

var citySchema = new mongoose.Schema({
	name: String,
	pin: Number,
	state: String
});

var City = mongoose.model("City", citySchema);

// adding a new city to the DB 

var albama = new City({
	name: "Albama",
	pin: 21112,
	state: "NY"
});
var portland = new City({
	name: "portland",
	pin: 21770,
	state: "OK"
});
//  Adding data to db
// albama.save(function (err, city) {
// 	 /* body... */ 
// 	 if(err){
// 	 	console.log("City Not saved");
// 	 } else {
// 	 	console.log("City Saved to DB");
// 	 	console.log(city);
// 	 }
// });

// portland.save(function (err, city) {
// 	 /* body... */ 
// 	 if(err){
// 	 	console.log("City Not saved");
// 	 } else {
// 	 	console.log("City Saved to DB");
// 	 	console.log(city);
// 	 }
// });

// create and find at the same time
City.create({
	name: "Jabalpur",
	pin: 12121,
	state: "India - MP"
}, function (err, cities) {
	 /* body... */ 
	 if(err){
	 	console.log(err);
	 }else {
	 console.log("Wonderful data is saved");
	 console.log(cities);
	 }
});
// retrieve things from db

// City.find({}, function (msg, cities) {
// 	 /* body... */ 
// 	 if(msg){
// 	 	console.log(msg);
// 	 }else {
// 	 	console.log("All the cities");
// 	 	console.log(cities);
// 	 }
// })