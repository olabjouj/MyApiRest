// Imports
var express = require('express');

// Instantiate server

var App = express();

//Configure Routes

App.get('/',  (req,res) => {
    res.setHeader('Content-Type','application/json')
    res.status(200).send ('{"message": "Hello mon application"}')
});

//Launch Server

App.listen(8081, ()=>{
    console.log('server en ecoute :)')
})