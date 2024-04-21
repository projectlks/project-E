import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Detail() {
  const [movie,setMovie] =  useState([])
  let { id } = useParams();
  let { data:moviedata, error, loading } = useFetch(`http://localhost:3000/movies/${id}`);

  useEffect(() => {
    setMovie(moviedata);
  }, [moviedata]);

  return (
    <>
      {error && <h1>{error}</h1>}
      {!error && loading && (
        <div className="text-white w-full flex justify-center h-screen items-center ">
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-700 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {!error && movie && (
        <section className="text-white flex">
          {/* back button */}

          <Link to="/home" className="absolute top-3 left-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
          <div className="w-[50%]">
            <img src={movie.poster} alt="" className="w-[80%] mx-auto" />
          </div>
          <div>
            <h1 className="text-4xl">{movie.title}</h1>
            <div className="flex items-center space-x-3">
              <p className="flex items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                  alt="IMDb"
                  className="w-10 mr-2"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1 text-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                {movie.rating} ,
              </p>

              <p> Year : {movie.year} ,</p>
              <p> Director : {movie.director}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

           
