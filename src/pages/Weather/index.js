import React, { useState } from "react";
import MapTabContainer from "./mapTabContainer";
import WorldMap from "./WorldMap";
import Globe from "./Globe";
import ISSStream from "./ISSStream";
import { Card, Col, Input, Label, Row } from "reactstrap";
import RightSideISSData from "./RightSideISSData";
import "./style.css";

const Weather = () => {
  const [latitude, setLatitude] = React.useState();
  const [latlngs, setLatlngs] = useState([]);
  const [coords, setCoords] = useState([]);
  const [longitude, setLongitude] = React.useState();
  const [altitude, setAltitude] = React.useState();

  const [operatorLat, setOperatorLat] = useState(null);
  const [operatorLong, setOperatorLong] = useState(null);
  const [operatorCity, setOperatorCity] = useState(null);

  const [pause, setPause] = useState(false);
  const [center, setCenter] = useState(false);

  const handlePause = () => setPause(!pause);
  console.log("pause", pause);

  return (
    <>
      <div className="page-content mx-3">
        <Row>
          <Col xs={12}>
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">ISS Analytics</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">ISS Analytics</li>
                </ol>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={12} style={{ height: "3rem" }}>
            <div className="d-flex align-items-center justify-content-between form-check form-switch form-switch-right form-switch-md">
              <div>
                <Label className="form-label text-muted">Center ISS</Label>
                <Input
                  onChange={(e) => setCenter(e.target.checked)}
                  className="form-check-input code-switcher"
                  type="checkbox"
                />
              </div>
              <div>
                <Label className="form-label text-muted">Pause Updates</Label>
                <Input
                  onChange={(e) => setPause(e.target.checked)}
                  className="form-check-input code-switcher"
                  type="checkbox"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xl={8} md={12} sm={12}>
            <div
              className="mb-3 mb-md-3 mb-lg-0"
              style={{
                minHeight: "36.7rem",
                width: "100%",
                position: "relative",
              }}
            >
              <Globe
                operatorLat={operatorLat}
                operatorLong={operatorLong}
                center={center}
                latlngs={latlngs}
                latitude={latitude}
                longitude={longitude}
                altitude={altitude}
              />
            </div>
          </Col>
          <Col xl={4} md={12} sm={12}>
            <div style={{ maxHeight: "33rem" }}>
              <Card>
                <div
                  id="gmaps-markers"
                  className="block-container"
                  style={{ position: "relative" }}
                >
                  <WorldMap
                    center={center}
                    operatorLat={operatorLat}
                    operatorLong={operatorLong}
                    operatorCity={operatorCity}
                    coords={coords}
                    latitude={latitude}
                    longitude={longitude}
                  />
                </div>
              </Card>
              <Card>
                <div
                  id="gmaps-markers"
                  className="block-container"
                  style={{ position: "relative" }}
                >
                  <ISSStream width="100%" height="100%" />
                </div>
              </Card>
              <Card>
                <div
                  id="gmaps-markers"
                  className="wmap"
                  style={{ position: "relative" }}
                >
                  <RightSideISSData
                    pause={pause}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    setAltitude={setAltitude}
                    dataColors='["--vz-primary", "--vz-success"]'
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="tab-container mt-5">
            <MapTabContainer
              setOperatorLat={setOperatorLat}
              setOperatorLong={setOperatorLong}
              setOperatorCity={setOperatorCity}
              setCoords={setCoords}
              latlngs={latlngs}
              setLatlngs={setLatlngs}
              pause={pause}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              altitude={altitude}
              latitude={latitude}
              dataColors='["--vz-primary", "--vz-success"]'
              longitude={longitude}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Weather;
