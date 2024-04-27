import React, { useEffect, useState } from "react";
import SecondForm from "./secondForm.jsx";
import Title from "./title";
import Review from "./review";
import Genres from "./genres";
import Date from "./date";
import { suggestGenres } from "./genresArray.jsx";
import "./createAndEdit.css";


export default function CreateAndEditForm() {


  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [genres, setGenres] = useState([]);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [test, setTest] = useState(false);
  const [completeTagBar, setCompleteTagBar] = useState(20);
  

console.log(completeTagBar)
useEffect(() => {
  if (title !== "") {
    setCompleteTagBar((prev) => prev + 10);
  }
}, []);

  return (
    <>
      <form className="max-w-lg w-[90%] mx-auto h-screen flex items-center justify-center overflow-hidden transition-all transform  relative ">
        <div
          className={`  ${
            !test ? "left-0 delay-300" : "-left-full "
          } w-full transition-all h-auto bg-blue-800 bg-opacity-20 p-6 md:p-8 absolute rounded-lg`}
        >
          <h1 className="text-4xl text-bold font-bold mb-5">Create Form</h1>
          {/* complete tag bar */}

          <div className="w-[80%] mb-6 h-1 mx-auto bg-slate-500">
            <div className={`h-full bg-red-300 w-[${completeTagBar}%]`}>
           
            </div>
          </div>
          {/* title input */}
          <Title title={title} setTitle={setTitle} />

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

          {/* Date */}
          <Date
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            setTest={setTest}
          />
        </div>
        {/* seconds form */}
        <SecondForm test={test} setTest={setTest} />
      </form>
    </>
  );
}
