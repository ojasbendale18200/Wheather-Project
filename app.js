const express = require("express");
const app = express();
app.use(express.urlencoded({
    extended: true
}));
const https = require("https");                 // to make req from other server

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName
    const apiKey = "2a167f05d4d255d5f90020375e95b03d"
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {          // to make req from other server
        console.log(response.statusCode);            // callback

        response.on("data", function (data) {      //this is data of openweathermap
            const wheatherData = JSON.parse(data)      //json will convert the data into objects

            const temp = wheatherData.main.temp          //peaces of data in wheatherdata throuch json
            const wheatherDescription = wheatherData.weather[0].description
            const icon = wheatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp, wheatherDescription);
            res.write("<p> the wheatherDescription is " + wheatherDescription + "</p>");
            res.write("<h1>the tempreture in " + query + " is " + temp + " degrees celcius</h1>");
            res.write("<img src =" + imageURL + ">")
            res.send()

        })
    })

});




















app.listen(3000, function () {
    console.log("your server running on port 3000");
});