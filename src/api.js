import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/qt0N6znIaEP5hYGXOYfUWoIvjvz3Lzvo',
});

const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(resp => resp.data);
  },
  createRestaurant(name) {
    return client.post('/restaurants', {name}).then(resp => resp.data);
  },
};

export default api;
