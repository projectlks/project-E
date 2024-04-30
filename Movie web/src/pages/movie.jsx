import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import star from "../assets/star.svg";

const Movie = ({ filterValue }) => {
  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
  );
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [genres, setGenres] = useState({});
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const handleWidth = (size) => {
    let perPage = 10; // Default value for larger screens

    if (size < 600) {
      perPage = 6;
    } else if (size < 1000) {
      perPage = 8;
    }

    setItemsPerPage(perPage);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
  
        setCurrentPage(1);
       
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPage,totalPages]);

  useEffect(() => {
    handleWidth(screenSize);

    if (data && data.results) {
      const filteredResults = filterValue
        ? data.results.filter((m) => m.genre_ids.includes(filterValue))
        : data.results;

      const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
      setTotalPages(totalPages);
    }

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
        );
        const genreData = await response.json();
        const genreMap = {};
        genreData.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [data, filterValue, itemsPerPage, screenSize]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const nextFun = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevFun = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {error && <h1>{error}</h1>}
      {loading && (
        <div className="text-white w-full flex justify-center h-full items-center ">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 "
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
      {!error && !loading && (
        <section className="relative md:min-h-screen h-auto  pb-[90px]">
          <SwitchTransition>
            <CSSTransition timeout={300} classNames="fade" key={startIndex}>
              <div className="w-full  grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 px-3 mt-3 md:px-5 ">
                {data &&
                  data.results &&
                  (filterValue !== ""
                    ? data.results
                        .filter((m) => m.genre_ids.includes(filterValue))
                        .slice(startIndex, endIndex)
                    : data.results.slice(startIndex, endIndex)
                  ).map((m) => (
                    <Link to={`/detailMovie/${m.id}`} key={m.id}>
                      <div className="relative group">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                          // https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg
                          alt={`${m.title} Poster`}
                          className="w-full rounded-xl transition-all group-hover:brightness-[30%] group-hover:scale-110"
                        />
                        <p className="absolute top-2 right-2 px-3 py-1 rounded-full bg-black text-white bg-opacity-50 flex items-center">
                          <img
                            src={star}
                            alt="star"
                            className="w-4 h-4 mr-1 "
                          />
                          {m.vote_average.toFixed(1)}
                        </p>

                        {m.media_type && m.media_type === "tv" && (
                          <p className="absolute top-2 left-2 px-3 py-1 rounded-full bg-black text-white bg-opacity-50 flex items-center">
                            Series
                          </p>
                        )}
                        <h1 className="absolute  text-2xl whitespace-nowrap overflow-hidden overflow-ellipsis w-full px-3 top-[90%] group-hover:top-[50%] opacity-0 text-white group-hover:opacity-100 transition-all duration-4000 ease left-0">
                          {m.title} {m.name}
                        </h1>
                        <p className="absolute top-[90%] text-xl group-hover:top-[60%] opacity-0 text-white group-hover:opacity-100 transition-all duration-4000 ease left-3 delay-200 flex items-center ">
                          <img src={star} alt="star" className="w-4 h-4 mr-1" />
                          {m.vote_average} |{" "}
                          {(m.release_date || m.first_air_date)?.slice(0, 4)}
                        </p>

                        <div className="absolute w-full px-3 text-base top-[90%] left-0 group-hover:top-[69%] opacity-0 text-white group-hover:opacity-100 transition-all duration-4000 ease delay-300 flex items-center whitespace-nowrap overflow-hidden space-x-2 overflow-ellipsis">
                          {genres &&
                            m.genre_ids &&
                            m.genre_ids.slice(0,2).map((genreId, index) => (
                              <span key={genreId}>
                                {genres[genreId]}
                                {m.media_type &&
                                  m.media_type === "tv" &&
                                  genresForTv[genreId]}
                                {index < m.genre_ids.length - 1 ? ", " : "."}
                              </span>
                            ))}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CSSTransition>
          </SwitchTransition>

          {data &&
            data.results &&
            filterValue &&
            !data.results.filter((m) => m.genre_ids.includes(filterValue))
              .length && (
              <h1 className="w-full text-center py-10 text-3xl">
                Sorry, couldn't find any matches!
              </h1>
            )}
          {/* button  */}
          <div className="w-full flex justify-center absolute bottom-[-25px] text-white space-x-4 mb-6 mx-auto  py-6">
            <button
              onClick={prevFun}
              className="flex justify-center items-center px-4 py-2 border rounded-lg hover:bg-white hover:bg-opacity-10 "
            >
              {/* left icon */}
              <img src={left} alt="left" className="w-6 h-6 mr-2" />
              <p className="line-clamp-1  ">Prev</p>
            </button>

            <button
              onClick={nextFun}
              className="flex justify-center items-center px-4 py-2 border rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <p>Next</p>
              {/* right icon */}
              <img src={right} alt="left" className="w-6 h-6 ml-2" />
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Movie;
