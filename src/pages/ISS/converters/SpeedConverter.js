import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Form, Label, Row } from "reactstrap";
import { issParameters } from "./Units";
const TempConverter = ({ setRadiusUnit, setAltitudeUnit, setVelocityUnit }) => {
  const [parameter, setParameter] = useState();

  const quantities = issParameters.map((quantity, index) => (
    <option key={index} defaultValue={quantity.quantity}>
      {quantity.quantity}
    </option>
  ));
  const units = issParameters
    .find((quantity) => quantity.quantity === parameter)
    ?.units.map((unit, index) => (
      <option key={index} defaultValue={unit}>
        {unit}
      </option>
    ));

  const handleChange = (e) => {
    if (parameter === "Altitude") return setAltitudeUnit(e.target.value);
    if (parameter === "Velocity") return setVelocityUnit(e.target.value);
    if (parameter === "Radius") return setRadiusUnit(e.target.value);
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
                  onChange={(e) => setParameter(e.target.value)}
                  className="form-select"
                  data-choices
                  data-choices-sorting="true"
                  id="inlineFormSelectPref"
                >
                  <option>Choose parameter...</option>
                  {quantities}
                </select>
              </Col>
              <Col xs={12} md={3} lg={3}>
                <Label
                  className="visually-hidden"
                  htmlFor="inlineFormSelectPref"
                >
                  Preference
                </Label>
                <select
                  disabled={!parameter}
                  onChange={handleChange}
                  className="form-select"
                  data-choices
                  data-choices-sorting="true"
                  id="inlineFormSelectPref"
                >
                  <option>Convert to</option>
                  {units}
                </select>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default TempConverter;
