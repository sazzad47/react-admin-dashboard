import { UncontrolledCollapse, Card, CardHeader, Col } from "reactstrap";
import { useEffect, useState } from "react";
import SensorMapFilterSearchBar from "./sensorMapFilterSearchBar";
import { useRef } from "react";
const SensorMapFilterSideBar = ({ sensorList, mapRef, mapLayers }) => {
  const filterData = useRef([]);
  const initialMapLayer = useRef([]);
  const [batteryStatus, setBatteryStatus] = useState([
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "80%",
  ]);
  const [sensorTypes, setSensorTypes] = useState([
    "NVIDIA Jetson Nano",
    "NVIDIA Jetson AGX Xavier",
    "Raspberry Pi 4",
  ]);
  const [sensorTypesState, setSensorTypesState] = useState([]);
  const [batteryStatusState, setBatteryStatusState] = useState([]);

  useEffect(() => {
    filterData.current = sensorList;
    initialMapLayer.current = mapLayers;
    resetMap();
    if (batteryStatusState.length > 0) {
      mapLayers.forEach((element) => {
        if (!batteryStatusState.includes(element.sensorBattery.toString())) {
          element.groupLayers.forEach((elem) => {
            mapRef.current.removeLayer(elem);
          });
        }
      });
    }
    if (sensorTypesState.length > 0) {
      mapLayers.forEach((element) => {
        if (!sensorTypesState.includes(element.sensorType.toString())) {
          element.groupLayers.forEach((elem) => {
            mapRef.current.removeLayer(elem);
          });
        }
      });
    }
  }, [sensorList, mapLayers, batteryStatusState, sensorTypesState]);

  const recieveSearchValue = (searchValue) => {
    mapRef.current.setView(searchValue.markerPosition, 15);
  };

  const handleFilterBattery = (batteryStatus) => {
    if (batteryStatusState.includes(batteryStatus)) {
      setBatteryStatusState(
        batteryStatusState.filter((elem) => elem !== batteryStatus)
      );
    } else {
      setBatteryStatusState([...batteryStatusState, batteryStatus]);
    }
  };

  const handleSensorTypeFilter = (category) => {
    console.log(category);
    if (sensorTypesState.includes(category)) {
      setSensorTypesState(sensorTypesState.filter((elem) => elem !== category));
    } else {
      setSensorTypesState([...sensorTypesState, category]);
    }
  };
  const resetMap = () => {
    mapLayers.forEach((element) => {
      element.groupLayers.forEach((elem) => {
        mapRef.current.addLayer(elem);
      });
    });
  };

  const clearAllFilters = () => {
    setBatteryStatusState([]);
    setSensorTypesState([]);
    mapLayers.forEach((element) => {
      element.groupLayers.forEach((elem) => {
        mapRef.current.addLayer(elem);
      });
    });
  };

  const handleFilter = () => {
    if (batteryStatusState.length > 0) {
      mapLayers.forEach((element) => {
        if (!batteryStatusState.includes(element.sensorBattery.toString())) {
          element.groupLayers.forEach((elem) => {
            mapRef.current.removeLayer(elem);
          });
        }
      });
    }
    if (sensorTypesState.length > 0) {
      mapLayers.forEach((element) => {
        if (!sensorTypesState.includes(element.sensorType.toString())) {
          element.groupLayers.forEach((elem) => {
            mapRef.current.removeLayer(elem);
          });
        }
      });
    }
  };

  return (
    <Card>
      
        <div className="d-flex mb-3">
          <div className="flex-shrink-0">
            <div
              style={{ cursor: "pointer" }}
              className="text-decoration-underline"
              onClick={() => {
                clearAllFilters();
              }}
            >
              Clear All
            </div>
          </div>
        </div>
        <SensorMapFilterSearchBar
          sensorData={filterData}
          recieveSearchValue={recieveSearchValue}
        />
      
      <div className="accordion accordion-flush">
        <div className="card-body border-bottom">
          <div>
            <p className="text-muted text-uppercase fs-12 fw-medium mb-2">
              Sensor Types
            </p>
            <ul className="list-unstyled mb-0 filter-list">
              {sensorTypes.map((element, index) => (
                <li key={index}>
                  <div
                    key={index}
                    className="form-check"
                    onClick={() => {
                      handleSensorTypeFilter(element);
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`sensorType${index}`}
                      value={element}
                      checked={
                        sensorTypesState.includes(element) === true
                          ? true
                          : false || false
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="productdiscountRadio6"
                    >
                      {element}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-body border-bottom">
          <div>
            <p className="text-muted text-uppercase fs-12 fw-medium mb-2">
              Battery status
            </p>
            <ul className="list-unstyled mb-0 filter-list">
              {batteryStatus.map((element, index) => (
                <li key={index}>
                  <div
                    key={index}
                    className="form-check"
                    onClick={() => {
                      handleFilterBattery(element);
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`batteryStatus${index}`}
                      value={element}
                      checked={
                        batteryStatusState.includes(element) === true
                          ? true
                          : false || false
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="productdiscountRadio6"
                    >
                      {element}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SensorMapFilterSideBar;
