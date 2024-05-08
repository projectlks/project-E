
import { useEffect, useState } from "react";
import useFetch from "./useFetch";

let useSortAndFilter = () => {
  const [finalData, setFinalData] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  let { data } = useFetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=31d6afcc99f364c40d22f14b2fe5bc6e"
  );

  useEffect(() => {
    if (data && data.results) {
      let filteredData = data.results;

      if (searchValue) {
        filteredData = filteredData.filter((d) =>
          d.original_title.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (sortValue === "original_title") {
        filteredData.sort((a, b) =>
          a.original_title.localeCompare(b.original_title)
        );
      }
      if (sortValue === "release_date") {
        filteredData.sort((a, b) =>
          a.release_date.localeCompare(b.release_date)
        );
      }
      if (sortValue === "id") {
        filteredData.sort((a, b) => a.id - b.id);
      }

      setFinalData([...filteredData]);
    }
  }, [data, searchValue, sortValue]);

  return { finalData,setFinalData, sortValue,
     setSortValue, setSearchValue };
};

export default useSortAndFilter;
