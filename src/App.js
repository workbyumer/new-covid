import { Box, Typography } from "@mui/material";
import Navbar from "./componets/navbar";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TableData from "./table";
import ChartData from "./componets/chart";
import MapData from "./componets/map";
import axios from "axios";
import Loaders from "./componets/loader";

const App = () => {
  const [country, setcountry] = useState("Pakistan");
  const [countryData, setcountryData] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    const fetchcountryData = () => {
      axios
        .get(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then((res) => {
          setisLoaded(true);
          const data = res.data.countryInfo;
          setcountryData(data);
          setisLoaded(false);
        })
        .catch((error) => console.log(error));
    };
    fetchcountryData();
  }, [country]);
  return isLoaded === false ? (
    <Box>
      <Box>
        <Navbar setcountry={setcountry} />
      </Box>
      <Box marginTop={5} display="flex" justifyContent="center">
        <h1>{country}</h1>
      </Box>
      <Routes>
        <Route path="/table" element={<TableData />} />
        <Route path="/chart" element={<ChartData />} />
        <Route path="/map" element={<MapData locationData={countryData} />} />
      </Routes>
    </Box>
  ) : (
    <Loaders />
  );
};

export default App;
