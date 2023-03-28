import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import ISSData from "./issData";
import Cameras from "./Cameras";
import { WeatherChart } from "./WeatherChart";
import ISSAltitude from "./ISSAltitude";

const MapTabContainer = ({
  issData
}) => {
  const [customActiveTab, setcustomActiveTab] = useState("weather");

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
           issData={issData}
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
           issData={issData}
          />
        </TabPane>
        <TabPane id="nav-issAltitude" tabId="issAltitude">
          <ISSAltitude
            dataColors='["--vz-primary", "--vz-success"]'
            altitude={issData.altitude}
          />
        </TabPane>
      </TabContent>
    </>
  );
};

export default MapTabContainer;
