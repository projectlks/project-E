import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

// import children pages
import Cast from "./cast";
import Date from "./date";
import Director from "./director";
import Duration from "./duration";
import Genres from "./genres";
import Image from "./image";
import Language from "./language.jsx";
import Link from "./link.jsx";
import ProductionCompany from "./productionCompany";
import Rating from "./rating";
import Review from "./review";
import Title from "./title";
import left from "../../assets/left.svg";
import { suggestGenres } from "./genresArray.jsx";
// import "./createAndEdit.css";

import useEdit from "../../hooks/useEdit.jsx";

export default function CreateAndEditForm() {
  const [type, setType] = useState("");

  const [cast, setCast] = useState([]);
  const [member, setMember] = useState([]);
  const [switchForm, setSwitchForm] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Series");

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

  let navigate = useNavigate();
  let { id } = useParams();

  let {
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
  } = useEdit(id);

  return (
    <>
      <section className="w-full">
        <form className="max-w-lg w-[90%] mx-auto h-screen flex items-center justify-center overflow-y-auto overflow-x-hidden transition-all transform  relative ">
          <div
            className={`${
              !switchForm ? "left-0 delay-300" : "-left-full"
            } w-full transition-all h-auto bg-blue-800 bg-opacity-20 p-6 md:p-8 absolute rounded-lg`}
          >
            <h1 className="text-4xl text-bold font-bold mb-5">Create Form</h1>

            {/* title input */}
            <Title title={title} setTitle={setTitle} />

            {/* type choose */}
            <div className="flex w-[200px] justify-between bg-blue-500 bg-opacity-20 rounded-lg space-x-4 px-4 py-2 mb-6">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="type"
                  id="Movie"
                  value="Movie"
                  checked={selectedValue === "Movie"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="Movie"
                  className="cursor-pointer h-full select-none"
                >
                  Movie
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="type"
                  id="Series"
                  value="Series"
                  checked={selectedValue === "Series"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="Series"
                  className="cursor-pointer h-full select-none"
                >
                  Series
                </label>
              </div>
            </div>
            {/* Review */}
            <Review review={review} setReview={setReview} />

            {/* for genres */}
            <Genres
              genres={genres}
              setGenres={setGenres}
              type={type}
              setType={setType}
              suggestGenres={suggestGenres}
            />
            <div className="grid grid-cols-2 gap-6">
              {/* language */}
              <Language language={language} setLanguage={setLanguage} />
              {/* rating */}
              <Link link={link} setLink={setLink} />
            </div>
            {/* Date */}
            <Date
              year={year}
              setYear={setYear}
              month={month}
              setMonth={setMonth}
              day={day}
              setDay={setDay}
              setSwitchForm={setSwitchForm}
            />
          </div>
          {/* seconds Part */}

          <div
            className={`${
              switchForm ? "right-0 delay-300" : "-right-full"
            } w-full transition-all h-auto bg-blue-800  bg-opacity-20 p-6 md:p-8 absolute rounded-lg`}
          >
            <h1 className="text-4xl text-bold font-bold mb-5">Second part</h1>

            <div className="parent w-full">
              <div className="flex w-full flex-nowrap gap-6">
                {/* rating */}
                <div>
                  <Rating
                    rating={rating}
                    setRating={setRating}
                    className="w-[200px]"
                  />
                </div>

                {/* director */}
                <div className="w-full">
                  <Director director={director} setDirector={setDirector} />
                </div>
              </div>

              {/* Image  */}
              <Image
                poster={poster}
                setPoster={setPoster}
                backDrop={backDrop}
                setBackDrop={setBackDrop}
              />

              <div className="grid grid-cols-2 gap-6">
                {/* Duration */}
                <Duration duration={duration} setDuration={setDuration} />
                {/* rating */}
                <ProductionCompany company={company} setCompany={setCompany} />
              </div>
              {/* Cast */}
              <Cast
                cast={cast}
                setCast={setCast}
                member={member}
                setMember={setMember}
              />
            </div>

            <div className="w-full h-8 flex space-x-3 items-center">
              {/* Prev page */}

              <svg
                onClick={() => {
                  setSwitchForm(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-3 -scale-x-100 mr-3 hover:mr-2 h-full  hover:text-red-600 transition-all cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>

              <div
                className="w-full py-2 cursor-pointer hover:bg-opacity-30 font-bold rounded-lg bg-blue-700 bg-opacity-20 text-center"
                onClick={() => {
                  completeFun();
                }}
              >
                Complete
              </div>
            </div>
          </div>
        </form>

        <img
          src={left}
          className="absolute w-10 h-10 top-3 left-3"
          alt=""
          onClick={() => navigate(-1)}
        />
      </section>
    </>
  );
}
