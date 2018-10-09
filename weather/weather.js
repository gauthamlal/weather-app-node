const axios = require('axios');
const keys = require('../keys/keys');

let getWeather = (lat, lng) => {

  let weatherURL = `https://api.darksky.net/forecast/${keys.darkskyKey}/${lat},${lng}`;

  return axios.get(weatherURL)
    .then((response) => {
      if (response.status==200) {
        // console.log(response);
        return getWeatherInfo(response);
      } else {
        throw new Error('Unable to fetch weather.');
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

let getWeatherInfo = (response) => {
  return {
    temperature : response.data.currently.temperature
  };
};

module.exports = {
  getWeather
};
