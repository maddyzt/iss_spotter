// require request to fetch data through APIs
const request = require("request");

// define a function to fetch the public IP address
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    // if status code is not 200, assume error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).ip);
    
  });
};

// define a function to fetch geo coordinates and return in an object
const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.ipbase.com/v2/info?ip=${ip}&apikey=xrzGMFV38CUyjHNqTt5kfWwQ1EaN0uUtIw8ONhTU`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let latitude = JSON.parse(body).data.location.latitude;
    let longitude = JSON.parse(body).data.location.longitude;

    let geoObject = {
      "latitude": latitude,
      "longitude": longitude
    };

    callback(null, geoObject);
  });
};

// define a function to return the next 5 flyover times from the ISS API
const fetchISSFlyOverTimes = (coords, callback) => {
  let latitude = coords.latitude;
  let longitude = coords.longitude;

  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.status} when fetching flyover times. Response: ${body}`;
      return;
    }

    callback(null, JSON.parse(body).response);
  });

};

// define a function to chain all 3 functions together
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyOverTimes);
      });
    });
  });
};

// export all functions for use in index file
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };

