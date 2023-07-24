import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import React from "react";
import Loaders from "./loader";

const MapData = ({ locationData }) => {
  const { lat, long: lng } = locationData;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDiEmXC03SOnnqDfcfAZCrRpAut6YxWN2E",
  });
  const containerStyle = {
    width: "98.75vw",
    height: "100vh",
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return isLoaded ? (
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
        position={{
          lat: lat,
          lng: lng,
        }}
      ></MarkerF>
    </GoogleMap>
  ) : (
    <Loaders />
  );
};

export default MapData;
