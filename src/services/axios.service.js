import axios from "axios";

import {baseURL} from "../configs";


const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNjMDY2NmI1MGVjNzBiYWE4OWIyZTgwMWVhN2M4OSIsInN1YiI6IjYzNGMyMGViYTdlMzYzMDA4YWY1N2Y5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tvMNnEsGPB7GQ7t7WG-6u7vx0X72Ca7dqu74CWWM4PE`;
    return config;
});


export {axiosService};





