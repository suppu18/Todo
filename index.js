const express= require('express');
const port =process.env.PORT||8000;
const path= require('path');
//for database
const db= require('./config/mongoose');
const Todo=require('./model/todo.js');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
//assets contain css file
app.use(express.static('assets'));
//for home page
app.get('/',function(req,res){
    Todo.find({},function(err,list){
        if(err){
            console.log('Error while getting request');
            return;
        }
        //render home.ejs file 
        return res.render('home',{
            // replace title with ToDo List and todo_list with list in page home.ejs
            title: "ToDo List",
            todo_list:list 
        });
    });
});
// for delete
app.get('/delete/',function(req,res){
    // req contains the information about the object to be deleted
    console.log(req.body);
    let id=req.query.id;
    console.log(id);
    Todo.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error while deleting');
            return;
        }
    });
  return res.redirect('/');
});
// for checking whether express is running properly
app.listen(port,function(err){
if(err){
    console.log('Error');
}
console.log('Running properly');
});
//to add list in database
app.post('/create_list',function(req,res){
    //format of date is like 1970-01-01T07:32:02.021Z so split it from 'T' and use 1st half
var due=req.body.duedate.split('T')[0];
console.log(due);
var str=due.split('-');
switch(str[1]){
    case "01":
        str[1]="January";
    break;
    case "02":
        str[1]="February";
    break;
    case "03":
        str[1]="March";
    break;
    case "04":
        str[1]="April";
    break;
    case "05":
        str[1]="May";
    break;
    case "06":
        str[1]="June";
    break;
    case "07":
        str[1]="July";
    break;
    case "08":
        str[1]="August";
    break;
    case "09":
        str[1]="September";
    break;
    case "10":
        str[1]="October";
    break;
    case "11":
        str[1]="November";
    break;
    case "12":
        str[1]="December";
    break;
}
var str1=str[2]+' '+str[1]+' '+str[0];
Todo.create({
    description: req.body.description,
    category: req.body.category,
    duedate:str1 
},function(err,newlist){
    if(err){
        console.log('error while creating contact');
        return;
    }
    console.log('********',newlist);
    //after adding redirect to home page
    return res.redirect('/');
});

});