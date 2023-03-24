import React, { useEffect, useState } from "react";
import "react-leaflet-fullscreen/dist/styles.css";
import Marker from "react-leaflet-enhanced-marker";
import {
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import Satellite from "../../assets/images/satellite.png";

const WorldMap = ({ center, coords, latitude, longitude }) => {
  const [map, setMap] = useState(null);
  const coord = [latitude, longitude];

  // const operatorPosition = [operatorLat, operatorLong];
  const zoom = 3;

  const [ipInfo, setIpInfo] = useState(null);
  const [operatorCoord, setOperatorCoord] = useState(null);

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=8dd3e07d895ea7")
      .then((response) => response.json())
      .then((data) => {
        setIpInfo(data);
        const [lat, lon] = data.loc.split(",");
        setOperatorCoord({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (center) {
      map.setView(coord, zoom);
    }
  }, [coord]);

  let operatorPosition;

  if (operatorCoord !== null) {
    operatorPosition = [operatorCoord.latitude, operatorCoord.longitude];
  }

  return (
    <>
      {latitude && longitude && (
        <MapContainer
          center={coord}
          zoom={3}
          scrollWheelZoom={false}
          whenCreated={setMap}
          style={{ height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {operatorCoord && (
          <Marker
            position={coord}
            icon={<img src={Satellite} style={{ width: "100px" }} />}
          >
            <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
              Latitude: {latitude?.toFixed(1)} ° <br /> Longitude:{" "}
              {longitude?.toFixed(1)} °
            </Tooltip>
            <Popup>INTERNATIONAL SPACE STATION LIVE COORDINATES</Popup>
          </Marker>)}
          {operatorCoord && (
            <Marker position={operatorPosition}>
              <Tooltip
                direction="bottom"
                offset={[20, 20]}
                opacity={1}
                permanent
              >
                You are here <br /> Latitude:{" "}
                {operatorCoord?.latitude.toFixed(1)} ° <br /> Longitude:{" "}
                {operatorCoord?.longitude.toFixed(1)} °
              </Tooltip>
            </Marker>
          )}
          <Polyline positions={coords} color="red" />

          <FullscreenControl position="topright" forceSeparateButton={true} />
        </MapContainer>
      )}
    </>
  );
};

export default WorldMap;
