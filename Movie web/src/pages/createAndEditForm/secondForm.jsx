import React, { useState } from 'react'
import Rating from './rating';
import Director from './director';
import Image from './image';

export default function createAndEditForm({test, setTest}) {

    const [rating, setRating] = useState("");
    const [poster, setPoster] = useState();
    const [backDrop, setBackDrop] = useState();
    const [director, setDirector] = useState('')
  return (
    <>
      {/* test one */}
      <div
        className={`  ${
          test ? "right-0 delay-300" : "-right-full "
        } w-full transition-all h-auto bg-blue-800  bg-opacity-20 p-6 md:p-8 absolute rounded-lg`}
      >
        <h1 className="text-4xl text-bold font-bold mb-5">Test Form</h1>

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
            <div className="w-full ">
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
        </div>

        <div className="w-full h-8 flex  space-x-3 items-center ">
          <div className=" flex space-x-3"></div>
          {/* Prev page */}

          {/* <h1 className="text-2xl">Next</h1> */}
          <svg
            onClick={() => {
              setTest(false);
              console.log({ rating, poster, backDrop });
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-3 -scale-x-100 mr-3 hover:mr-2 h-full  hover:text-red-600 transition-all cursor-pointer "
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
