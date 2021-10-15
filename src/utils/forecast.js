const request = require("postman-request");

const forecast = (latitude, longtitude,callback) => {
    console.log(latitude,longtitude);
  const url =
    "http://api.weatherstack.com/current?access_key=b2c5d6a226ab6c63b03a49cef36cac9e&query=" +
    latitude +
    "," +
    longtitude +
    "+&units=f";

  request({ url, json: true }, (err, {body}) => {
    if (err) {
        callback("Error",undefined);
    } else if (body.error) {
        callback("can't find this location",undefined);
    } else {
      const current = body.current;
      callback(undefined,body.current.weather_descriptions[0] +
        ". It is currently " +
        current.temperature +
        " it feel like " +
        current.feelslike +
        " degrees out");
    //   console.log(
    //     response.body.current.weather_descriptions[0] +
    //       ". It is currently " +
    //       current.temperature +
    //       " it feel like " +
    //       current.feelslike +
    //       " degrees out"
    //   );
    }
  });
};

module.exports = forecast;