import {MongoClient} from 'mongodb';
import express from 'express';
import { ifError } from 'assert';
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

//put not working ??
app.put('/:b',async(req,resp)=>{
    let data = await dbConnect();
    //db.Collection_name.updateOne({Selection_Criteria}, {$set:{Update_data}}), 
    var result = await data.updateOne({char_id:req.params.b},{$set:req.body})
    resp.send(result)
})

app.delete('/:a',async(req,resp)=>{
    let data = await dbConnect();
    var result = await data.deleteOne({char_id:(Number(req.params.a))})
    // req.params is used to access whatever is after : in our route, we can add it to sort of query specific things
    resp.send(result)
})

app.listen(6000)