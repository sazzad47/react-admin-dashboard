import React, { useEffect, useState } from "react";
import MapTabContainer from "./mapTabContainer";
import Map from "./2DMap";
import CesiumComponent from "./CesiumComponent";
import ISSStream from "./ISSStream";
import { Card, Col, Input, Label, Row } from "reactstrap";
import MiniTable from "./MiniTable";
import "./style.css";
import { fetchISSData, fetchOperatorData } from "./FetchData";

const Index = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [operatorCoord, setOperatorCoord] = useState(null);
  const [issData, setIssData] = useState({});
  const [latlngs, setLatlngs] = useState([]);
  const [coords, setCoords] = useState([]);

  const [pause, setPause] = useState(false);
  const [center, setCenter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOperatorData();
      setIpInfo(data.ipInfo);
      setOperatorCoord(data.operatorCoord);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pause) return;
    const MAX_POINTS = 30;
    const fetchData = async () => {
      const response = await fetchISSData();
      setIssData(response);
      let trajectory = [];
      trajectory.push(response.latitude, response.longitude);
      let latlngs = trajectory.map((elem) => parseFloat(elem));

      if (latlngs.length === MAX_POINTS) {
        latlngs.shift();
        latlngs.shift();
      }
      setLatlngs((oldArr) => [
        ...oldArr,
        parseFloat(response.longitude),
        parseFloat(response.latitude),
      ]);
      setCoords((oldArr) => [...oldArr, latlngs]);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [pause]);
console.log('latns', latlngs.length)
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
              <CesiumComponent
                center={center}
                latlngs={latlngs}
                ipInfo={ipInfo}
                operatorCoord={operatorCoord}
                issData={issData}
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
                  <Map
                    center={center}
                    coords={coords}
                    issData={issData}
                    ipInfo={ipInfo}
                    operatorCoord={operatorCoord}
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
                  <MiniTable
                    issData={issData}
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
              issData={issData}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Index;
