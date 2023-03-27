import React from "react";
import { Card, CardBody, CardHeader, Col, Form, Label, Row } from "reactstrap";

const AltitudeConverter = ({ setAltitudeUnit }) => {
  const handleChange = (e) => {
    setAltitudeUnit(e.target.value);
  };

  return (
    <>
      <Card>
        <CardHeader>Unit Converter </CardHeader>
        <CardBody>
          <Form>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col xs={12} md={3} lg={3}>
                <Label
                  className="visually-hidden"
                  htmlFor="inlineFormSelectPref"
                >
                  Preference
                </Label>
                <select
                  onChange={handleChange}
                  className="form-select"
                  data-choices
                  data-choices-sorting="true"
                  id="inlineFormSelectPref"
                >
                  <option>Convert to...</option>
                  <option defaultValue="Mile">Mile</option>
                  <option defaultValue="Meter">Meter</option>
                  <option defaultValue="Kilometer">Kilometer</option>
                </select>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default AltitudeConverter;
