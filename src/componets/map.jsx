import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import Loaders from "./loader";
import { Box } from "@mui/material";
import TableData from "./table";

const MapData = ({ locationData, tableData }) => {
  const { lat, long: lng } = locationData;
  const [isShowing, setisShowing] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDiEmXC03SOnnqDfcfAZCrRpAut6YxWN2E",
  });
  const containerStyle = {
    width: "98.75vw",
    height: "75vh",
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const handleMarkerClicked = () => {
    setisShowing(!isShowing);
  };
  return isLoaded ? (
    <Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 30,
          lng: 70,
        }}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerF
          onClick={handleMarkerClicked}
          position={{
            lat: lat,
            lng: lng,
          }}
        ></MarkerF>
      </GoogleMap>

      {isShowing ? <TableData data={tableData} /> : ""}
    </Box>
  ) : (
    <Loaders />
  );
};

export default MapData;
