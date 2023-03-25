import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";

const RightSideISSData = ({
  pause,
  setLatitude,
  setLongitude,
  setAltitude,
}) => {
  const [data, setData] = useState([]);
  // @ts-ignore
  const [loading, setLoading] = useState(false);
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
        console.log("data2", data);
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
        let solar_lon = data.solar_lon.toFixed(2);
        // Calibrating the position of the Sun
        if (solar_lon > 180) {
          solar_lon = solar_lon - 360;
        }
        // Adding trail of ISS
        let trajectory = [];
        trajectory.push(lat, long);
        // @ts-ignore
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
        ]);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setAltitude(data.altitude);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  React.useEffect(() => {}, [data]);

  const [velocityUnit, setVelocityUnit] = useState();
  const timestamp = data[1] * 1000;
  const localTime = new Date(timestamp).toLocaleTimeString();

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
                      <td className="fw-medium">Latitude</td>
                      <td>{data[3]} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Longitude</td>
                      <td>{data[4]} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Velocity</td>
                      <td>
                        {velocityConverter(velocityUnit).velocity}{" "}
                        {velocityConverter(velocityUnit).suffix}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideISSData;
