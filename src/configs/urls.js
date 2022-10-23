const baseURL = 'https://api.themoviedb.org/3';

const posterURL = 'https://image.tmdb.org/t/p/original';

//https://api.themoviedb.org/3/movie/top_rated?pages=2

//https://api.themoviedb.org/3/movie/top_rated?pages=2&language=en-US

//https://api.themoviedb.org/3/discover/movie?with_genres=27&page=2

//https://api.themoviedb.org/3/movie/13

const urls = {
    allMovies: '/discover/movie',
    getGenres: '/genre/movie/list',
    search: '/search/movie',
    topRated: '/movie/top_rated',
    selectedMovie: '/movie'
}


export {baseURL, posterURL, urls};