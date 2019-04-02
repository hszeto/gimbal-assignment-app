import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gimbal-assignment.herokuapp.com'
});

export const getCafes = userLocation => {
  return api
    .get('/api/nearby', {
      params: { ...userLocation }
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
