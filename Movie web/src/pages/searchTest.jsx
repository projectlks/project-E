import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

export default function SearchTest() {
  // State variables
  const [text, setText] = useState(""); // Input text
  const [resultArray, setResultArray] = useState([]); // Array to store search results
  const [selectIndex, setSelectIndex] = useState(-1); // Index of selected item in search results
  const navigate = useNavigate();

  // Fetch data from API based on input text
  const { data: movieData } = useFetch(
    `https://api.themoviedb.org/3/search/multi?query=${text}&include_adult=false&language=en-US&api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
  );
  // Update search results when data is available
useEffect(() => {
  if (movieData && movieData.results) {
    let result = movieData.results.map((d) => ({
      id: d.id,
      name: d.original_name ? d.original_name : d.original_title,
      type: d.media_type,
      img: d.poster_path
    }));
   return setResultArray(result.slice(0, 10));
  }
}, [movieData]);
  // Handle keyboard events for navigation and search
  let handleKeys = async (e) => {
    await setText(e.target.value); // Update text state

    // Handle navigation with arrow keys
    if (e.key === "ArrowDown") {
      if (selectIndex !== resultArray.length - 1) {
        setSelectIndex((prev) => prev + 1);
      } else {
        setSelectIndex(0);
      }
    } else if (e.key === "ArrowUp") {
      if (selectIndex !== 0) {
        setSelectIndex((prev) => prev - 1);
      } else {
        setSelectIndex(resultArray.length - 1);
      }
    } else if (e.key === "Enter") {
      // Handle Enter key press
      if (resultArray && resultArray[selectIndex]) {
        let id = resultArray[selectIndex].id;
        let type = resultArray[selectIndex].type;
        // Navigate based on the type
        type === "movie"
          ? navigate(`/detailMovie/${id}`)
          : navigate(`/detailSeries/${id}`);
      }
    }
  };

  // JSX rendering
  return (
    <>
      {/* Search input */}
      <div className="text-white px-4 md:px-8 pt-3 pb-1 ">
        <div className="relative w-full flex justify-end ">
          <input
            onChange={(e) => {
              setText(e.target.value);
              handleKeys(e);
            }}
            onKeyDown={(e) => handleKeys(e)}
            type="text"
            aria-describedby="helper-text-explanation"
            className="xl:w-[50%] md:w-[80%] w-[100%] px-6 py-2 cursor-pointer rounded-xl border-gray-50 bg-blue-500 bg-opacity-20 focus:border-blue-800 focus:bg-blue-900 focus:bg-opacity-20  border outline-none"
            placeholder=" Search movie here ... "
          />
        </div>
      </div>

      {/* Search results section */}
      <section
        className={`w-full bg-black px-4 md:px-8 bg-opacity-80 absolute z-50   text-white flex items-end flex-col 
        ${text ? "h-screen" : ""}`}
      >
        <div
          className={`xl:w-[50%] md:w-[80%] w-[100%] bg-blue-900 bg-opacity-20 rounded-xl  border-blue-800  ${
            text ? "p-2 border" : ""
          } `}
        >
          {/* Render search results */}
          {resultArray &&
            !!resultArray.length &&
            resultArray.map((m, index) => (
              <Link
                key={m.id}
                to={
                  m.type === "movie"
                    ? `/detailMovie/${m.id}`
                    : `/detailSeries/${m.id}`
                }
              >
                <div
                  className={`w-full h-14 relative flex my-2 items-center px-2  hover:bg-blue-900 hover:bg-opacity-80 rounded-lg  ${
                    selectIndex === index ? "bg-blue-900 bg-opacity-80" : ""
                  }`}
                >
                  {/* Placeholder icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  {/* Movie poster */}

                  <div
                    className="w-14 p-1 h-full object-cover mx-3 
                   overflow-hidden"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${m.img}`}
                      className="w-full h-auto aspect-square rounded-sm  "
                    />
                  </div>

                  {/* Movie name */}
                  <h1> {m.name}</h1>

                  {/* type */}
                  <p className="text-sm absolute right-2 w-14 text-center rounded-full py-[2px] border">
                    {" "}
                    {m.type}
                  </p>
                </div>
              </Link>
            ))}

          {/* Display message if no results found */}
          {text && !resultArray.length && (
            <p className="w-full px-4 py-2  rounded-lg">
              Sorry, couldn't find any matches!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
