import moment from "moment-timezone";
import React from "react";


export default function TodaysWeather({ weather, timezone }) {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'column'}}>

           <h3 style={{fontWeight:'bold'}}>

           {timezone}
           </h3>
          <h2>
           
            <span>{weather.temp.toFixed(0)}&deg;C</span>
            
          </h2>

          <div className="d-flex">
            <div>
              <span>Sunrise:</span>
              <span style={{marginLeft:'10px'}}>
                {moment.unix(weather.sunrise).tz(timezone).format("LT")}
              </span>
            </div>

            <div style={{marginLeft:'20px'}}>
              <span>Sunset:</span>
              <span style={{marginLeft:'10px'}}>
                {moment.unix(weather.sunset).tz(timezone).format("LT")}
              </span>
            </div>
          </div>
        </div>

        <div style={{textAlign:'center', marginLeft:'20px'}}>
          <div style={{width:'100px', height:'100px', overflow:'hidden', position:'relative', margin: '0 auto'}}>
            <div style={{position:'absolute', top:'50%', left:'50%', width:'140px !important', height:'140px !important', transform:'translate(-50%, -50%)' }}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
          </div>

          <h3>{weather.weather[0].description}</h3>
        </div>
      </div>
    </div>
  );
}
