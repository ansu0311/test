// Mongo was used as db so the imports

var express = require("express");  
var path = require("path");  
var bodyParser = require('body-parser');
/*var mongo = require("mongoose");   
var morgan = require("morgan");  
var db = require("../server/config"); 
*/ 
  
var app = express();  
var port = process.env.port || 7777;  
var srcpath  =path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
  
  
/*var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var noteSchema = new Schema({      
    code: { type: String   },       
    text: { type: String   },            
},{ versionKey: false });  
*/   
  
//var model = mongoose.model('note', noteSchema, 'note');  

 
//api for post data into database  

//To create a note, make a POST request to http://localhost:8000/api/notes with a JSON payload.

app.post("/api/notes",function(req,res){   
       
    var mod = new model(req.body);  
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Record has been Inserted..!!"});  
            }  
        });  
})  
 


//api for get data from database  

//To retrieve a note, make a GET request to http://localhost:8000/api/notes/{uri}
//where the uri is the 6-digit code of the note you want to retrieve.

app.get('/api/note/:uri',function(req,res){   
 model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
        });  
})  
  
//Other routes here
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });
 app.listen(3000);
  
//server stat on given port  
app.listen(port,function(){   
    console.log("server start on port"+ port);  
})  