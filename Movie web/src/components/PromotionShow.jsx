import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import star from "../assets/star.svg";
import PromotionPageLoading from "./loading/PromotionPageLoading";

export default function PromotionShow({ url }) {
  const [genres, setGenres] = useState({});
  const navigate = useNavigate();

  let { data, loading } = useFetch(url);

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

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      {loading && <PromotionPageLoading />}
      {!loading && (
        <section className=" scrollbar-thin mb-5 w-full py-4 px-5 overflow-x-auto scrollbar-thin scrollbar-thumb-red-500">
          <div className="flex space-x-10 select-none">
            {data &&
              data.results &&
              data.results.map((m) => (
                <div
                  key={m.id}
                  className="flex min-w-[250px] h-[130px] mt-10 border border-blue-700 rounded-lg overflow-hidden"
                  onClick={() =>
                    navigate(
                      m.name ? `/detailSeries/${m.id}` : `/detailMovie/${m.id}`
                    )
                  }
                >
                  {/* poster */}
                  <div className="w-20 p-1.5  h-full">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                      alt="poster"
                      className="rounded-md  h-full object-cover "
                    />
                  </div>
                  {/* about */}
                  <div className="flex flex-col w-[170px] justify-between p-2 px-6">
                    <span>
                      <p className="text-[1rem] w-auto pb-1 mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis border-b">
                        {m.original_title}
                        {m.name}
                      </p>
                      <p className="text-[12px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {!m.name
                          ? `Date: ${m.release_date}`
                          : `First air Date : ${m.first_air_date}`}
                      </p>
                    </span>
                    <span className="flex space-x-2 items-center">
                      <p className="py-[5px] w-[60px] text-center px-[8px] whitespace-nowrap overflow-hidden overflow-ellipsis text-[12px] bg-blue-500 rounded-md">
                        {genres &&
                          m.genre_ids &&
                          m.genre_ids
                            .slice(0, 1)
                            .map((genreId) => (
                              <span key={genreId}>{genres[genreId]}</span>
                            ))}
                      </p>
                      <span className="flex w-[45px] text-[12px] items-center px-[6px] py-[3px] border rounded-md">
                        <img
                          src={star}
                          alt="rating"
                          className="mr-1 w-[12px] h-[18px]"
                        />
                        <p>{m.vote_average.toFixed(1)}</p>
                      </span>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
