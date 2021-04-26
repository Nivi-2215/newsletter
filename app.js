const express= require("express");
const bodyparser=require("body-Parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req,res){
const firstname=req.body.firstName;
const lastName=req.body.lastName;
const email=req.body.email;
var data ={
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastName
      }
    }
  ]
}

var jsonData=JSON.stringify(data);

const url="https://us1.api.mailchimp.com/3.0/lists/9046b3d675";
const options={
  method:'POST',
  auth:"niveditha:a5f216dcd38bafd98d147594fa930a1e-us1"
}
const request=https.request(url,options,function(response){

  if(response.statusCode==200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
  console.log("something went wrong..")
  res.redirect('/')
})
app.listen(process.env.PORT || 3000,function(){
  console.log("the port is running on 3000.")
})


//appikey
//a5f216dcd38bafd98d147594fa930a1e-us1
//listid
//9046b3d675
