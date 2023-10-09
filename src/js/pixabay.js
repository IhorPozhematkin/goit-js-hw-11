import axios from 'axios';

const URL = "https://pixabay.com/api/";
const KEY = "39917571-28ef3a52fe9a456424b2da7ea";

export async function fetchPhoto(q, page, perPage) {
    const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;          
};