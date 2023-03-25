import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import ISSData from "./issData";
import Cameras from "./Cameras";
import { WeatherChart } from "./WeatherChart";
import ISSAltitude from "./ISSAltitude";

const MapTabContainer = ({
  setOperatorLat,
  setOperatorLong,
  setOperatorCity,
  setCoords,
  latlngs,
  setLatlngs,
  pause,
  setLatitude,
  setLongitude,
  latitude,
  longitude,
  altitude,
}) => {
  const [customActiveTab, setcustomActiveTab] = useState("weather");
  const [xAxis, setXAxis] = useState([]);
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <>
      <Nav tabs className="nav-tabs-custom nav-success">
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "weather",
            })}
            onClick={() => {
              toggleCustom("weather");
            }}
          >
            Weather
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "cameras",
            })}
            onClick={() => {
              toggleCustom("cameras");
            }}
          >
            Cameras
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "stats",
            })}
            onClick={() => {
              toggleCustom("stats");
            }}
          >
            Stats
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "issAltitude",
            })}
            onClick={() => {
              toggleCustom("issAltitude");
            }}
          >
            ISS Altitude
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent
        activeTab={customActiveTab}
        className="border w-tab-content border-top-0 p-2 p-md-2 p-lg-4"
        id="nav-tabContent"
        style={{ minHeight: "30rem" }}
      >
        <TabPane id="nav-weather" tabId="weather">
          <WeatherChart
            dataColors='["--vz-success", "--vz-info", "--vz-danger"]'
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            latitude={latitude}
            longitude={longitude}
          />
        </TabPane>
        <TabPane
          id="nav-cameras"
          tabId="cameras"
          style={{ minHeight: "30rem", position: "relative" }}
        >
          <Cameras />
        </TabPane>
        <TabPane id="nav-stats" tabId="stats">
          <ISSData
            setOperatorLat={setOperatorLat}
            setOperatorLong={setOperatorLong}
            setOperatorCity={setOperatorCity}
            setCoords={setCoords}
            latlngs={latlngs}
            setLatlngs={setLatlngs}
            xAxis={xAxis}
            setXAxis={setXAxis}
            pause={pause}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            latitude={latitude}
            dataColors='["--vz-primary", "--vz-success"]'
            longitude={longitude}
          />
        </TabPane>
        <TabPane id="nav-issAltitude" tabId="issAltitude">
          <ISSAltitude
            xAxis={xAxis}
            dataColors='["--vz-primary", "--vz-success"]'
            latitude={latitude}
            longitude={longitude}
            altitude={altitude}
          />
        </TabPane>
      </TabContent>
    </>
  );
};

export default MapTabContainer;
