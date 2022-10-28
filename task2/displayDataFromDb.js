import { MongoClient } from "mongodb";
import  express  from "express";
const app = express();
//check agar breakingbad end me likhna h ya nahi
const urlToConnectDatabase = "mongodb://127.0.0.1:27017/breakingbad"
const databaseName = "breakingbad"
const client = new MongoClient(urlToConnectDatabase)


async function dbConnect()
{
    let result=await client.connect();
    let db=result.db(databaseName);
    return db.collection('characters');
}

app.get('/',async(req,resp)=>{
    let data=await dbConnect();
    data=await data.find().toArray();
    resp.send(data);
})

app.get('/bettercallsaul',async(req,resp)=>{
    let bdata=await dbConnect();
    bdata=await bdata.find({category:'Better Call Saul'}).toArray();
    resp.send(bdata);
})

app.listen(3000)