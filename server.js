const express = require('express');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');
const hbs = require('hbs');

var app = express();
app.set('view-engine', 'hbs');

let address = 'Madison Square Garden New York';
let addressDetails;
let weatherDetails;

app.listen(3000, () => {
  console.log(`Server is up on port: 3000`);
});

app.get('/', (req, res) => {
  geocode.getGeocode(address, res)
    .then(addressInfo => {
      addressDetails = addressInfo;
      return weather.getWeather(addressDetails.latitude, addressDetails.longitude);
    })
    .then(weatherInfo => {
      weatherDetails = weatherInfo;
      res.render('home.hbs', {
        location: address,
        formattedAddress: addressDetails.formattedAddress,
        temperature: weatherDetails.temperature
      });
    })
    .catch(err => {
      console.log(err);
      console.log('inside catch2');
      res.render('bad.hbs', {
        error: err
      });
    });
});
