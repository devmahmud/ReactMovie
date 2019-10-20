import React from "react";
import { apiConfig } from "../../../config";
import MovieThumb from "../MovieThumb/MovieThumb";
import "./MovieInfo.css";

const MovieInfo = props => {
  const { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } = apiConfig;

  return (
    <div
      className="rmdb-movieinfo"
      style={{
        background: props.movie.backdrop_path
          ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.backdrop_path}')`
          : "#000"
      }}
    >
      <div className="rmdb-movieinfo-content">
        <div className="rmdb-movieinfo-thumb">
          <MovieThumb
            image={
              props.movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path}`
                : "./images/no_image.jpg"
            }
            clickable={false}
          />
        </div>
        <div className="rmdb-movieinfo-text">
          <h1>{props.movie.title}</h1>
          <h3>PLOT</h3>
          <p>{props.movie.overview}</p>
          <h3>IMDB RATING</h3>
          <div className="rmdb-rating">
            <meter
              min="0"
              max="100"
              optimum="100"
              low="40"
              high="70"
              value={props.movie.vote_average * 10}
            ></meter>
            <p className="rmdb-score">{props.movie.vote_average}</p>
            {props.directors.length > 1 ? (
              <h3>DIRECTORS</h3>
            ) : (
              <h3>DIRECTOR</h3>
            )}
            {props.directors.map((element, i) => {
              return (
                <p key={i} className="rmdb-director">
                  {element.name}
                </p>
              );
            })}
          </div>

          <i className="fa fa-film fa-5x" name="film"></i>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
