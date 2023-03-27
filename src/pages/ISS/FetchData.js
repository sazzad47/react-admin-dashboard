import moment from "moment-timezone";

export const fetchOperatorData = async () => {
  try {
    const response = await fetch("https://ipinfo.io/json?token=8dd3e07d895ea7");
    const data = await response.json();
    const [lat, lon] = data.loc.split(",");
    const operatorCoord = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
    };
    return { ipInfo: data, operatorCoord };
  } catch (error) {
    console.error(error);
    return { ipInfo: undefined, operatorCoord: undefined };
  }
};

export const fetchISSData = async () => {
  try {
    const response = await fetch(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    const data = await response.json();
    const latitude = data.latitude.toFixed(2);
    const longitude = data.longitude.toFixed(2);

    // Converting Unix epoch time to human-readable date and time
    const unixTimestamp = data.timestamp;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormatLong = dateObject.toString();

    // Changing the name of Time Zone from long to short (e.g. to CEST)
    const stringTemp1 = humanDateFormatLong.split("(");
    const stringTemp2 = stringTemp1[1].slice(0, -1);
    const stringTemp3 = stringTemp2.split(" ");
    const stringTemp4 = stringTemp3.map((word) => word.charAt(0)).join("");
    const humanDateFormat = stringTemp1[0] + stringTemp4;

    // Setting other values
    const speed = data.velocity.toFixed(2);
    const altitude = data.altitude.toFixed(2);
    const visibility = data.visibility;

    let solar_lat = data.solar_lat.toFixed(2);
    let solar_lon = data.solar_lon.toFixed(2);

    // Calibrating the position of the Sun
    if (solar_lon > 180) {
      solar_lon = solar_lon - 360;
    }

    const result = {
      humanDateFormat,
      unixTimestamp,
      visibility,
      latitude,
      longitude,
      speed,
      altitude,
      solar_lat,
      solar_lon,
    };

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch ISS data");
  }
};

export const fetchWeatherData = async (coordinates) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=783846624ca63c9a9fcdd9321a7c9318&exclude=minutely&units=metric`
    );
    const data = await response.json();

    const timezone = data.timezone;
    const days = data.daily.map((day) => {
      return moment.unix(day.dt).tz(timezone).format("MMM Do YY");
    });
    const maxTemps = data.daily.map((data) => {
      return data.temp.max;
    });
    const minTemps = data.daily.map((data) => {
      return data.temp.min;
    });
    const windSpeeds = data.daily.map((data) => {
      return data.wind_speed;
    });
    const cloudCoverage = data.daily.map((data) => {
      return data.clouds;
    });
    const humidity = data.daily.map((data) => {
      return data.humidity;
    });
    const pressure = data.daily.map((data) => {
      return data.pressure;
    });

    return { days, maxTemps, minTemps, windSpeeds, cloudCoverage, humidity, pressure };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch weather data");
  }
};
