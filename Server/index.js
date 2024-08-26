const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors(
    {
        origin : ["https://todo-list-100-arulkar.vercel.app"],
        methods : ["GET","DELETE","PUT","POST"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials : true
    }
))
app.options('*', cors()); // Handle preflight requests

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://todo-list-100-git-main-arulkar.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


mongoose.connect('mongodb+srv://2005arulkar:aAjykYyYmh0bF3QU@cluster0.hbgzt.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')

app.get('/get',(req,res)=>{
    res.json("Server is Running");
    TodoModel.find()
    .then(result=> res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=> res.json(result))
    .catch(err => res.json(err)) 
})
app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done:  true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add',(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result=> res.json(result))
    .catch(err=> res.json(err))
})
app.listen(3001, () =>{
        console.log("Server is Running");
})
