const axios = require('axios');
const keys = require('../keys/keys');

let getGeocode = (address, resp) => {
  let mapURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${keys.mapquestKey}&location=${address}`;

  return axios.get(mapURL)
      .then((res) => {
        if (res.data.info.statuscode === 400) {
          throw new Error('Unable to find the address');
        }
        return getAddressInfo(res);
      })
      .catch((err) => {
        console.log('inside catch');
        console.log(err);
        if (err.code === 'ENOTFOUND') {
          console.log(err.message);
          throw new Error('Unabe to connect to API servers.');
        } else {
          console.log(err.message);
          throw new Error(err.message);
        }
      });
}

let getAddressInfo = response => {
  let formattedAddress = '';
  if (response.data.results[0].locations[0].street !== '') {
    formattedAddress+= response.data.results[0].locations[0].street + ', ';
  }
  if (response.data.results[0].locations[0].adminArea6 !== '') {
    formattedAddress+= response.data.results[0].locations[0].adminArea6 + ', ';
  }
  if (response.data.results[0].locations[0].adminArea5 !== '') {
    formattedAddress+= response.data.results[0].locations[0].adminArea5 + ', ';
  }
  if (response.data.results[0].locations[0].adminArea3 !== '') {
    formattedAddress+= response.data.results[0].locations[0].adminArea3 + ', ';
  }
  if (response.data.results[0].locations[0].postalCode !== '') {
    formattedAddress+= response.data.results[0].locations[0].postalCode + ', ';
  }
  if (response.data.results[0].locations[0].adminArea1 !== '') {
    formattedAddress+= response.data.results[0].locations[0].adminArea1;
  }
  let latitude = response.data.results[0].locations[0].latLng.lat;
  let longitude = response.data.results[0].locations[0].latLng.lng;

  return {
    formattedAddress,
    latitude,
    longitude
  };
};

module.exports = {
  getGeocode
};
