const KEY = '31349139-c34332f5cc1455d1f889740ec';
const BASE_URL = 'https://pixabay.com/api/?';

export const fetchApi = (search, page) => {
  return fetch(
    `${BASE_URL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
