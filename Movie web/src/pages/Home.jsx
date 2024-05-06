import React, { useState } from "react";
import Menu from "./menu";
import Movie from "./movie";
import Series from './series'
import Serarch from "./search";
import image1 from "../img/img3.jpg"
import menu from "../assets/menu.svg";
import UpComing from "./upComing";
export default function App() {

const [url, setUrl] = useState(
  "https://api.themoviedb.org/3/trending/all/day?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
);
const [leftPosition, setLetfPosition] = useState(-100)
const [filterValue, setFilterValue] = useState('')

https: return (
  <section>
    {/* hero section */}
    <section
      className="hero-section border-b-2 relative bg-cover bg-no-repeat bg-center h-[300px] flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(https://cdn.marvel.com/content/1x/deadpool3_lob_fea_dsk_01.jpg)`
      }}
    >
      <div className="absolute inset-0  opacity-50"></div>
      <h1 className="text-4xl font-bold mb-6 z-10">Eternal Odyssey</h1>
      <p className="text-lg mb-8 z-10 text-center">
        Experience the epic adventure that spans galaxies. Prepare to be
        captivated by the wonders of the cosmos.
      </p>
      <button className="px-4 py-2 bg-blue-500 rounded-full text-lg uppercase tracking-wide z-10 hover:bg-orange-600 transition duration-300 ease-in-out">
        <p className="text-sm">Explore the Odyssey</p>
      </button>
    </section>
    {/* <Apptest/> */}
    <UpComing />

    {/* serach input */}
    <div>
      <Serarch />
    </div>
    <div className="flex">
      {/* menu icon */}
      <div
        className="fixed right-3 top-3 p-1 rounded-full  md:hidden transition-all bg-blue-400 z-50 bg-opacity-20 hover:bg-opacity-80"
        onClick={(e) => {
          e.preventDefault();
          leftPosition !== 0 ? setLetfPosition(0) : setLetfPosition(-100);
        }}
      >
        <img src={menu} alt="menu" className="w-7 h-7 " />
      </div>
      {/* left */}

      <div
        style={{ left: `${leftPosition}%` }}
        className={` left w-[300px] xl:w-[20%] z-50 h-screen  md:left-0 fixed top-1 md:static md:inline-block transition-all bg-black`}
      >
        <Menu setUrl={setUrl} setFilterValue={setFilterValue} />
      </div>

      {/* right */}
      <div className="flex w-full right flex-col space-y-20 xl:h-screen scrollbar-thin h-[200%] overflow-auto">
        <div className="right w-full h-auto min-h-screen ">
          <h1 className="text-4xl mx-5 font-bold">Movies</h1>
          <Movie url={url} filterValue={filterValue} />
        </div>
        <div className="right w-full h-auto min-h-screen">
          <h1 className="text-4xl mx-5 font-bold">Series</h1>
          <Series url={url} filterValue={filterValue} />
        </div>
      </div>
    </div>
  </section>
);
}
