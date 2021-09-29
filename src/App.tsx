import React, { useCallback, useState } from "react";
import "./movieCard.tsx";
import "./App.css";
import MovieCard, { MovieType } from "./movieCard";

export default function SearchMovies() {
  //states - input query, movies
  const [query, setQuery] = useState("");
  //create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState<MovieType[]>([]);

  const searchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/movie/550?api_key=a171a8fc359df2a50667afa2e36c8ead&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      //res = respond
      const res = await fetch(url);
      const data: MovieType = await res.json();
      console.log(data);
      setMovies([data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies ? (
          movies
            .filter((movie) => movie.poster_path)
            .map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <p> Cannot found the movie </p>
        )}
      </div>
    </>
  );
}
