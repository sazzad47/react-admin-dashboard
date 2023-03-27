import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import SpeedConverter from "./converters/SpeedConverter";
import DynamicTable from "./DynamicTable";

const ISSData = ({ issData }) => {
  const radius = calculateRadius(issData.altitude);
  const radiusOverHorizon = calculateRadius20degrees(issData.altitude);

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
    return radiusVisible;
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
    return radius20degOverHorizon;
  }

  const [velocityUnit, setVelocityUnit] = useState();
  const [altitudeUnit, setAltitudeUnit] = useState();
  const [radiusUnit, setRadiusUnit] = useState();
  const timestamp = issData.unixTimestamp * 1000;
  const localTime = new Date(timestamp).toLocaleTimeString();

  const capitalizeFirst = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  const altitudeConverter = (altitudeUnit) => {
    switch (altitudeUnit) {
      case "Mile":
        return {
          altitude: issData.altitude * 0.621371,
          radius: radius * 0.621371,
          radiusOverHorizon: radiusOverHorizon * 0.621371,
          suffix: " mi",
        };
      case "Meter":
        return {
          altitude: issData.altitude * 1000,
          radius: radius * 1000,
          radiusOverHorizon: radiusOverHorizon * 1000,
          suffix: " m",
        };

      case "Kilometer":
        return {
          altitude: issData.altitude,
          radius: radius,
          radiusOverHorizon: radiusOverHorizon,
          suffix: " km",
        };
      default:
        return {
          altitude: issData.altitude,
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
          velocity: issData.speed / 1.609344,
          suffix: " mph",
        };
      case "Meter per second":
        return {
          velocity: issData.speed * 0.277778,
          suffix: " mps",
        };

      case "Kilometer per hour":
        return {
          velocity: issData.speed,
          suffix: " kph",
        };
      default:
        return {
          velocity: issData.speed,
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
                      <td>{issData.unixTimestamp}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Current Local Time</td>
                      <td>{issData.humanDateFormat}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Latitude</td>
                      <td>{issData.latitude} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Longitude</td>
                      <td>{issData.longitude} °</td>
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
                      <td>{capitalizeFirst(issData.visibility)}</td>
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
                      <td>{issData.solar_lat} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Solar Longitude</td>
                      <td>{issData.solar_lon} °</td>
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
        <DynamicTable
          dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
          data={issData}
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
