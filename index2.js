const { nextISSTimesForMyLocation } = require('./iss_promised');
const printPassTimes = require('./index');
// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

nextISSTimesForMyLocation()
  .then((times) => {
    printPassTimes(times);
  })
  .catch((error) => {
    console.log("It didn't work", error.message);
  })
;