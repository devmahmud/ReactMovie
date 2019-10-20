import React from "react";
import { apiConfig } from "../../config";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";
import "./Home.css";

import { useFetchMovies } from "./customHook";

const Home = () => {
  const [{ state, isLoading }, fetchMovies] = useFetchMovies();

  const {
    API_URL,
    API_KEY,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE
  } = apiConfig;

  // Handled by searchbar
  const searchItem = searchTerm => {
    let endpoint = "";

    if (!searchTerm) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}`;
    }
    fetchMovies(endpoint);
  };

  // Handled by loadMore button
  const loadMoreItems = () => {
    let endpoint = "";
    const { currentPage, searchTerm } = state;

    if (!searchTerm) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${currentPage +
        1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage +
        1}`;
    }
    fetchMovies(endpoint);
  };

  return (
    <div className="rmdb-home">
      {state.heroImage && !state.searchTerm ? (
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
            title={state.heroImage.original_title}
            text={state.heroImage.overview}
          />
        </div>
      ) : null}
      <SearchBar handleSearch={searchItem} />
      <div className="rmdb-home-grid">
        <FourColGrid
          header={state.searchTerm ? "Search Result" : "Popular Movies"}
          loading={isLoading}
        >
          {state.movies.map((element, i) => {
            return (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })}
        </FourColGrid>
        {isLoading ? <Spinner /> : null}
        {state.currentPage <= state.totalPages && !isLoading ? (
          <LoadMoreBtn onClick={loadMoreItems} text="Load More" />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
