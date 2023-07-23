// Create web server
// http://localhost:3000/comments
var express = require('express');
var app = express();
var fs = require("fs");

// Get comments
app.get('/comments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

// Add comments
var comments = {
   "comments" : [
      {
         "id": 1,
         "author": "Pete Hunt",
         "text": "This is one comment"
      },
      {
         "id": 2,
         "author": "Jordan Walke",
         "text": "This is *another* comment"
      }
   ]
}
app.get('/addComment', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["comments"].push(comments);
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// Delete comments
app.get('/deleteComment', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["comments"][1];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// Update comments
app.get('/updateComment', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["comments"][1]["text"] = "This is *another* comment";
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// Create web server
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("REST API app listening at http://%s:%s", host, port)
})