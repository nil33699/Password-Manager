const express = require("express");
const {MongoClient} = require("mongodb")

const cors = require("cors")
const bodyParser= require("body-parser")

require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(cors())

const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url);
const dbName = 'passOp'

//connecting with server
client.connect()

console.log(process.env.MONGO_URI)
const port = 3000;

// for getting password
app.get("/",async (req,res)=>{
    const db = client.db(dbName);
    const collection  = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
// for saving password
app.post("/",async (req,res)=>{
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.json(req.body)
})

// for deleteing password
app.delete("/",async (req,res)=>{
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.json(req.body)
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})