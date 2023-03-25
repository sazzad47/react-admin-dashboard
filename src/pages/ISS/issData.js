import React, { useEffect, useState } from "react";
// @ts-ignore
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import SpeedConverter from "./SpeedConverter";
import ISSTable from "./ISSTable";

const ISSData = ({
  setOperatorLat,
  setOperatorLong,
  setOperatorCity,
  setCoords,
  setLatlngs,
  xAxis,
  pause,
  setLatitude,
  setLongitude,
}) => {
  const [data, setData] = useState([]);
  // @ts-ignore
  const [loading, setLoading] = useState(false);
  const [radius, setRadius] = useState();
  const [radiusOverHorizon, setRadiusOverHorizon] = useState();
  let lat;
  let long;

  // to call 1 time at start so the data is loaded
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to call fetch data every 10 seconds
  useEffect(() => {
    const myInterval = setInterval(fetchData, 10000);

    return () => {
      // should clear the interval when the component unmounts
      xAxis.unshift(xAxis.length);
      clearInterval(myInterval);
    };
  });

  const fetchData = () => {
    if (pause) {
      return;
    }
    setLoading(true);
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => response.json())
      .then((data) => {
        lat = data.latitude.toFixed(2);
        long = data.longitude.toFixed(2);
        // Converting Unix epoch time to human-readable date and time
        const unixTimestamp = data.timestamp;
        const milliseconds = unixTimestamp * 1000;
        const dateObject = new Date(milliseconds);
        const humanDateFormatLong = dateObject.toString();
        // Changing the name of Time Zone from long to short (e.g. to CEST)
        const stringTemp1 = humanDateFormatLong.split("(");
        const stringTemp2 = stringTemp1[1].slice(0, -1);
        const stringTemp3 = stringTemp2.split(" ");
        let stringTemp4 = "";
        for (let i = 0; i < stringTemp3.length; i++) {
          stringTemp4 = stringTemp4 + stringTemp3[i].charAt(0);
        }
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
        // Adding trail of ISS
        let trajectory = [];
        trajectory.push(lat, long);
        // @ts-ignore
        let latlngs = trajectory.map((elem) => parseFloat(elem));
        setLatlngs((oldArr) => [...oldArr, parseFloat(long), parseFloat(lat)]);
        setCoords((oldArr) => [...oldArr, latlngs]);
        setData([
          // @ts-ignore
          humanDateFormat,
          unixTimestamp,
          visibility,
          lat,
          // @ts-ignore
          long,
          // @ts-ignore
          // @ts-ignore
          speed,
          // @ts-ignore
          altitude,
          // @ts-ignore
          // @ts-ignore
          solar_lat,
          // @ts-ignore
          solar_lon,
          // @ts-ignore
        ]);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setLoading(false);
        calculateRadius(altitude);
        calculateRadius20degrees(altitude);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  function processData(data) {
    // Here, you can put your code to process the data from response
    let lat = data.latitude;
    let long = data.longitude;
    let currentCity = data.city;
    setOperatorLat(parseFloat(lat));
    setOperatorLong(parseFloat(long));
    setOperatorCity(currentCity);
  }
  const showPosition = () => {
    fetch("https://ipwhois.app/json/?objects=city,latitude,longitude")
      .then((response) => response.json())
      .then((data) => {
        processData(data);
      });
  };
  useEffect(() => {
    showPosition();
  }, []);
  useEffect(() => {
    const myInterval = setInterval(showPosition, 10000);

    return () => {
      clearInterval(myInterval);
    };
  });

  React.useEffect(() => {}, [data]);

  // Calculating current horizon radius of ISS visibility - > tangent to the Earth
  function calculateRadius(altitude) {
    let earthRadius = 6371; // * [km]
    altitude = parseFloat(altitude);
    let radiusVisible = Math.sqrt(
      (earthRadius + altitude) ** 2 - earthRadius ** 2
    );
    radiusVisible = radiusVisible.toFixed(2);
    //* [m]
    radiusVisible = parseFloat(radiusVisible);
    setRadius(radiusVisible);
  }

  // Calculating current radius of ISS visibility 20 degrees over horizon - using -> //* The law of sines
  function calculateRadius20degrees(altitude) {
    altitude = parseFloat(altitude);
    let earthRadius = 6371; // * [km]
    // Convert Degrees to Radians
    let degToRads = (deg) => (deg * Math.PI) / 180.0;
    // 110 degrees to radians (20 degrees over horizon)
    let angle20degRad = degToRads(110);
    // console.log("angle20degRad:", angle20degRad);
    // alpha angle
    let α = Math.asin(
      (earthRadius * Math.sin(angle20degRad)) / (earthRadius + altitude)
    );
    // beta angle
    let β = Math.PI - angle20degRad - α;
    // Radius of ISS visibility 20 degrees over horizon
    let radius20degOverHorizon =
      (Math.sin(β) * (earthRadius + altitude)) / Math.sin(angle20degRad); // * [km]

    radius20degOverHorizon = radius20degOverHorizon.toFixed(2); // * [km]
    setRadiusOverHorizon(radius20degOverHorizon);
  }

  const [velocityUnit, setVelocityUnit] = useState();
  const [altitudeUnit, setAltitudeUnit] = useState();
  const [radiusUnit, setRadiusUnit] = useState();
  const timestamp = data[1] * 1000;
  const localTime = new Date(timestamp).toLocaleTimeString();

  const capitalizeFirst = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  const altitudeConverter = (altitudeUnit) => {
    switch (altitudeUnit) {
      case "Mile":
        return {
          altitude: data[6] * 0.621371,
          radius: radius * 0.621371,
          radiusOverHorizon: radiusOverHorizon * 0.621371,

          suffix: " mi",
        };
      case "Meter":
        return {
          altitude: data[6] * 1000,
          radius: radius * 1000,
          radiusOverHorizon: radiusOverHorizon * 1000,
          suffix: " m",
        };

      case "Kilometer":
        return {
          altitude: data[6],
          radius: radius,
          radiusOverHorizon: radiusOverHorizon,
          suffix: " km",
        };
      default:
        return {
          altitude: data[6],
          radius: radius,
          radiusOverHorizon: radiusOverHorizon,
          suffix: " km",
        };
    }
  };
  const radiusConverter = (radiusUnit) => {
    switch (radiusUnit) {
      case "Mile":
        return {
          radius: radius * 0.621371,
          radiusOverHorizon: radiusOverHorizon * 0.621371,
          suffix: " mi",
        };
      case "Meter":
        return {
          radius: radius * 1000,
          radiusOverHorizon: radiusOverHorizon * 1000,
          suffix: " m",
        };

      case "Kilometer":
        return {
          radius: radius,
          radiusOverHorizon: radiusOverHorizon,
          suffix: " km",
        };
      default:
        return {
          radius: radius,
          radiusOverHorizon: radiusOverHorizon,
          suffix: " km",
        };
    }
  };

  const velocityConverter = (velocityUnit) => {
    switch (velocityUnit) {
      case "Miles per hour":
        return {
          velocity: data[5] / 1.609344,
          suffix: " mph",
        };
      case "Meter per second":
        return {
          velocity: data[5] * 0.277778,
          suffix: " mps",
        };

      case "Kilometer per hour":
        return {
          velocity: data[5],
          suffix: " kph",
        };
      default:
        return {
          velocity: data[5],
          suffix: " kph",
        };
    }
  };

  return (
    <React.Fragment>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex align-items-center justify-content-between">
            <div>ISS Data</div>
            <div>{localTime}</div>
          </CardHeader>
          <CardBody>
            <div className="ISS Data">
              <div className="table-responsive">
                <Table className="table-striped table-nowrap align-middle mb-0">
                  <tbody>
                    <tr>
                      <td className="fw-medium">Current Unix Time</td>
                      <td>{data[1]}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Current Local Time</td>
                      <td>{data[0]}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Latitude</td>
                      <td>{data[3]} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Longitude</td>
                      <td>{data[4]} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Orbital Speed</td>
                      <td>
                        {velocityConverter(velocityUnit).velocity}{" "}
                        {velocityConverter(velocityUnit).suffix}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Visibility</td>
                      <td>{capitalizeFirst(data[2])}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Altitude</td>
                      <td>
                        {altitudeConverter(altitudeUnit).altitude}{" "}
                        {altitudeConverter(altitudeUnit).suffix}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Solar Latitude</td>
                      <td>{data[7]} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Solar Longitude</td>
                      <td>{data[8]} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Current radius of ISS visibility 20° over horizon
                      </td>
                      <td>
                        {radiusConverter(radiusUnit).radius}{" "}
                        {radiusConverter(radiusUnit).suffix}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Current horizon radius of ISS visibility &#40;tangent to
                        the Earth &#41;
                      </td>
                      <td>
                        {radiusConverter(radiusUnit).radiusOverHorizon}{" "}
                        {radiusConverter(radiusUnit).suffix}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </CardBody>
        </Card>
        <ISSTable
          dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
          data={data}
          velocityUnit={velocityUnit}
          setVelocityUnit={setVelocityUnit}
          altitudeUnit={altitudeUnit}
          setAltitudeUnit={setAltitudeUnit}
        />
        <SpeedConverter
          setRadiusUnit={setRadiusUnit}
          velocityUnit={velocityUnit}
          setVelocityUnit={setVelocityUnit}
          altitudeUnit={altitudeUnit}
          setAltitudeUnit={setAltitudeUnit}
        />
      </Col>
    </React.Fragment>
  );
};

export default ISSData;
