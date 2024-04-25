import React, { useState } from 'react'
import plus from "../assets/plus.svg";
import X from "../assets/x.svg";
import './createAndEdit.css'
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useLocation, useNavigate } from 'react-router';


export default function createAndEditForm({test, setTest}) {
    const [title,setTitle] = useState('')
    const [review,setReview] = useState('')
    const [genres, setGenres] = useState([])
    const [type,setType] = useState('')
    const [year, setYear] = useState("");
    const [month, setmonth] = useState("");
    const [day, setDay] = useState("");

   

  return (
    <>
      {/* test one */}
      <div
        className={`  ${
          test ? "right-0 delay-300" : "-right-full "
        } w-full transition-all h-auto bg-blue-800  bg-opacity-20 p-8 absolute rounded-lg`}
      >
        <h1 className="text-4xl text-bold font-bold mb-5">Test Form</h1>
        {/* Title */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            name="floating_email"
            id="floating_email"
            className={`block py-2.5  w-full text-sm   border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-800 focus:outline-none focus:ring-0 focus:bg-blue-900 focus:bg-opacity-20 transition-colors px-3 peer ${
              title ? "bg-blue-900 bg-opacity-20" : " bg-transparent"
            }`}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
          >
            Movie or Series Title
          </label>
        </div>

        {/* Review */}
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            type="text"
            name="floating_password"
            id="floating_password"
            className={`block py-2.5  w-full text-sm   border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-800 focus:outline-none focus:ring-0 focus:bg-blue-900 focus:bg-opacity-20 transition-colors px-3 peer ${
              review ? "bg-blue-900 bg-opacity-20" : " bg-transparent"
            }`}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
          >
            Reviews
          </label>
        </div>
        {/* for genres */}
        <div className="relative flex items-center z-0 w-full h-[42px] mb-6 group">
          <input
            value={type}
            type="text"
            onChange={(e) => {
              setType(e.target.value);
            }}
            name="floating_email"
            id="floating_email"
            className={`block py-2.5  w-full text-sm   border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-800 focus:outline-none focus:ring-0 focus:bg-blue-900 focus:bg-opacity-20 transition-colors px-3 peer ${
              type ? "bg-blue-900 bg-opacity-20" : " bg-transparent"
            }`}
            placeholder=" "
            required
          />
          <div
            className="h-full aspect-square flex justify-center transition-all items-center p-1  rounded-full"
            onClick={() => {
              if (type !== "") {
                setGenres((prev) => [...prev, type]);
              }
              setType("");
            }}
          >
            <img
              src={plus}
              alt=""
              className="w-full h-full active:w-[90%] active:has-[90%]:"
            />
          </div>

          <label
            htmlFor="floating_email"
            className={`peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 ${
              type ? "-translate-y-7 " : ""
            }`}
          >
            Movie or Series Type
          </label>
        </div>
        {/* to show genres */}
        <div
          className={`w-full flex space-x-2 ${!!genres.length ? "mb-6" : ""}`}
        >
          {genres && !!genres.length && (
            <div className="w-full">
              <h1 className="text-sm border-b-2 w-full pb-1 mb-2 ">Genres</h1>
              <div className="w-full flex space-x-3 ">
                {genres.map((g) => (
                  <div className="relative " key={g}>
                    <p className="px-3 py-1 border rounded">{g}</p>
                    <span
                      className="w-6 h-6 absolute -top-6 -right-5 border border-red-600 rounded-full p-[2px]"
                      onClick={() => {
                        const filterGenres = genres.filter(
                          (genres) => genres !== g
                        );
                        setGenres(filterGenres);
                      }}
                    >
                      <img src={X} alt="x" className="w-full h-full " />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date */}
        <h1 className="mb-3"> Realte Date or First shown Date</h1>
        <div className="grid grid-cols-3 gap-6">
          {/* year */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={year}
              onChange={(e) => {
                let value = e.target.value;
                if (/^\d*$/.test(value) && value >= 0 && value <= 9999) {
                  setYear(value);
                }
              }}
              type="text"
              name="floating_company"
              id="floating_company"
              className={`block py-2.5  w-full text-sm   border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-800 focus:outline-none focus:ring-0 focus:bg-blue-900 focus:bg-opacity-20 transition-colors px-3 peer ${
                year ? "bg-blue-900 bg-opacity-20" : " bg-transparent"
              }`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_company"
              className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Year
            </label>
          </div>
          {/* month */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={month}
              onChange={(e) => {
                let value = e.target.value;
                if (/^\d*$/.test(value) && value >= 0 && value <= 12) {
                  setmonth(value);
                }
              }}
              type="text"
              name="floating_company"
              id="floating_company"
              className={`block py-2.5  w-full text-sm   border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-800 focus:outline-none focus:ring-0 focus:bg-blue-900 focus:bg-opacity-20 transition-colors px-3 peer ${
                month ? "bg-blue-900 bg-opacity-20" : " bg-transparent"
              }`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_company"
              className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Month
            </label>
          </div>
          {/* Day */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={day}
              onChange={(e) => {
                let value = e.target.value;
                if (/^\d*$/.test(value) && value >= 0 && value <= 31) {
                  setDay(value);
                }
              }}
              type="text"
              name="floating_phone"
              id="floating_phone"
              className={`block py-2.5  w-full text-sm   border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-800 focus:outline-none focus:ring-0 focus:bg-blue-900 focus:bg-opacity-20 transition-colors px-3 peer ${
                day ? "bg-blue-900 bg-opacity-20" : " bg-transparent"
              }`}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Day
            </label>
          </div>
        </div>
        {/* Auto fill */}
        <div className="w-full h-8 flex  space-x-3 items-center ">
          <div className="w-full flex space-x-3">
            <p
              className="text-xs transition-all text-gray-50 px-3 py-2 bg-blue-900 bg-opacity-20 hover:bg-opacity-80 rounded-md cursor-pointer"
              onClick={() => {
                setYear(new Date().getFullYear());
                setmonth(new Date().getMonth() + 1);
                setDay(new Date().getDate());
              }}
            >
              Auto fill today date
            </p>
          </div>
          {/* next page */}

          {/* <h1 className="text-2xl">Next</h1> */}
          <svg
            onClick={() => {
              setTest(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-3 mr-3 hover:mr-2 h-full  hover:text-red-600 transition-all cursor-pointer "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
