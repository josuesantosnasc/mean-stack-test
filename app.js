
const path=require('path');
const express=require('express');
const mongoose=require('mongoose');

const postsRoutes=require('./routes/posts');
const userRoutes=require('./routes/user');



const app=express();

mongoose.connect('mongodb+srv://josh:santos17@cluster0.lvsxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to database')
}).catch(()=>{
    console.log('Connection failed')
})

app.use(express.json());
app.use('/images',express.static(path.join('backend/images')))
app.use('/',express.static(path.join(__dirname,'angular')))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE,OPTIONS')
    next()
});

app.use('/api/posts/',postsRoutes);
app.use('/api/user/',userRoutes);
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'angular','index.html'))
})

module.exports=app;