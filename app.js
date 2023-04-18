const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));
app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    var cityName =req.body.cityName ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=45f6e7a9568ca0a4c35d9604089ff13a&units=metric";
    https.get(url , function(response){
        console.log(response.statusCode);

    response.on("data",function(data){
        
        var weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
        res.write("<h1>The temperature in "+ cityName +" is " +  temp + " Degree-Celsius</h1>" );  //can have only one res.send in any given app methods
        res.write("<p> There are currently " + description + "</p>");
        res.write( "<img src =" + iconURL + ">"   );
        res.send();
    }
    );

    });
});
    
    

app.listen(3000, function(){
    console.log("server is running on port 3000");
});