import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";
import useSortAndFilter from "../../hooks/useSortAndFilter";
export default function Movie() {
    const [genre, setGenre] = useState([])
    const [isSoft, setIsSoft] = useState(false)
    const [deleteID, setDeleteID] = useState('')

  let { data } = useFetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
  );

  let {data:genreData} = useFetch('https://api.themoviedb.org/3/genre/movie/list?api_key=31d6afcc99f364c40d22f14b2fe5bc6e')

 useEffect(() => {
   let genres = {};
   genreData &&
     genreData.genres.forEach((g) => {
       genres[g.id] = g.name;
       setGenre(genres);
     });
 }, [genreData]);


let navigate = useNavigate()

let { finalData, searchValue, sortValue, setSearchValue , setSortValue } = useSortAndFilter();

  return (
    <section className="w-full md:p-10 ">
      <div className="w-full px-4 py-2 border items-center flex justify-between border-blue-800">
        <h1 className="md:text-3xl xl:text-4xl text-2xl font-bold whitespace-nowrap">
          Movies - {data && data.results.length}
        </h1>

        {/* search input */}
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          aria-describedby="helper-text-explanation"
          className="md:w-[50%] hidden md:block  px-6 py-2 cursor-pointer rounded-xl border-gray-50 bg-blue-500 bg-opacity-20 focus:border-blue-800 focus:bg-blue-900 focus:bg-opacity-20  border outline-none"
          placeholder=" Search movie here ... "
        />

        {/* Sort by */}
        <div className="py-1 px-4 relative whitespace-nowrap">
          <div
            className="md:text-xl cursor-pointer bg-gray-300 transition-all bg-opacity-80 hover:bg-opacity-100 text-gray-900 font-bold px-6 py-1 items-center space-x-3 rounded flex"
            onClick={() => {
              setIsSoft(!isSoft);
            }}
          >
            <h1>Sort By {sortValue}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-6 h-6 text-gray-900 font-bold transition-all transform ${
                isSoft ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Select value */}
          <div
            className={`w-full transition-all absolute px-4 right-0 ${
              isSoft ? "top-full opacity-100 z-50" : "-top-full opacity-0 -z-10"
            }`}
          >
            <div className="w-full px-2 text-sm bg-gray-300 text-gray-900 font-bold py-2 rounded">
              <p
                className="cursor-pointer rounded-sm bg-transparent px-5 py-1 hover:bg-gray-500 hover:text-gray-200"
                onClick={() => {
                  setSortValue("original_title");
                }}
              >
                Name
              </p>
              <p
                className="cursor-pointer rounded-sm px-5 py-1 hover:bg-gray-500 hover:text-gray-200"
                onClick={() => {
                  setSortValue("release_date");
                }}
              >
                Date
              </p>
              <p
                className="cursor-pointer rounded-sm px-5 py-1 hover:bg-gray-500 hover:text-gray-200"
                onClick={() => {
                  setSortValue("id");
                }}
              >
                ID
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto border border-blue-800 p-4 shadow-md rounded">
        <table className="w-full text-sm text-left rounded-sm text-gray-50 border-collapse">
          <thead className="text-base text-gray-50 uppercase bg-blue-800 bg-opacity-50 border border-blue-500">
            <tr>
              <th scope="col" className="px-6 py-4 border-r border-blue-500">
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 border-r border-blue-500 "
                style={{ textWrap: "balance" }}
              >
                Movie Title
              </th>
              <th scope="col" className="px-6 py-4 border-r border-blue-500">
                Release Date
              </th>
              <th scope="col" className="px-6 py-4 border-r border-blue-500">
                Genre
              </th>
              <th scope="col" className="px-6 py-4 border-r border-blue-500">
                Director
              </th>
              <th scope="col" className="px-6 py-4 border-r border-blue-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border border-blue-500">
            {finalData.map((movie) => (
              <tr
                key={movie.id}
                className="odd:bg-gray-700  even:bg-blue-700 even:bg-opacity-20 odd:bg-opacity-20 dark:border-gray-700 "
              >
                <th scope="row" className="px-6 py-3 border-r border-blue-500 ">
                  {movie.id}
                </th>
                <td
                  className="px-6 py-3 border-r border-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
                  onClick={() => {
                    navigate(`/detailMovie/${movie.id}`);
                  }}
                >
                  {movie.original_title}
                </td>

                <td className="px-6 py-3 border-r border-blue-500">
                  {movie.release_date}
                </td>
                <td className="px-6 py-3 border-r border-blue-500">
                  {movie.genre_ids.slice(0, 1).map((g) => genre[g])}
                </td>
                <td className="px-6 py-3 border-r border-blue-500">
                  John Cena
                </td>
                <td className="px-6 py-3  border-blue-500 flex space-x-3">
                  <p
                    className="px-3 text-sm py-1 bg-green-600 cursor-pointer transition-all hover:bg-green-700 rounded"
                    onClick={() => navigate(`/edit/${movie.id}`)}
                  >
                    Edit
                  </p>
                  <p
                    className="px-3 text-sm py-1 bg-red-600 cursor-pointer transition-all hover:bg-red-700 rounded"
                    onClick={() => setDeleteID(movie.id)}
                  >
                    Delete
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/* delete section */}
      {deleteID && (
        <section className="fixed top-0 w-screen h-screen flex-col bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="flex-col flex justify-center w-[400px] md:w-[500px] items-center bg-gray-200 text-gray-900 rounded-md py-6 px-8">
            <h1 className="text-3xl">
              Are you sure you want to delete this item?
            </h1>
            <p className="text-sm mt-2">
              This action cannot be undone. Deleting this item will permanently
              remove it from your records.
            </p>
            <div className="flex justify-end space-x-3 w-full mt-4">
              <p className="px-3 py-1 bg-red-600 text-gray-100 rounded cursor-pointer hover:bg-red-700">Yes, Delete</p>
              <p
                className="px-3 py-1 border border-gray-600 rounded cursor-pointer hover:bg-gray-300"
                onClick={() => setDeleteID("")}
              >
                Cancel
              </p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}


