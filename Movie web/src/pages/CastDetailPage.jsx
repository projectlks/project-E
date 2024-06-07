import React from "react";
import { useParams } from "react-router";
import PromotionShow from "../components/PromotionShow";
import useFetch from "../hooks/useFetch";

export default function CastDetailPage() {
  let { id } = useParams();

let { data } = useFetch(
  `https://api.themoviedb.org/3/person/${id}?language=en-US%27&api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
);

  return (
    <>
      {data && (
        <section className="w-[90%]  py-10 md:w-[80%] mx-auto">
          <div className="w-full flex flex-wrap md:flex-nowrap space-x-0 md:space-x-10 p-4  rounded-lg shadow-lg">
            <span className="w-full mx-auto md:min-w-[30%]  inline-block mb-4 md:mb-0">
              <img
                src={`https://image.tmdb.org/t/p/original${data.profile_path}`}
                alt="profile_path"
                className="md:w-full w-1/2 mx-auto h-auto  rounded-lg"
              />
            </span>

            <div className="w-full md:min-w-[70%]">
              <h1 className="md:text-4xl text-xl  font-bold mb-2">
                {data.name}
              </h1>
              <span className="text-lg w-full mx-auto md:flex md:space-x-3 block mb-5">
                <span className=" flex space-x-3">
                  <h2 className="text-xl text-blue-500 font-semibold">
                    Birthday:
                  </h2>
                  <p>{data.birthday},</p>
                </span>
                <span className="flex space-x-3">
                  <h2 className="text-xl text-blue-500 font-semibold">
                    Place of Birth:
                  </h2>
                  <p>{data.place_of_birth}</p>
                </span>
              </span>
              {/* <h2 className="text-lg  mb-4"></h2> */}
              <p className="text-base bg-opacity-20 text-gray-200   w-full mx-auto h-[400px] overflow-y-auto text-justify leading-relaxed p-10  bg-blue-600 font-serif shadow-lg rounded-lg">
                {data.biography}
              </p>
            </div>
          </div>

          <PromotionShow
            url={`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`}
            arrayName={"cast"}
          />
        </section>
      )}
    </>
  );
}
