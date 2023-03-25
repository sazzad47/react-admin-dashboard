import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment-timezone";
import TempConverter from "./TempConverter";

const WeatherChart = () => {
  const [timezone, setTimezone] = useState();
  const [days, setDays] = useState([]);
  const [maxTemps, setMaxTemps] = useState([]);
  const [minTemps, setMinTemps] = useState([]);
  const [windSpeeds, setWindSpeeds] = useState([]);
  const [cloudCoverage, setCloudCoverage] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [pressure, setPressure] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => response.json())
      .then((data) => {
        let coordinates = [data.latitude, data.longitude];
        fetchWeather(coordinates);
      })
      .catch(console.error);
  };

  const fetchWeather = (coordinates) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=783846624ca63c9a9fcdd9321a7c9318&exclude=minutely&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        let timezone = data.timezone;
        let days = data.daily.map((day) => {
          return moment.unix(day.dt).tz(timezone).format("MMM Do YY");
        });
        let maxTemps = data.daily.map((data) => {
          return data.temp.max;
        });
        let minTemps = data.daily.map((data) => {
          return data.temp.min;
        });
        let windSpeeds = data.daily.map((data) => {
          return data.wind_speed;
        });
        let cloudCoverage = data.daily.map((data) => {
          return data.clouds;
        });
        let humidity = data.daily.map((data) => {
          return data.humidity;
        });
        let pressure = data.daily.map((data) => {
          return data.pressure;
        });

        setTimezone(timezone);
        setDays(days);
        setMaxTemps(maxTemps);
        setMinTemps(minTemps);
        setWindSpeeds(windSpeeds);
        setCloudCoverage(cloudCoverage);
        setHumidity(humidity);
        setPressure(pressure);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [tempUnit, setTempUnit] = useState();
  const [speedUnit, setSpeedUnit] = useState();
  const [pressureUnit, setPressureUnit] = useState();

  const maxTempConverter = (tempUnit) => {
    switch (tempUnit) {
      case "Kelvin":
        return {
          data: maxTemps?.map((maxTemp) => maxTemp + 273.15),
          suffix: " K",
        };
      case "Celsius":
        return { data: maxTemps?.map((maxTemp) => maxTemp), suffix: " °C" };

      case "Fahrenheit":
        return {
          data: maxTemps?.map((maxTemp) => maxTemp * (9 / 5) + 32),
          suffix: " °F",
        };
      default:
        return { data: maxTemps?.map((maxTemp) => maxTemp), suffix: " °C" };
    }
  };

  const minTempConverter = (tempUnit) => {
    switch (tempUnit) {
      case "Kelvin":
        return {
          data: minTemps.map((minTemp) => minTemp + 273.15),
          suffix: " K",
        };
      case "Celsius":
        return { data: minTemps.map((minTemp) => minTemp), suffix: " °C" };

      case "Fahrenheit":
        return {
          data: minTemps.map((minTemp) => minTemp * (9 / 5) + 32),
          suffix: " °F",
        };
      default:
        return { data: minTemps.map((minTemp) => minTemp), suffix: " °C" };
    }
  };
  const speedConverter = (speedUnit) => {
    switch (speedUnit) {
      case "Miles per hour":
        return {
          data: windSpeeds.map((windSpeed) => windSpeed * 2.236936),
          suffix: " mph",
        };
      case "Meter per second":
        return {
          data: windSpeeds.map((windSpeed) => windSpeed),
          suffix: " mps",
        };

      case "Kilometer per hour":
        return {
          data: windSpeeds.map((windSpeed) => windSpeed * 3.6),
          suffix: " kph",
        };
      default:
        return {
          data: windSpeeds.map((windSpeed) => windSpeed),
          suffix: " mps",
        };
    }
  };
  const pressureConverter = (pressureUnit) => {
    switch (pressureUnit) {
      case "Hectopascal":
        return { data: pressure.map((pressure) => pressure), suffix: " hpa" };
      case "Pascal":
        return {
          data: pressure.map((pressure) => pressure * 100),
          suffix: " pa",
        };

      case "Standard atmosphere":
        return {
          data: pressure.map((pressure) => pressure * 0.000987),
          suffix: " atm",
        };
      default:
        return { data: pressure.map((pressure) => pressure), suffix: " hpa" };
    }
  };

  useEffect(() => {
    maxTempConverter(tempUnit);
    minTempConverter(tempUnit);
    speedConverter(speedUnit);
  }, [tempUnit, speedUnit]);


  var series = [
    {
      name: "Max Temp",
      type: "line",
      data: maxTempConverter(tempUnit).data,
    },
    {
      name: "Min Temp",
      type: "line",
      data: minTempConverter(tempUnit).data,
    },
    {
      name: "Wind Speed",
      type: "line",
      data: speedConverter(speedUnit).data,
    },
    {
      name: "Humidity",
      type: "line",
      data: humidity,
    },
    {
      name: "Cloud Coverage",
      type: "line",
      data: cloudCoverage,
    },
    {
      name: "Pressure",
      type: "line",
      data: pressureConverter(pressureUnit).data,
    },
  ];

  var options = {
    chart: {
      height: 350,
      width: "100%",
      type: "line",
      stacked: false,
    },
    data: {
      tempData: maxTempConverter(tempUnit).data,
      speedData: speedConverter(speedUnit).data,
      pressureData: pressureConverter(pressureUnit).data,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },
    title: {
      text: "ISS Weather Data",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    xaxis: {
      categories: days,
      tickPlacement: "on",
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: true,
        minHeight: 100,
        maxHeight: 180,
        style: {
          colors: "red",
        },
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
          formatter: function (value) {
            return value + maxTempConverter(tempUnit).suffix;
          },
        },
        title: {
          text: "Max Temp",
          style: {
            color: "#008FFB",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Min Temp",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#00E396",
        },
        labels: {
          style: {
            colors: "#00E396",
          },
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + minTempConverter(tempUnit).suffix;
            }
            return y;
          },
        },
        title: {
          text: "Min Temp",
          style: {
            color: "#00E396",
          },
        },
      },
      {
        seriesName: "Wind Speed",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + speedConverter(speedUnit).suffix;
            }
            return y;
          },
        },
        title: {
          text: "Wind Speed",
          style: {
            color: "#FEB019",
          },
        },
      },
      {
        seriesName: "Humidiy",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + " %";
            }
            return y;
          },
        },
        title: {
          text: "Humidity",
          style: {
            color: "#FEB019",
          },
        },
      },
      {
        seriesName: "Cloud Coverage",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + " %";
            }
            return y;
          },
        },
        title: {
          text: "Cloud Coverage",
          style: {
            color: "#FEB019",
          },
        },
      },
      {
        seriesName: "Pressure",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + pressureConverter(pressureUnit).suffix;
            }
            return y;
          },
        },
        title: {
          text: "Pressure",
          style: {
            color: "#FEB019",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "center",
      offsetX: 40,
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="370"
        width="100%"
        className="apex-charts"
      />
      <div className="mt-4">
        <TempConverter
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
          speedUnit={speedUnit}
          setSpeedUnit={setSpeedUnit}
          setPressureUnit={setPressureUnit}
          pressureUnit={pressureUnit}
        />
      </div>
    </React.Fragment>
  );
};

export { WeatherChart };
