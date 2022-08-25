import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import MapMarkerCustomIcons from "./MapElements/MapMarkerCustomIcons";

//Import maps
const SensorMaps = () => {
  document.title = "Sensor Map";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Sensor Map" pageTitle="Maps" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Smart Sensors Locations</h4>
                </CardHeader>
                    <CardBody>
                      <div
                        id="leaflet-map-custom-icons"
                        className="leaflet-map sensor-leaflet-map"
                      >
                        <MapMarkerCustomIcons />
                      </div>
                    </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SensorMaps;
