
export const environment = {
  production: false
};

export const URL_BASE_SGE = 'http://143.47.49.8/dev';
export const URL_API_SGE = `${URL_BASE_SGE}/api/private`;

export const URL_API_MOVIES = 'https://api.themoviedb.org/3/';
export const TOKEN_API_MOVIES = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Q3NWJiMDhhMGQ0YTNhZmU0NGVkYmExY2U2YWNkNSIsInN1YiI6IjY1ZDRlOGY4YjlhMGJkMDE0YTY3MWQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UCl0VLDTbQN6DpDyB--d4hss-KwPh_Z5WaBOjvO_85Y';
export const API_KEY = 'c7d75bb08a0d4a3afe44edba1ce6acd5';

export const MOVIES_API_HEADERS = {
  headers: {
    'Authorization': `Bearer ${TOKEN_API_MOVIES}`,
    'accept': 'application/json'
  }
};
