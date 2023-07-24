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
  const [countryHistory, setcountryHistory] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    setisLoaded(true);
    const fetchcountryData = () => {
      axios
        .get(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then((res) => {
          const data = res.data.countryInfo;
          setcountryData(data);
        })
        .catch((error) => console.log(error));
    };
    const fetchcountryHistory = () => {
      axios
        .get(
          `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`
        )
        .then((res) => {
          const data = res.data.timeline;
          const monthlyData = groupDataByMonth(data);
          setcountryHistory(monthlyData);
        })
        .catch((error) => console.log(error));
    };
    fetchcountryData();
    fetchcountryHistory();
    setisLoaded(false);
  }, [country]);
  const groupDataByMonth = (data) => {
    const dates = Object.keys(data.cases);
    const monthlyData = {};

    dates.forEach((date) => {
      const [month, day, year] = date.split("/");
      const key = `${year}-${month.padStart(2, "0")}`;
      if (!monthlyData[key]) {
        monthlyData[key] = {
          cases: 0,
          deaths: 0,
          recovered: 0,
        };
      }

      monthlyData[key].cases += data.cases[date];
      monthlyData[key].deaths += data.deaths[date];
      monthlyData[key].recovered += data.recovered[date];
    });

    const monthlyDataArray = Object.entries(monthlyData).map(
      ([month, value]) => ({
        month,
        ...value,
      })
    );

    return monthlyDataArray;
  };

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
        <Route
          path="/map"
          element={
            <MapData
              locationData={countryData}
              tableData={countryHistory}
              name={country}
            />
          }
        />
      </Routes>
    </Box>
  ) : (
    <Loaders />
  );
};

export default App;
