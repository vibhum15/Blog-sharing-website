//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = []
app.get("/",(req,res)=>{
   
    res.render('home',{head: "Home",home_var:"Home",home_p1:homeStartingContent,arr:posts});
})

app.get("/about",(req,res)=>{
    res.render('about',{head: "About",about_var:"About",about_p1:aboutContent});
})
app.get("/contact",(req,res)=>{
    res.render('contact',{head: "Contact",contact_var:"Contact",contact_p1:contactContent});
})
app.get("/compose",(req,res)=>{
    res.render('compose');
})

app.get("/posts/:topic", (req, res) => {
    
    const e = lodash.lowerCase(req.params.topic);
    let obj ;
    let check = false;
    posts.forEach((element)=>{
        let str = element.newtext.toLowerCase();
        if(str === e){
        check = true;
        obj = element;
        }
    })

    if(check === true) res.render('post',{contact_var:obj.newtext,contact_p1:obj.para});
    res.status(404).send(`This blog does not exist`) ;
    
});

app.post("/compose",(req,res)=>{
    const str = lodash.kebabCase(req.body.text);
    const newPost={
     newtext : req.body.text,
     para  :req.body.multilineText,
     formet : str
    }
    posts.push(newPost);
   
    res.redirect('/')
})
  

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


