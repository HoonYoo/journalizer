//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "This is the first journal on this website!";
const aboutContent = "Hoon is interested in a wide variety of topics which includes startups, venture investing, technology, blockchain, history, anthropology, drums, freediving, mma, strength training among others.";
const contactContent = "If you would like to get in touch with the developer of this Website, Hoon, please contact him at yoochr5@gmail.com! Apart from the tech space, Hoon enjoys talking about history, anthropology, drumming, mma, freediving, and strength training in his free time.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-hoon:DbqudgnsYbh0102%21%40%23@cluster0.zzohz.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const postSchema = {
 title: String,
 content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
   res.render("home", {
     startingContent: homeStartingContent,
     posts: posts
     });

 });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
     title: req.body.postTitle,
     content: req.body.postBody
   });

   post.save(function(err){
      if (!err){
        res.redirect("/");
      }
    });

});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId}, function(err, post){

      res.render("post", {

    title: post.title,

    content: post.content

  });
});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully on port 3000");
});
