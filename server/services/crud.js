module.exports = (app) => {
  const csvToJson = require('csvtojson');
  const fs = require('fs');
  const _ = require('lodash');
  const googleService = require('./GoogleService');
  const { chunk, flatten } = _;

  app.get('/api/locations', (req, res) => {
    console.log('Requesting location data...');
    const csvFilePath = './server/addresses.csv';
    const geocodedFilePath = './server/geocoded.json';
    const geocodeFileExists = fs.existsSync(geocodedFilePath);
    if (!geocodeFileExists) {
      console.log('Geocode file does not exist, geocoding now...');
      // convert csv file to json
      return csvToJson().fromFile(csvFilePath).then(locations => {
        // chunk location array into sets of 50 to avoid google api query limit
        const locChunks = chunk(locations, 50);
        let finalfilteredResults = [];
        // iterate over chunks of locations and send to google for geocoding every 2 seconds
        for (let i = 0; i < locChunks.length; i++) {
          setTimeout(() => {
            googleService.geocode(locChunks[i])
              .then(response => {
                const filteredStrings = response.filter(resp => typeof resp !== 'string');
                const filteredResults = flatten(filteredStrings.map(data => ({
                  formatted_address: data[0].formatted_address,
                  geometry: data[0].geometry,
                  id: data[0].place_id
                })));
                // concatenate all results together
                finalfilteredResults = [...finalfilteredResults, ...filteredResults];
                // when finished, write contents to file
                if (i >= locChunks.length - 1) {
                  fs.writeFile('./server/geocoded.json', JSON.stringify(finalfilteredResults), (err) => {
                    if (err) {
                      console.log('err writing to file', err);
                    } else {
                      console.log('written to file');
                    }
                  });
                  res.send(finalfilteredResults);
                }
              }).catch(err => {
                console.log('there was an error', err);
              });
          }, 2000 * i);
        }
      });
    }
    console.log('Geocode file exists, sending to client....');
    const geocoded = require('../geocoded.json');
    return res.json(geocoded);
  });
};
