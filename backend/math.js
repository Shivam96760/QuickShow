let express=require('express');
let path=require('path');
let app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('views',path.join(__dirname,'views'));

app.listen(4000,()=>{
    console.log("server is running at 4000")
})





