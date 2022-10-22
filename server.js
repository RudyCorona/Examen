// importing libraries
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const key = "e8d3dc165135464d99bf3d9b7505db6f";
//  Creating our app
const app = express();

// defining the web port
let port = process.env.PORT || 8080;

//Midleware
app.use(express.json());
app.use(morgan("dev"));
//APIS:

app.post("/send-data", (req, res) => {
  console.log(req.body.Hola);
  res.send("Succes");
});

app.post("/reverse-geocoding", (req, res) => {
  //Validation
  const { lat, long } = req.body;

  const END_POINT = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&pretty=1&key=e8d3dc165135464d99bf3d9b7505db6f`;
  console.log("END_POINT: " + END_POINT);
  axios
    .get(END_POINT)
    .then(function (response) {
      console.log("RES:" + response.data);
      res.status(200);
      res.json({
        Lat: response.data.results[0].formatted,
      });
    })
    //ERROR HANDLER
    .catch(function (error) {
      console.log("An error has occurred:" + error);
      res.send(error);
      res.status(400);
    });
});

//Server running
app.listen(port, () => {
  console.log("Server running on port " + port);
});
