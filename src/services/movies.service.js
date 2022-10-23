import {axiosService} from "./axios.service";
import {urls} from "../configs";


const moviesService = {
    getPageOfAll: (page) => axiosService.get(urls.allMovies+`?page=${page}`),
    allGenres: () => axiosService.get(urls.getGenres),
    getTopRated: (page) => axiosService.get(urls.topRated+`?page=${page}`),
    getByGenre: (genre, page) => axiosService.get(urls.allMovies+`?with_genres=${genre}&page=${page}`),
    getWithVideo: (id) => axiosService.get(urls.selectedMovie+`/${id}?append_to_response=videos`),
    searchMovie: (property, page) => axiosService.get(urls.search, {
        params:{
            query: property,
            include_adult:true,
            page: page
        }
    }),
    discoverByGenre: (genre, page) => axiosService.get(urls.allMovies, {
        params: {
            with_genres: genre,
            page: page
        }
    })
}

export {moviesService};