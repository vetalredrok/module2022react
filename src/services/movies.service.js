import {axiosService} from "./axios.service";
import {urls} from "../configs";


const moviesService = {
    getPageOfAll: (page) => axiosService.get(urls.allMovies+`?page=${page}`),
    allGenres: () => axiosService.get(urls.getGenres),
    getTopRated: (page) => axiosService.get(urls.topRated+`?page=${page}`),
    getByGenre: (genre, page) => axiosService.get(urls.allMovies+`?with_genres=${genre}&page=${page}`)
}

export {moviesService};