import React, { useState } from 'react'
 import img1 from "../data/profile/pf1.jfif";
 import img2 from "../data/profile/pf2.jfif";
 import img3 from "../data/profile/pf3.jfif";
 import img4 from "../data/profile/pf4.jfif";
 import img5 from "../data/profile/pf5.jfif";
 import img6 from "../data/profile/pf6.jfif";
 import img7 from "../data/profile/pf7.jfif";
 import img8 from "../data/profile/pf8.jfif";
 import img9 from "../data/profile/pf9.jfif";
 import img10 from "../data/profile/pf10.jfif";
 import img11 from "../data/profile/pf11.jfif";
 import img12 from "../data/profile/pf12.jfif";
 import img13 from "../data/profile/pf13.jfif";
 import img14 from "../data/profile/pf14.jfif";
 import img15 from "../data/profile/pf15.jfif";
 import img16 from "../data/profile/pf16.jfif";
 import img17 from "../data/profile/pf17.jfif";
 import img18 from "../data/profile/pf18.jfif";
 import img19 from "../data/profile/pf19.jfif";
 import img20 from "../data/profile/pf20.jfif";

//  icons
import all from "../assets/all.svg";
import correct from "../assets/correct.svg";
import dropDown from "../assets/dropDown.svg";
import editIcon from "../assets/edit.svg";
import logout from "../assets/logout.svg";
import movie from "../assets/movie.svg";
import series from "../assets/series.svg";
import user from "../assets/user.svg";
import { Link } from 'react-router-dom';



function menu ({setUrl, setFilterValue}) {
  const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
  ];
  const [moviesFilter, setMoviesFilter] = useState(0);
  const [seriesFilter, setSeriesFilter] = useState(0);
  const [nameEdit, setNameEdit] = useState(false);
  const [userName, setUserName] = useState(() => {
    const value = localStorage.getItem("userName");
    return value !== null ? value : "User Name";
  });
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState(() => {
    const value = localStorage.getItem("pf");
    return value !== null ? value : img1;
  });


  return (
    <section className="w-full border rounded-md min-h-full relative">
      <div className="w-[90%] mx-auto flex flex-col justify-center items-center border-b-2 py-2 relative">
        <img
          src={profile}
          alt="profile"
          className="rounded-full mx-auto w-[50%] aspect-square"
          onDoubleClick={()=>{ edit === false ? setEdit(true) : setEdit(false)}}
        />
        <img
          src={editIcon}
          alt=""
          onClick={() => setEdit(!edit)}
          className="w-6 h-6 absolute top-2 right-2"
        />

        {!nameEdit ? (
          <h1 className="my-2" onDoubleClick={() => setNameEdit(true)}>
            {userName}
          </h1>
        ) : (
          <div className="flex items-center">
            <input
              type="text"
              className="bg-black border-b-2 border-gray-200 outline-none w-auto text-center my-2 text-[16px]"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <img
              src={correct}
              alt=""
              className="w-6 h-6"
              onClick={() => {
                if (userName === "") {
                  setUserName("User Name");
                }
                setNameEdit(false);
                localStorage.setItem("userName", userName);
              }}
            />
          </div>
        )}
        {/* profile to choose */}
        {edit && (
          <div className="absolute w-[350px] md:w-[400px] gap-2 p-2 bg-black border  bg-opacity-80 z-50 left-3 top-full md:top-0 md:left-[100%] rounded-lg grid grid-cols-5">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`w-[100%]  rounded-sm hover:brightness-100 ${
                  profile === img
                    ? "brightness-100 border-blue-800 border-4"
                    : "brightness-50"
                }`}
                alt="profile"
                onClick={() => {
                  setProfile(img);
                  localStorage.setItem("pf", img);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-3 py-3 text-sm">Library</div>
      {/* all  */}
      <div
        className="w-[90%] mx-auto flex text-[14px] items-center space-x-2 px-3 rounded-md py-2 hover:bg-opacity-80 hover:bg-blue-900 mb-2"
        onClick={() =>
          setUrl(
            "https://api.themoviedb.org/3/trending/all/day?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
          )
        }
      >
        <img src={all} alt="" className="w-5 h-5" />
        <p>All</p>
      </div>
      {/* movie */}
      <div className="w-[90%] cursor-pointer mx-auto flex justify-between text-[14px] items-center  px-3 rounded-md hover:bg-opacity-80 hover:bg-blue-900 ">
        <div
          className="flex space-x-2 w-full py-2   "
          onClick={() => {
            setUrl(
              `https://api.themoviedb.org/3/movie/now_playing?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
            );
            setFilterValue("");
          }}
        >
          <img src={movie} alt="" className="w-5 h-5" />
          <p>Movies</p>
        </div>
        <div
          onClick={() => {
            setMoviesFilter(moviesFilter === 0 ? 180 : 0);
            setSeriesFilter(0);
          }}
          className="p-1 rounded-full hover:bg-gray-600"
        >
          <img
            src={dropDown}
            alt=""
            className="w-4 h-4 transition-all"
            style={{ transform: `rotate(${moviesFilter}deg)` }}
          />
        </div>
      </div>

      <div
        className={`w-[90%] cursor-pointer mx-auto flex flex-col text-[14px]   bg-blue-950    px-3 rounded-md  mb-2 ${
          moviesFilter === 180
            ? "h-[170px] py-2 transition-all "
            : "h-0 transition-all "
        }`}
      >
        {moviesFilter === 180 && (
          <section>
            <div
              className="transition-opacity duration-500  px-3 rounded-md py-2  w-full hover:bg-red-300"
              onClick={() => setFilterValue(28)}
            >
              <p>Action</p>
            </div>
            <div
              className="transition-opacity duration-500  px-3 rounded-md py-2  w-full hover:bg-red-300"
              onClick={() => setFilterValue(16)}
            >
              <p>Animation</p>
            </div>
            <div
              className="transition-opacity duration-500  px-3 rounded-md py-2  w-full hover:bg-red-300"
              onClick={() => setFilterValue(18)}
            >
              <p>Drama</p>
            </div>
            <div
              className="transition-opacity duration-500  px-3 rounded-md py-2  w-full hover:bg-red-300"
              onClick={() => setFilterValue(10751)}
            >
              <p>Family</p>
            </div>
          </section>
        )}
      </div>

      {/* series icon */}
      <div className="w-[90%] cursor-pointer mx-auto flex justify-between text-[14px] items-center px-3 rounded-md  hover:bg-opacity-80 hover:bg-blue-900">
        <div
          className="flex space-x-2 w-full  py-2"
          onClick={() => {
            setUrl(
              `https://api.themoviedb.org/3/tv/top_rated?api_key=31d6afcc99f364c40d22f14b2fe5bc6e`
            );
            setFilterValue("");
          }}
        >
          <img src={series} alt="" className="w-5 h-5" />
          <p>Series</p>
        </div>

        <div
          onClick={(e) => {
            e.preventDefault();
            setSeriesFilter(seriesFilter === 0 ? 180 : 0);
            setMoviesFilter(0);
          }}
          className="p-1 rounded-full hover:bg-gray-600"
        >
          <img
            src={dropDown}
            alt=""
            className="w-4 h-4 transition-all "
            style={{ transform: `rotate(${seriesFilter}deg)` }}
          />
        </div>
      </div>

      <div
        className={`w-[90%] cursor-pointer mx-auto flex flex-col text-[14px]   bg-blue-950  px-3 rounded-md  mb-2 ${
          seriesFilter === 180
            ? "h-[130px] py-2 transition-all "
            : "h-0 transition-all "
        }`}
      >
        {seriesFilter === 180 && (
          <section>
            <div className="transition-opacity duration-500  px-3 rounded-md py-2  w-full hover:bg-red-300">
              <p>Korea</p>
            </div>
            <div className="transition-opacity duration-500  px-3 rounded-md py-2  w-full hover:bg-red-300">
              <p>Thai</p>
            </div>
            <div className="transition-opacity duration-500  px-3 rounded-md py-2  w-full hover:bg-red-300">
              <p>China</p>
            </div>
          </section>
        )}
      </div>

      <div className="px-3 py-3 text-sm">Custom</div>

      <Link
        to="/login"
        className="w-[90%] mx-auto flex space-x-2 px-3 rounded-md py-2 hover:bg-opacity-80 hover:bg-blue-900 mb-2"
      >
        <img src={user} alt="" className="w-6 h-6" />
        <p>Login</p>
      </Link>

      <Link to="/login">
        <div className="w-[90%] mx-auto flex space-x-2 px-3 rounded-md py-2 hover:bg-opacity-80  hover:bg-red-900 mb-2">
          <img src={logout} alt="" className="w-6 h-6" />
          <p>Logout</p>
        </div>
      </Link>
    </section>
  );
}
 export default menu
