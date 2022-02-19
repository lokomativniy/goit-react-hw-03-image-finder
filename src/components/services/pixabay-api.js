import axios from 'axios';

const API_KEY = '24558928-7c64c47cee4cb8258c49b966e';
const BASE_URL = 'https://pixabay.com/api';

const fetchImages = (qery, page) => {
  return axios.get(
    `${BASE_URL}/?q=${qery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
};

export default { fetchImages };
