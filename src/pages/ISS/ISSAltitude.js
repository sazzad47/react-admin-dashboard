import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import AltitudeConverter from "./converters/AltitudeConverter";

function getChartColorsArray(colors) {
  colors = JSON.parse(colors);
  return colors.map(function (value) {
    var newValue = value.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
      var color = getComputedStyle(document.documentElement).getPropertyValue(
        newValue
      );
      if (color.indexOf("#") !== -1) color = color.replace(" ", "");
      if (color) return color;
      else return newValue;
    } else {
      var val = value.split(",");
      if (val.length === 2) {
        var rgbaColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue(val[0]);
        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
}
const ISSAltitude = ({ dataColors, altitude }) => {
  const [xAxis, setXAxis] = useState([]);
  const [arrayAlt, setArrayAlt] = useState([]);
  const [xValues, setXValues] = useState([]);
  console.log('altitude', altitude)
  useEffect(() => {
    const prepareArray = () => {
      const valid = !isNaN(altitude);
      if (!valid) {
        return;
      }
      setArrayAlt((oldArray) => [...oldArray, parseFloat(altitude)]);
      setXValues((oldArray) => [...oldArray, parseFloat(altitude)]);
      xAxis.unshift(xAxis.length);
      if (arrayAlt.length > 2) arrayAlt.shift();
      if (xValues.length > 15) xValues.shift();
      if (xAxis.length > 16) xAxis.shift();
    };

    prepareArray();
  }, [altitude]);

  const [altitudeUnit, setAltitudeUnit] = useState();

  const altitudeConverter = (altitudeUnit) => {
    switch (altitudeUnit) {
      case "Mile":
        return {
          altitude: xValues?.map((altidute) => altidute * 0.621371),
          suffix: " mi",
        };
      case "Meter":
        return {
          altitude: xValues?.map((altidute) => altidute * 1000),
          suffix: " m",
        };

      case "Kilometer":
        return {
          altitude: xValues?.map((altidute) => altidute),
          suffix: " km",
        };
      default:
        return {
          altitude: xValues?.map((altidute) => altidute),
          suffix: " km",
        };
    }
  };

  var linechartBasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Altitude",
      data: altitudeConverter(altitudeUnit).altitude,
    },
  ];
  var options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: linechartBasicColors,
    title: {
      text: "ISS Altitude",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },

    xaxis: {
      categories: xAxis,
      labels: {
        style: {
          colors: ["#008FFB"],
        },
        formatter: function (value) {
          return value + " sec ago";
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: ["#008FFB"],
        },
        formatter: function (value) {
          return value.toFixed(2) + altitudeConverter(altitudeUnit).suffix;
        },
      },
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="350"
        className="apex-charts"
      />
      <div className="mt-5">
        <AltitudeConverter setAltitudeUnit={setAltitudeUnit} />
      </div>
    </React.Fragment>
  );
};

export default ISSAltitude;
