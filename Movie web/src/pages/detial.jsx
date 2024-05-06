import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import star from "../assets/star.svg";
import left from "../assets/left.svg";
import share from "../assets/share.svg";

export default function Detail() {
  const [movie, setMovie] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [type, setType] = useState("");
  let { id } = useParams();
  let location = useLocation();
  let navigate =useNavigate()

  useEffect(() => {
    if (location.pathname === `/detailMovie/${id}`) {
      setType("movie");
    } else {
      setType("tv");
    }
  }, [location]);

  let {
    data: moviedata,
    error,
    loading
  } = useFetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
  );
  // detail for movie
  //https://api.themoviedb.org/3/movie/934632?api_key=31d6afcc99f364c40d22f14b2fe5bc6e
  useEffect(() => {
    setMovie(moviedata);
  }, [moviedata]);
  return (
    <>
      {!loading && error && (
        <h1 className="w-full text-center py-10 text-3xl">
          Oops...Page not found!
        </h1>
      )}
      {loading && (
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

      {!error && !loading && movie && (
        <section
          className="w-full overflow-auto h-screen bg-center bg-no-repeat bg-cover md:bg-contain  "
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${movie.backdrop_path} `}) `
          }}
        >
          <div className="w-full bg-black min-h-screen py-0 xl:py-0 md:py-[50px] bg-opacity-70">
            <div className="text-white flex w-full flex-col md:flex-row md:w-[80%]  mx-auto min-h-screen items-center ">
              {/* back button */}

            
                <img
                  src={left}
                  alt="left"
                  className="w-10 h-10 absolute top-3 left-3 "
                  onClick={()=>{navigate(-1)}}
                />
        

              <div className="w-[50%] my-[50px] md:mt-0 ">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="w-[80%] mx-auto  shadow-md shadow-orange-100"
                />
              </div>
              <div className="w-full px-10 relative">
                {/* share icon */}
                <div className=" absolute top-[-40px] md:top-0 right-10 p-2 transition-all hover:bg-slate-500 rounded-full justify-center items-center flex">
                  <img src={share} alt="share" className="w-8 h-8" />
                </div>

                {/* title */}
                <h1 className="text-5xl mb-5 font-bold">
                  {movie.name} {movie.original_title}
                </h1>
                {/* date  */}
                <div className=" mb-10 md:mb-20">
                  <p className="text-3xl mb-3">
                    {type === "movie" ? "Release Date : " : "First Air Date :"}
                    {movie.release_date} {movie.first_air_date}
                  </p>

                  <div className="flex  space-x-2 text-[1rem] mb-4">
                    {movie.genres &&
                      movie.genres.map((g, index) => (
                        <p key={g.id}>
                          {g.name}
                          {index === movie.genres.length - 1 ? "." : ","}
                        </p>
                      ))}
                  </div>
                  {/* rating and runtime */}
                  <div className="flex items-center">
                    <img
                      src={star}
                      alt="star"
                      className="w-10 h-15 mr-1 text-red-400"
                    />
                    <p className="text-[40px] mr-3">
                      {movie.vote_average && movie.vote_average.toFixed(1)}
                    </p>
                    / 10 ,
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                      alt="IMDb"
                      className="w-10 mx-3"
                    />
                    <h1 className=" text-[20px] md:text-[40px] mr-3">
                      , {movie.runtime} {movie.number_of_episodes}{" "}
                      {type === "tv" ? "Episodes" : "min"}
                    </h1>
                  </div>

                  {/*  */}
                  <p className="text-[1rem]">{movie.overview}</p>
                  {/* <p> Director : {movie.director}</p> */}
                </div>

                <div className="flex w-full space-x-10 justify-center py-5">
                  <a
                    onClick={() => setBtnLoading(true)}
                    href={movie.homepage}
                    className=" w-[50%] py-3 bg-red-400 hover:bg-blue-900 bg-opacity-80 transition-all rounded-full cursor-pointer flex justify-center items-center"
                  >
                    {btnLoading && (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-700 "
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
                    )}
                    <h1>More Info</h1>
                  </a>

                  <div
                    className={` w-[50%] py-3 bg-blue-700 transition-all  hover:bg-blue-900 bg-opacity-80 rounded-full ${
                      movie.video === false
                        ? "cursor-not-allowed"
                        : "cusor-pointer"
                    } text-center`}
                  >
                    Watch Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

           
