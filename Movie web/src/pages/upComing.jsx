import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
 import star from '../assets/star.svg'


export default function upComing() {

  let [genre, setGenre] = useState([])
let { data: genreData } = useFetch(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
);


useEffect(() => {
  let genre = {};
  genreData && genreData.genres.forEach((d) => (genre[d.id] = d.name));
setGenre(genre);
console.log(genre);
}, [genreData]);





    let { data } = useFetch(
      // "https://api.themoviedb.org/3/top_rated/movie/day?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
      "https://api.themoviedb.org/3/movie/upcoming?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
    );

  return (
    <section className="space-y-3 scrollbar-thin mb-5 w-full py-4 px-5 overflow-x-auto scrollbar-thin scrollbar-thumb-red-500">
      {/* Your content here */}

      <div className="h-12">
        <h1 className="absolute text-4xl font-bold">Trends Now</h1>
      </div>
      <div className="flex space-x-10 select-none ">
        {data &&
          data.results &&
          data.results.map((m) => (
            <div
              key={m.id}
              className="flex min-w-[250px]  border border-blue-700 rounded-lg overflow-hidden"
            >
              <div className="h-full p-1 ">
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt="poster"
                  className="rounded-md"
                />
              </div>

              <div className=" flex flex-col min-w-[160px] justify-between p-2 px-4">
                <span>
                  <p className="text-[1rem] w-auto pb-1 mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis border-b">
                    {m.title}
                  </p>
                  <p className="text-[12px]"> Year : {m.year}</p>
                </span>

                <span className="flex  space-x-2 items-center">
                  {/* genre */}
                  <p className="py-[5px] w-[60px] text-center px-[8px] whitespace-nowrap overflow-hidden overflow-ellipsis text-[12px] bg-blue-500 rounded-md">
                    {/* {m.genre_ids &&
                      m.genre_ids.map((code) => (
                        <p key={code}> {genre[code]} </p>
                      ))} */}

                    {m.genre_ids && genre[m.genre_ids[0]]}
                  </p>
                  {/* rating */}
                  <span className="flex w-[45px] text-[12px] items-center px-[6px] py-[3px] border rounded-md ">
                    <img
                      src={star}
                      alt="hello"
                      className="mr-1 w-[12px] h-[18px]"
                    />
                    <p> {m.vote_average.toFixed(1)}</p>
                  </span>
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
