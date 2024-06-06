import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import star from "../assets/star.svg";
import left from "../assets/left.svg";
import share from "../assets/share.svg";
import useFirestore from "../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";
import PromotionShow from "../components/PromotionShow";
import DetialPageLoading from "../components/loading/DetialPageLoading";
import moment from "moment";

export default function Detail() {
  const [movie, setMovie] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [type, setType] = useState("");
  const [comment, setComment] = useState("");
   const [imgLink, setImgLink] = useState([]);

  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();

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
    `https://api.themoviedb.org/3/${type}/${id}?api_key=31d6afcc99f364c40d22f14b2fe5bc6e&language=en-US&append_to_response=credits`
  );

  useEffect(() => {
    setMovie(moviedata);
    if (
      moviedata &&
      moviedata.credits &&
      moviedata.credits.cast &&
      moviedata.credits.cast.length > 0
    ) {
      let castList = [];
      moviedata.credits.cast.forEach((cast) => {
        castList.push(cast);
      });

      setImgLink(castList);
    }
  }, [moviedata]);

  let { addCollection, getCollection } = useFirestore();

  let data = {
    date: serverTimestamp(),
    mid: id,
    comment
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (comment !== "") {
      await addCollection("comments", data);
      setComment("");
    }
  };

  let { data: commentData } = getCollection("comments");

  // tarlier
  let { data: trailer } = useFetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
  );

  // Filter out trailers
  let keys =
    trailer &&
    trailer.results &&
    trailer.results.filter((data) => data.type === "Trailer");

  // Extract the key of the first trailer
  let key = keys && keys.length > 0 && keys[0].key;

  return (
    <>
      {!loading && error && (
        <h1 className="w-full text-center py-10 text-3xl">
          Oops...Page not found!
        </h1>
      )}
      {loading && <DetialPageLoading />}
      {!error && !loading && movie && (
        <section className="w-full mx-auto md:w-[80%]">
          <section
            className=" overflow-auto w-full bg-center bg-no-repeat bg-cover md:bg-contain"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
            }}
          >
            <div className="w-full bg-black min-h-screen py-0 xl:py-0 md:py-[50px] bg-opacity-70">
              <div className="text-white flex w-full flex-col md:flex-row  mx-auto min-h-screen items-center">
                <img
                  src={left}
                  alt="left"
                  className="w-10 h-10 fixed top-3 left-3"
                  onClick={() => navigate(-1)}
                />
                <div className="w-[50%] my-[50px] md:mt-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt=""
                    className="w-[80%] mx-auto shadow-md shadow-orange-100"
                  />
                </div>
                <div className="w-full px-10 relative">
                  <div className="absolute top-[-40px] md:top-0 right-10 p-2 transition-all hover:bg-slate-500 rounded-full justify-center items-center flex">
                    <img src={share} alt="share" className="w-8 h-8" />
                  </div>
                  <h1 className="text-5xl mb-5 font-bold">
                    {movie.name} {movie.original_title}
                  </h1>
                  <div className="mb-10 md:mb-20">
                    <p className="text-3xl mb-3">
                      {type === "movie"
                        ? "Release Date : "
                        : "First Air Date :"}
                      {movie.release_date} {movie.first_air_date}
                    </p>
                    <div className="flex space-x-2 text-[1rem] mb-4">
                      {movie.genres &&
                        movie.genres.map((g, index) => (
                          <p key={g.id}>
                            {g.name}
                            {index === movie.genres.length - 1 ? "." : ","}
                          </p>
                        ))}
                    </div>
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
                      <h1 className="text-[20px] md:text-[40px] mr-3">
                        , {movie.runtime} {movie.number_of_episodes}{" "}
                        {type === "tv" ? "Episodes" : "min"}
                      </h1>
                    </div>
                    <p className="text-[1rem]">{movie.overview}</p>
                  </div>
                  <div className="flex w-full space-x-10 justify-center py-5">
                    <a
                      onClick={() => setBtnLoading(true)}
                      href={movie.homepage}
                      className="w-[50%] py-3 bg-red-400 hover:bg-blue-900 bg-opacity-80 transition-all rounded-full cursor-pointer flex justify-center items-center"
                    >
                      {btnLoading && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-700"
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
                      className={`w-[50%] py-3 bg-blue-700 transition-all hover:bg-blue-900 bg-opacity-80 rounded-full ${
                        movie.video === false
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } text-center`}
                    >
                      Watch Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* tralier section */}

          {key && (
            <div className="relative md:border p-4 mt-5 overflow-hidden w-full aspect-[16/9]  md:w-[50%] mx-auto bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${key}?autoplay=0&rel=0&modestbranding=1`}
                allowFullScreen
                // className="absolute top-0 left-0 w-full h-full "
                className="w-full h-full"
              ></iframe>
            </div>
          )}
          {/* CAST LIST */}
          <h2>Main Casts</h2>
          <section className="flex w-full p-10 overflow-y-auto scrollbar-thin  mx-auto space-x-10">
            {imgLink.slice(0, 10).map((link, index) => (
              <div className=" h-auto min-w-[200px] " key={index}>
                <h1>{link.original_name}</h1>
                <img
                  src={`https://image.tmdb.org/t/p/original${link.profile_path}`}
                  className="object-cover select-none h-full"
                  alt="this is cast"
                />
              </div>
            ))}
          </section>
          {/* Recommenction */}
          <section className=" w-full p-10  mx-auto">
            <h1 className="md:text-4xl text-base font-bold">
              Discover Similar Movies You'll Love
            </h1>
            <PromotionShow
              url={`https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1&api_key=31d6afcc99f364c40d22f14b2fe5bc6e`}
            />
          </section>
          {/* comment box */}
          <section className=" w-full mx-auto mb-40 transition-all">
            <form className="w-full mb-6" onSubmit={(e) => addComment(e)}>
              <label
                htmlFor="message"
                className="block mb-2 text-2xl font-bold text-gray-100"
              >
                Your Comment ...
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="message"
                rows="4"
                className="block md:px-6 md:py-4 transition-all text-gray-100 p-2 w-full text-sm bg-blue-900 bg-opacity-40 outline-none rounded-lg focus:bg-opacity-20"
                placeholder="Write your thoughts here..."
              ></textarea>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="mt-2 px-5 py-2 end rounded-lg shadow shadow-gray-400 bg-gradient-to-br active:shadow-none from-blue-300 to-blue-600 transition-all hover:from-blue-400 hover:to-blue-900"
                >
                  Add comment
                </button>
              </div>
            </form>
            {commentData &&
              commentData
                .filter((d) => d.mid === id)
                .map((d) => (
                  <div
                    className="border animate-slide-in-from-left p-3 rounded mb-6"
                    key={d.id}
                  >
                    <div className="flex space-x-4 mb-5 items-center">
                      {movie && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt="profile"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <p>User Name</p>
                        <p className="text-xs text-gray-500">
                          {moment(d.date && d.date.seconds * 1000).fromNow()}
                        </p>
                      </div>
                    </div>
                    <p className="ml-4" style={{ textWrap: "balance" }}>
                      {d.comment}
                    </p>
                  </div>
                ))}
          </section>
        </section>
      )}
    </>
  );
}

// https://api.themoviedb.org/3/movie/786892?api_key=31d6afcc99f364c40d22f14b2fe5bc6e&language=en-US&append_to_response=credits
// https://api.themoviedb.org/3/movie/786892/credits?api_key=31d6afcc99f364c40d22f14b2fe5bc6e