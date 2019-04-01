import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gimbal-assignment.herokuapp.com',
  headers: { 'Content-Type': 'application/json' }
});

export const postCafes = userLocation => {
  return api
    .post('/api/nearby', {
      location: userLocation
    })
    .then(res =>
      res.data.cafes.map(cafe => {
        return {
          name: cafe.name,
          coords: {
            latitude: cafe.lat,
            longitude: cafe.lon,
          }
        }
      })
    )
    .catch(error => {
      console.log(error);
    })
};
