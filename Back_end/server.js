var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



var jsonParser = bodyParser. json()
// json parser
// var jsonParser = express.json();

var con =mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "right_solutions"
});

con.connect((err)=>{
    if(err) throw err;
    console.log("connected to database");
})

// get employee
app.get("/employee",function(req,res){
    con.query("select * from employee_details",(err,result,field)=>{
        if(err) throw err;
        res.send(result)
    })
   
})
app.get("/employee/:Employee_Id",function(req,res){
    let Employee_Id = req.params.Employee_Id
    con.query("select * from employee_details where Employee_Id ="+Employee_Id,(err,result,fields)=>{
        if(err) throw(err);
        res.send(result);
    })
})
app.get("/employee/:Employee_Name",function(req,res){
    let Employee_Name = req.params.Employee_Name
    console.log(Employee_Name);
})

// save employee
app.post("/employee",jsonParser,function(req,res){
    console.log(req.body);
    let Employee_Id = req.body.Employee_Id;
    let Employee_Code = req.body.Employee_Code;
    let Employee_Name = req.body.Employee_Name;
    let In_Time = req.body.In_Time;
    let Out_Time = req.body.Out_Time; 

    let qr = ` insert into employee_details(Employee_Id,Employee_Code,Employee_Name,In_Time,Out_Time) values( '${Employee_Id}','${Employee_Code}','${Employee_Name}','${In_Time}','${Out_Time}' ) `;
    con.query(qr,(err,result)=>{
        
        if(err){
            res.send({error:"Operation failed"})
        }
        else{
            res.send({success:"Operatin completed"});
        }
    })

})
app.patch("/employee",jsonParser,function(req,res){
    let Employee_Id = req.body.Employee_Id;
    let Employee_Code = req.body.Employee_Code;
    let Employee_Name = req.body.Employee_Name;
    let In_Time = req.body.In_Time;
    let Out_Time = req.body.Out_Time; 

    let qr = ` update employee_details set Employee_Code = '${Employee_Code}', Employee_Name = '${Employee_Name}', In_Time = '${In_Time}', Out_Time = '${Out_Time}' where Employee_Id = '${Employee_Id}' `
    console.log(qr,(err,result)=>{
        if(err){
            res.send({error:"updation failed"});
        }
        else{
            res.send({success:"updation successfull"});
        }
    });
})


// app.get("/", function(req,res){
//     res.send("<h1>welcome page</h1>")
// });

app.listen(3000,function(){
    console.log("server started");
})