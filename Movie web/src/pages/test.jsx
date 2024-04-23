import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

function MovieComponent() {
  const [movieData, setMovieData] = useState([]);
  const [genres, setGenres] = useState({});

  // Fetch movie data
  let { data } = useFetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
  );

  // Fetch genre data
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
        );
        const data = await response.json();
        const genreMap = {};
        data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    data && data.results && setMovieData(data.results);
  }, [data]);

  return (
    <div>
      <h1>Now Playing Movies</h1>
      <div className="movie-list">
        {movieData.map((movie) => (
          <div key={movie.id} className="movie">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={`${movie.title} Backdrop`}
            />
            {movie.genre_ids && (
              <p>
                Genres:{" "}
                {movie.genre_ids.map((genreId) => genres[genreId])}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieComponent;
