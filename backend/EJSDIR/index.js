const express = require('express');
const app=express();
const port =8080;
const path=require('path');

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    // res.send("this is home page");
    res.render('home.ejs');
});
 app.set('views',path.join(__dirname,'views'));//set  permanent path to views folder run out side from ejs folder

app.get('/hello',(req,res)=>{
    res.send("hello");
}); 
//passing data to ejs file from database
// app.get('/rolldice',(req,res)=>{
// res.render("rolldice.ejs");
app.get('/rolldice',(req,res)=>{
let  diceval=Math.floor(Math.random()*6)+1;//assuming data is from database
res.render("rolldice.ejs",{num:diceval});
});

//creating instagram route
app.get('/ig/:username',(req,res)=>{
    const followers=["archna","simran","priya","rohit","satyam"];//assuming data is from database
    let {username}=req.params;
    res.render("instagram.ejs",{username:username,followers:followers});
});