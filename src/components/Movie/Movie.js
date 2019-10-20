import React, { useState, useEffect } from "react";
import { apiConfig } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";

const Movie = props => {
  const [state, setState] = useState({
    movie: null,
    actor: null,
    directors: [],
    loading: false
  });

  useEffect(() => {
    const { API_KEY, API_URL } = apiConfig;

    if (sessionStorage.getItem(`${props.match.params.movieId}`)) {
      const state = JSON.parse(
        sessionStorage.getItem(`${props.match.params.movieId}`)
      );
      setState({ ...state });
    } else {
      setState({ loading: true });
      // First fetch the movie
      const endpoint = `${API_URL}movie/${props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
      fetchItems(endpoint);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchItems = async endpoint => {
    const { API_KEY, API_URL } = apiConfig;
    const response = await fetch(endpoint);
    const result = await response.json();
    setState({
      ...state,
      movie: result
    });
    //... then fetch actors
    const endpoint2 = `${API_URL}movie/${props.match.params.movieId}/credits?api_key=${API_KEY}`;
    const resp = await fetch(endpoint2);
    const resp_json = await resp.json();
    const directors = resp_json.crew.filter(
      member => member.job === "Director"
    );
    setState({
      ...state,
      movie: result,
      actors: resp_json.cast,
      directors,
      loading: false
    });
    localStorage.setItem(
      `${props.match.params.movieId}`,
      JSON.stringify(state)
    );
  };

  return (
    <div className="rmdb-movie">
      {state.movie ? (
        <div>
          <Navigation movie={props.location.movieName} />
          <MovieInfo movie={state.movie} directors={state.directors} />
          <MovieInfoBar
            time={state.movie.runtime}
            budget={state.movie.budget}
            revenue={state.movie.revenue}
          />
        </div>
      ) : null}

      {state.actors ? (
        <div className="rmdb-movie-grid">
          <FourColGrid header={"Actors"}>
            {state.actors.map((element, i) => {
              return <Actor key={i} actor={element} />;
            })}
          </FourColGrid>
        </div>
      ) : null}

      {!state.actors && !state.loading ? <h1>No Movie Found!</h1> : null}
      {state.loading ? <Spinner /> : null}
    </div>
  );
};

export default Movie;
