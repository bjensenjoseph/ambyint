import axios from 'axios';
import config from '../../config/client';

class LocationService {
  constructor() {
    this.apiUrl = config.apiUrl;
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
