import fetch from "node-fetch"
import mongoose from "mongoose"

const urlToConnectDatabase = "mongodb://127.0.0.1:27017/breakingbad"
await mongoose.connect(urlToConnectDatabase);
//connecting our db with vscode

//making the structure of how our data is to be stored
// in our database... these need not have the same name as api given
const dataSchema = new mongoose.Schema({
    characterName:{
        type:String
    },
    char_id:{
        type:Number
    },
    birthday:{
        type:String
    },
    occupation:{
        type:[String]
    },
    status:{
        type:String
    },
    nickname:{
        type:String
    },
    portrayed:{
        type:String
    },
    category:{
        type:[String]
    },
})

//making an instance of our schema
const characterData = new mongoose.model('Character',dataSchema)

async function getData(){
    const data = await fetch("https://www.breakingbadapi.com/api/characters")
    //const dataInJSON = await JSON.stringify(data)
    const dataInJSON = await data.json()
    //Here the names must be same as that coming from api
    for(var i=0;i<dataInJSON.length;i++){
        // post is the name of collection created in mongodb
        const post = new characterData({
            name:dataInJSON[i]['name'],
            char_id:dataInJSON[i]['char_id'],
            birthday:dataInJSON[i]['birthday'],
            occupation:dataInJSON[i]['occupation'],
            status:dataInJSON[i]['status'],
            nickname:dataInJSON[i]['nickname'],
            portrayed:dataInJSON[i]['portrayed'],
            category:dataInJSON[i]['category'],
        })
    post.save();
    }
}

getData();
