import promptSync from 'prompt-sync';
const prompt = promptSync();

import fetch from 'node-fetch';


const firstName = prompt('Enter first name with appropriate capital letters')
const lastName = prompt('Enter last name pls appropriate capital letters')

var Name=firstName+"+"+lastName
var link= "https://www.breakingbadapi.com/api/characters?name="+Name


getData(link);

async function getData(url){
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data)
    }) 
}



