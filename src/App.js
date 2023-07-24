import { Box } from "@mui/material";
import Navbar from "./componets/navbar";
import { useState } from "react";

const App = () => {
  const [country, setcountry] = useState("");
  return (
    <Box>
      <Navbar setcountry={setcountry} />
    </Box>
  );
};

export default App;
