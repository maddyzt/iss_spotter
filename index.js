// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss.js');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('70.49.58.155', (err, data) => {
//   if (err) {
//     console.log("It didn't work!" , err);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , data);
// });

// fetchISSFlyOverTimes({ latitude: 43.70317077636719, longitude: -79.51219177246094 }, (err, data) => {
//   if (err) {
//     console.log("It didn't work!" , err);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , data);
// });


const printPassTimes = (passTimes) => {
  for (let i of passTimes) {
    let dateTime = new Date(0);
    dateTime.setUTCSeconds(i.risetime);
    const duration = i.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   console.log(passTimes);
// });

module.exports = printPassTimes;