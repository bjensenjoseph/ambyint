
class GoogleService {
  constructor() {
    const apiKey = 'AIzaSyA0_g216_8HOD9SEebPHjuFOG4oxMypqQc';
    this.googleService = require('@google/maps').createClient({
      key: apiKey
    });
  }

  geocode(locations) {
    const promises = locations.map(location => this._geocodeLocation(location.Address));
    return Promise.all(promises).then(result => result);
  }

  _geocodeLocation(location) {
    let retryCount = 0;
    return new Promise((resolve, reject) => {
      this.googleService.geocode({ address: location }, (err, res) => {
        if (!err) {
          const { results, status } = res.json;
          if (status === 'OK') {
            resolve(results);
          } else if (status === 'OVER_QUERY_LIMIT' && retryCount <= 2) {
            this._geocodeLocation(location);
            retryCount++;
          } else {
            resolve(status);
          }
        }
      });
    });
  }
}

module.exports = new GoogleService();
