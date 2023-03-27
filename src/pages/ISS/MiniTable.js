import React from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";

const MiniTable = ({ issData }) => {
  const timestamp = issData.unixTimestamp * 1000;
  const localTime = new Date(timestamp).toLocaleTimeString();

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
                      <td>{issData.latitude} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Longitude</td>
                      <td>{issData.longitude} °</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Velocity</td>
                      <td>{issData.speed} kph</td>
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

export default MiniTable;
