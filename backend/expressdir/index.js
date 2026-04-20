const express=require("express");
const app=express();
// console.dir(app);
let port=3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
// app.use((req,res)=>{
//     console.log("request received");
//     res.send("this is basic response");
// });      //listening to all the requests

app.get("/",(req,res)=>{
    res.send("this is home page");
});



app.get("/temp/:id",(req,res)=>{
    res.send(`this is temp page with id ${req.params.id}`    ); //path parameter
});


 app.get("/search",(req,res)=>{
    let{q}=req.query;   //query parameter
    if(!q){
        res.send("<h1>please provide search query</h1>");
    }
    res.send(`<h1>you searched for ${q} </h1>`);
 });


// app.get("*",(req,res)=>{
//     res.send("this is 404 page");
// });
// app.post("/",(req,res)=>{
//     res.send("this is post request");
// });