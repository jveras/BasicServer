var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors");

app.use(bodyParser.urlencoded({ "extended": "true" }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: "application/vdn.api+json" }));
    app.use(cors());


var dataStorage = {

    Employee: [{
        F: "E",
        L: "Schmidt",
        Subject: [0,1],
        Role:[0,3],
        ID:0
    }],

    Subject: [{ 
        name: "Math",
        room: 0
    }, {
        name: "Robotics",
        room: 3
    }, {
        name: "English",
        room: 2
    },{
        name: "Computer Science",
        room: 1
    }],

    Roles: [{
        Title:"Administrator",
        Salary:72000,
    },{
        Title:"Teacher",
        Salary:54000,
    },{
        Title:"Teacher Assistant",
        Salary:47000,
        },{
        Title:"Lead Teacher",
        Salary:14000,
        },{
        Title:"Training Instructor",
        Salary:10000
    }],

    Room: [

        301, 
        365,
        302,
        303

    ]

};


// app.listen("Employee/", function(request, respond){
//     console.log("This is my index");
// });


app.get("/", function(request, respond){
    respond.send("Route works");
});

// Subject Route


app.get("/Employee", function(request, respond){
    var newEmployee=[];
for (var index = 0; index < dataStorage.Employee.length; index++) {
    var subs = dataStorage.Employee[index].Subject;
    var roles = dataStorage.Employee[index].Role;
    var teacherSub = ["Subject"];
    var teacherRole = ["Role"];
    for (var i = 0; i < subs.length; i++) {
        teacherSub.push(dataStorage.Subject[subs[i]].name),  
        teacherSub.push(dataStorage.Subject[subs[i]].room);
        
    }
    for (var i = 0; i < roles.length; i++) {
        teacherRole.push(dataStorage.Roles[roles[i]].Title),  
        teacherRole.push(dataStorage.Roles[roles[i]].Salary);
        
    }
    var object = {
                Name: dataStorage.Employee[index].F +" "+ dataStorage.Employee[index].L,
                Subject: teacherSub,
                Roles:teacherRole
            
              
                
    }  
    newEmployee.push(object);
}


    respond.json({
        data:newEmployee,
        room:dataStorage.Room,
        roles:dataStorage.Roles
    })
});

app.post("/Add", function(request, respond){
    var object = request.body;
    object["ID"]=dataStorage.Employee.length
    for (let index = 0; index < object.Subject.length; index++) {
        object.Subject[index] = parseInt(object.Subject[index]);
        
    }

    //var status = false;
    //var counter = 0;
    //for (let index = 0; index < dataStorage.Employee.length; index++) {
     //   console.log(dataStorage.Employee[index])
        
   // }

    console.log(object);
    dataStorage.Employee.push(object); 
    
    respond.json({
        data:dataStorage.Employee,
       
    })
     
     
     
});     

// Rooms Route
app.get("/Rooms", function(request, respond){
    // respond.send(dataStorage.Room);
    // respond.send(dataStorage.Subject);
    respond.json({
        room: dataStorage.Room,
        sub: dataStorage.Subject
    })
});

// Teacehrs Route
app.get("/Teacher", function(request, respond){
    respond.send("Teacher Route works");
});

app.listen(8081, function(){
    console.log("Server Started");
});
