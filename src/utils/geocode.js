const request = require("postman-request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZml4cnkiLCJhIjoiY2t1cHZpZHM4MG1xNjJwcGd3dTYxcWRicSJ9.v-aL_btOz7TMFBLefrxPAg&limit=1";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services.", undefined);
    } else if (!body.features.length) {
      callback("Can't find location, try another search..", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
