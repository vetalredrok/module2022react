import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import YouTube from "react-youtube";
import {Button} from "@mui/material";


import css from './SelectedMovieDetails.module.css'
import {moviesService} from "../../services";
import StarRatings from "react-star-ratings/build/star-ratings";

const SelectedMovieDetails = () => {

    const [movie, setMovie] = useState({});
    const {id:selectedFilm} = useParams();
    const navigate = useNavigate();

    const getMovie = async (id) => {
      const {data} = await moviesService.getWithVideo(id);
      setMovie({...data});
    }
    useEffect(()=>{
        getMovie(selectedFilm)
        document.body.style.overflow = 'hidden';
        return ()=> document.body.style.overflow = 'unset';
    }, [selectedFilm])

    const opts = {
        height: "350",
        width:"100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    }
    
    const renderTrailer = () => {
      let trailer = movie.videos.results.find(video => video.type === 'Trailer');
      if (!trailer){
          return null;
      } else {
          return(
              <YouTube
                  videoId={trailer.key}
                  opts={opts}
              />
          )
      }

    }

    const handleParentClick = event => {
        event.preventDefault();

        if (event.target === event.currentTarget) {
            navigate(-1);

        }
    };


    const handleChildClick = event => {
        event.stopPropagation();
        return null
    };

    const handleGrandChildClick = event => {
        event.stopPropagation();
        navigate(-1);
    };


    return (
        <div className={css.Global_Container} onClick={(e)=> handleParentClick(e)}>
            <div className={css.Container} onClick={(e)=> handleChildClick(e)}
                 style={{
                     backgroundSize: 'cover',
                     backgroundImage: `${movie ? `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` : ''}` ,
                     backgroundPosition: 'center center'
                 }}>
                <div className={css.title}>
                    <h5 style={{margin: 0}}>{movie.title}</h5>
                    <Button variant="outlined" color="secondary" onClick={(e)=>handleGrandChildClick(e)}>
                        Close
                    </Button>
                </div>
                {movie.videos ? renderTrailer() : null}
                <div className={css.overviewAndStars}>
                <div className={css.overview}>
                    {movie.overview}
                    <br/>
                    Release date: {movie.release_date}
                </div>
                    <div className={css.stars}>
                        <StarRatings
                            rating={movie.vote_average}
                            starRatedColor="violet"
                            numberOfStars={10}
                            starDimension="30px"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export {SelectedMovieDetails};