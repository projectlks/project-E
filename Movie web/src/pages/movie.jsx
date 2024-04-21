import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Movie({url}) {
  const { data: movies, loading, error } = useFetch( url );
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

 
let handleWidth;
  useEffect(() => {
    let screenSize = window.innerWidth;
     handleWidth = () => {
      if (screenSize < 600) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(10);
      }
    };

    handleWidth()
  }, []); // Empty dependency array to run effect only once on mount


      window.addEventListener("resize", handleWidth);

  useEffect(() => {
    if (movies) {
      const totalPages = Math.ceil(movies.length / itemsPerPage);
      setTotalPages(totalPages);
    }
  }, [movies, itemsPerPage]);

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
        <section className="relative h-screen">
          <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 px-3 mt-3 md:px-5 ">
            {movies &&
              movies.slice(startIndex, endIndex).map((m) => (
                <Link to={`/detail/${m.id}`} key={m.id}>
                  <div className="relative group">
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="w-full rounded-xl group-hover:brightness-50"
                    />
                    <p className="absolute top-2 right-2 px-3 py-1 rounded-full bg-black text-white bg-opacity-50 flex items-center">
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
                      {m.rating}
                    </p>

                    {m.type && m.type === 'series' && (
                      <p className="absolute top-2 left-2 px-3 py-1 rounded-full bg-black text-white bg-opacity-50 flex items-center">
                        {m.type}{" "}
                      </p>
                    )}
                    <h1 className="absolute top-[90%] group-hover:top-[50%] opacity-0 text-white group-hover:opacity-100 transition-all duration-4000 ease left-3">
                      {m.title}
                    </h1>
                    <p className="absolute top-[90%] group-hover:top-[60%] opacity-0 text-white group-hover:opacity-100 transition-all duration-4000 ease left-3 delay-200 flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                      {m.rating} | {m.year}
                    </p>

                    <div className="absolute top-[90%] group-hover:top-[67%] opacity-0 text-white group-hover:opacity-100 transition-all duration-4000 ease left-3 delay-300 flex items-center text-sm space-x-2">
                      {m.genre.map((g, index) => (
                        <span key={g}>
                          {g}
                          {index < m.genre.length - 1 ? " , " : " ."}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="w-full flex justify-center text-white space-x-4 mb-6 mx-auto  py-6">
            <button
              onClick={() => prevFun()}
              className="flex justify-center items-center px-4 py-2 border rounded-lg hover:bg-white hover:bg-opacity-10 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="line-clamp-1  ">Prev</p>
            </button>

            <button
              onClick={() => nextFun()}
              className="flex justify-center items-center px-4 py-2 border rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <p>Next</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </section>
      )}
    </>
  );
}
