import React, {useEffect, useState} from 'react';
import "react-leaflet-fullscreen/dist/styles.css";
import Marker from 'react-leaflet-enhanced-marker';
import { MapContainer, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { FullscreenControl } from "react-leaflet-fullscreen";
import Satellite from '../../assets/images/satellite.png';
import FullScreenDropdown from '../../Components/Common/FullScreenDropdown';


const WorldMap = ({operatorLat, operatorLong, operatorCity, coords, latitude, longitude }) => {
 
  const coord = [Number(latitude), Number(longitude)];
  const operatorPosition = [Number(operatorLat), Number(operatorLong)];
  
 
  
  
  console.log('operatorPosition', operatorPosition)


  return (
    <>
       {(latitude && longitude) &&
      
       
        <MapContainer
          center={coord}
          zoom={3}
          scrollWheelZoom={false}
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={coord}
            icon={<img src={Satellite} style={{ width: '100px' }} />}
          > 
           <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
              Latitude: {latitude?.toFixed(1)} ° <br/> Longitude: {longitude?.toFixed(1)} °
            </Tooltip>
            <Popup>INTERNATIONAL SPACE STATION LIVE COORDINATES</Popup>
          </Marker>
          <Marker
           position = {operatorPosition}
          
           >
          <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
            You are here in {operatorCity} <br/> Latitude: {operatorLat} ° <br/> Longitude: {operatorLong} °
            </Tooltip>
          </Marker>
         <Polyline positions={coords} color="red" />
            
          <FullscreenControl position = 'topright' forceSeparateButton = {true}/>
        </MapContainer>
       
      }

      
    </>
  );
};

export default WorldMap;
