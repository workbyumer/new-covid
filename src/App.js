import { Box, Typography } from "@mui/material";
import Navbar from "./componets/navbar";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TableData from "./table";
import ChartData from "./componets/chart";
import MapData from "./componets/map";

const App = () => {
  const [country, setcountry] = useState("Pakistan");
  return (
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
        <Route path="/map" element={<MapData />} />
      </Routes>
    </Box>
  );
};

export default App;
