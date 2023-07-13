import axios from 'axios';

export default class CatApiService {
  constructor() {
    this.API_KEY =
      'live_ATkDsnwAvU937nPda3qiR2ikVv7ea9Bi3sQ0ez5BCTcp5A1d1bJkzyvl3CMZEOEb';
    this.breedId = '';
  }

  fetchBreeds() {
    const url = `https://api.thecatapi.com/v1/breeds/`;

    return axios
      .get(url, {
        headers: {
          'x-api-key': this.API_KEY,
        },
      })
      .then(response => response.data);
  }

  fetchCatByBreed() {
    const url = 'https://api.thecatapi.com/v1/images/search/';

    const options = new URLSearchParams({
      breed_ids: `${this.breedId}`,
      api_key: `${this.API_KEY}`,
    });

    return axios.get(`${url}?${options}`).then(response => response.data);
  }

  get breed() {
    return this.breedId;
  }

  set breed(newBreed) {
    this.breedId = newBreed;
  }
}
