import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [text, setText] = useState("");
  const [resultArray, setResultArray] = useState([]);
  const [selectIndex, setSelectIndex] = useState(-1);

  const { data: movieData } = useFetch(
    `https://api.themoviedb.org/3/search/multi?query=${text}&api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (movieData) {
      setResultArray(
        movieData
        // movieData.filter((movie) => {
        //   return movie.title.toLowerCase().includes(text.toLowerCase());
        // })
      );
    }
    if (text === "") {
      setResultArray([]);
      setSelectIndex(-1);
    }
  }, [movieData, text]);

  let handleClick = (title, id) => {
    setText(title);
    navigate(`/detail/${id}`);
  };

  let handleKeys = (e) => {
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
      let title = resultArray[selectIndex].title;
      let id = resultArray[selectIndex].id;
      handleClick(title, id);
    }
  };

  return (
    <>
      <div className="text-white px-4 md:px-8 pt-3 pb-1 ">
        <div className="relative w-full flex justify-end ">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => handleKeys(e)}
            type="text"
            aria-describedby="helper-text-explanation"
            className="xl:w-[50%] md:w-[80%] w-[100%] px-6 py-2 cursor-pointer rounded-xl border-gray-50 bg-blue-500 bg-opacity-20 focus:border-blue-800 focus:bg-blue-900 focus:bg-opacity-20  border outline-none"
            placeholder=" Search movie here ... "
          />
          {text && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-50"
              onClick={() => setText("")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
        </div>
      </div>
      <section
        className={`w-full bg-black px-4 md:px-8 bg-opacity-80 absolute z-50  text-white flex items-end flex-col 
        ${text ? "h-screen" : ""}`}
      >
        <div
          className={`xl:w-[50%] md:w-[80%] w-[100%] bg-blue-900 bg-opacity-20 rounded-xl  border-blue-800  ${
            text ? "p-2 border" : ""
          } `}
        >
          {resultArray &&
            resultArray.map((m, index) => (
              <div
                className={`w-full flex items-center px-2 py-2 hover:bg-blue-900 hover:bg-opacity-80 rounded-lg  ${
                  selectIndex === index ? "bg-blue-900 bg-opacity-80" : ""
                }`}
                key={m.id}
                onClick={() => handleClick(m.title, m.id)}
              >
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
                {m.title}
              </div>
            ))}

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
