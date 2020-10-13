var express = require("express"),
app = express(),
methodOverride = require("method-override"),
mongoose= require("mongoose"),
bodyParser = require("body-parser"),
expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());//hamesha ye body parse ke baad aega
app.use(methodOverride("_method"));

//schem for db
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
//schema ka model banu ju use krenge opeations ke lye
var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
// 	title: "Test Blog",
// 	image:"https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
// 	body:"first test foir blog site"

// });

//RESTful 7 routes
app.get("/",function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("ERROR!");
		}else{
			res.render("index",{blogs: blogs});
		}
	});
	
});
//NEW ROUTE
app.get("/blogs/new",function(req,res){
	res.render("new")
});
//CREATE ROUTE
app.post("/blogs",function(req,res){

	//db ma create kr rhe body parse se forma ka data nikal rhe
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	});
});
//show route
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show",{blog: foundBlog});
		}
	});
});
//edit krna ha blog ku uska route

//?_method=PUT hamne edit.ejs ki file ma form ma use ki a kio ke html
// ke for srf get or post ku support krte hn tu hame method ovveride ka 
// ek package install krendge npm se or phr wu ?_method=PUT wali query string ko 
// pakar lega or as a put method consider krenga
//npm install method-override --save
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit",{blog: foundBlog})
		}
	});
	
});
//jiss part ku edit kia ab usku PUT req se uppdate krdenge
app.put("/blogs/:id",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id ,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});
//DESTROY KA ROUTE
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
});
app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
  });
