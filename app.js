const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const app=express();

// let postArray=[];

const homeStartingContent="Consider now provided laughter boy landlord dashwood. Often voice and the spoke. No shewing fertile village equally prepare up females as an. That do an case an what plan hour of paid. Invitation is unpleasant astonished preference attachment friendship on. Did sentiments increasing particular nay. Mr he recurred received prospect in. Wishing cheered parlors adapted am at amongst matters.";
const aboutContent="Shot what able cold new the see hold. Friendly as an betrayed formerly he. Morning because as to society behaved moments. Put ladies design mrs sister was. Play on hill felt john no gate. Am passed figure to marked in. Prosperous middletons is ye inhabiting as assistance me especially. For looking two cousins regular amongst."
const contactContent="On recommend tolerably my belonging or am. Mutual has cannot beauty indeed now sussex merely you. It possible no husbands jennings ye offended packages pleasant he. Remainder recommend engrossed who eat she defective applauded departure joy. Get dissimilar not introduced day her apartments. Fully as taste he mr do smile abode every. Luckily offered article led lasting country minutes nor old. Happen people things oh is oppose up parish effect. Law handsome old outweigh humoured far appetite."


mongoose.connect("mongodb://localhost:27017/postsDB");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema={
  title: String,
  content: String
};

const Post=mongoose.model("Post", postSchema);

app.get("/posts/:postId", function(req, res){
  const requestedID=req.params.postId;

  Post.findOne({_id: requestedID}, function(err, post){
    if(!err){
      res.render("post",{content: post});
    }
  });

});


// app.get("/posts/:postroute", function(req, res){
//   const requestedTitle=_.kebabCase(req.params.postroute);
//
//   postArray.forEach(function(onePost){
//     const storedTitle=_.kebabCase(onePost.title);
//     if(requestedTitle===storedTitle){
//       res.render("post",{content:onePost})
//     }else{
//       console.log("404 no such website");
//     }
//
//   })

app.get("/", function(req, res){
  Post.find({},function(error, posts){
  res.render("home", {homeCont: homeStartingContent, content:posts});
  })

})

app.get("/about", function(req, res){
  res.render("about",{aboutCont: aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact", {contCont: contactContent});
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  const postTitle=req.body.titleToPublish;
  const postBody=req.body.textToPublish;

  const post=new Post({
    title: postTitle,
    content: postBody
  });


  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });


  // const post={
  //   title: req.body.titleToPublish,
  //   postBody: req.body.textToPublish
  // }
  // postArray.push(post);
  // res.redirect("/");

})
app.listen(3000, function(){
  console.log("The server is running ... ");
})
