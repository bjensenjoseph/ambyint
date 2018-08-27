const config = require('../../config/server.json');

class GoogleService {
  constructor() {
    const apiKey = config.googleApiKey;
    this.googleService = require('@google/maps').createClient({
      key: apiKey
    });
  }

  geocode(locations) {
    const promises = locations.map(location => this._geocodeLocation(location.Address));
    return Promise.all(promises).then(result => result);
  }

  _geocodeLocation(location) {
    return new Promise((resolve, reject) => {
      this.googleService.geocode({ address: location }, (err, res) => {
        if (!err) {
          const { results, status } = res.json;
          if (status === 'OK') {
            resolve(results);
          } else if (status === 'OVER_QUERY_LIMIT') {
            this._geocodeLocation(location);
          } else {
            resolve(status);
          }
        }
      });
    });
  }
}

module.exports = new GoogleService();
