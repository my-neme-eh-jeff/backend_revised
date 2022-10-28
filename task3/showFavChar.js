import {MongoClient} from 'mongodb';
import express from 'express';
const urlToConnectDatabase ='mongodb://localhost:27017/breakingbad';
const database='breakingbad';
const client=new MongoClient(urlToConnectDatabase);
const app=express();

async function dbConnect()
{
    let result=await client.connect();
    let db=result.db(database);
    return db.collection('characters');
}

app.use(express.json());
app.get('/',async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find().toArray();
    resp.send(data);
});

app.post('/',async(req,resp)=>{
    let data=await dbConnect();
    let result=await data.insertOne(req.body);
    resp.send(result);
})

app.listen(4000);
