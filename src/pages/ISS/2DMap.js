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

const WorldMap = ({ center, coords, issData, ipInfo, operatorCoord }) => {
  const [map, setMap] = useState(null);
  const { latitude, longitude } = issData;
  const coord = [latitude, longitude];
  let operatorPosition;
  if (operatorCoord)
    operatorPosition = [operatorCoord.latitude, operatorCoord.longitude];

  const zoom = 3;

  useEffect(() => {
    if (center) {
      map.setView(coord, zoom);
    }
  }, [coord]);

  return (
    <>
      {latitude && longitude && operatorCoord && (
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

          <Marker
            position={coord}
            icon={<img src={Satellite} style={{ width: "100px" }} />}
          >
            <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
              Latitude: {latitude} ° <br /> Longitude: {longitude} °
            </Tooltip>
            <Popup>INTERNATIONAL SPACE STATION LIVE COORDINATES</Popup>
          </Marker>

          <Marker position={operatorPosition}>
            <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
              You are here in {ipInfo.city} <br /> Latitude:{" "}
              {operatorCoord?.latitude.toFixed(1)} ° <br /> Longitude:{" "}
              {operatorCoord?.longitude.toFixed(1)} °
            </Tooltip>
          </Marker>

          <Polyline positions={coords} color="red" />
          <FullscreenControl position="topright" forceSeparateButton={true} />
        </MapContainer>
      )}
    </>
  );
};

export default WorldMap;
