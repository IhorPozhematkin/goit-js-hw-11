import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39917571-28ef3a52fe9a456424b2da7ea';

export async function fetchCard(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });
  const responce = await axios.get(`${BASE_URL}?${params}`);
  return responce.data;
}