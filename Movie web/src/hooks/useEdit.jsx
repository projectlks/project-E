
import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useEdit = (id) => {


const [backDrop, setBackDrop] = useState("");
const [company, setCompany] = useState("");
const [day, setDay] = useState("");
const [director, setDirector] = useState("");
const [duration, setDuration] = useState("");
const [genres, setGenres] = useState([]);
const [language, setLanguage] = useState("");
const [link, setLink] = useState("");
const [month, setMonth] = useState("");
const [poster, setPoster] = useState("");
const [rating, setRating] = useState("");
const [review, setReview] = useState("");
const [title, setTitle] = useState("");
const [year, setYear] = useState("");



  const { data } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
  );

  useEffect(() => {
    if (data) {
      setTitle(data.original_title);
      setReview(data.overview);
      setPoster(data.poster_path);
      setBackDrop(data.backdrop_path);
      setYear(data.release_date.slice(0,4));
      setMonth(data.release_date.slice(5, 7));
      setDay(data.release_date.slice(8,10))
      setRating(data.vote_average);
      setDuration(data.runtime);
      setCompany(data.production_companies);

      let genre = [];
      data.genres.forEach((g) => {
        genre.push(g.name);
      });
      setGenres(genre);

      console.log(data);
    }
  }, [data]);
  return {
    backDrop,
    company,
    director,
    duration,
    genres,
    language,
    link,
    month,
    poster,
    rating,
    review,
    title,
    year,
    day,
    setBackDrop,
    setCompany,
    setDirector,
    setDuration,
    setGenres,
    setLanguage,
    setLink,
    setMonth,
    setPoster,
    setRating,
    setReview,
    setTitle,
    setYear,
    setDay
  };
};

export default useEdit;
