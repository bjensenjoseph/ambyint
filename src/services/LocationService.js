import axios from 'axios';

class LocationService {
  constructor() {
    this.apiUrl = 'http://localhost:9000/api/';
  }

  get(url) {
    return axios({
      baseURL: this.apiUrl,
      method: 'GET',
      url
    }).then(res => res.data);
  }
}

export default new LocationService();
