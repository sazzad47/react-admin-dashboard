// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from "cesium";
import image from "../../assets/images/iss.png";
import { Cartesian3 } from "cesium";

const Globe = ({ center, latitude, longitude, latlngs }) => {
  const [ipInfo, setIpInfo] = useState(null);
  const [operatorCoord, setOperatorCoord] = useState(null);

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=8dd3e07d895ea7")
      .then((response) => response.json())
      .then((data) => {
        setIpInfo(data);
        const [lat, lon] = data.loc.split(",");
        setOperatorCoord({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const [viewerRef, setViewerRef] = useState(null);

  const [issLat, setIssLat] = useState(null);
  const [issLong, setIssLong] = useState(null);

  const issTooltip = document.createElement("DIV");
  issTooltip.className = "toolTip-left";

  const title = document.createElement("DIV");
  title.className = "tooltipdiv-inner";
  issTooltip.appendChild(title);

  issTooltip.style.display = "none";
  issTooltip.innerHTML = `Here is ISS. Latitude: ${latitude?.toFixed(
    1
  )} Longitude: ${longitude?.toFixed(1)}`;
  viewerRef?.container.appendChild(issTooltip);

  const operatorTooltip = document.createElement("DIV");
  operatorTooltip.className = "toolTip-left";

  const OperatorTitle = document.createElement("DIV");
  title.className = "tooltipdiv-inner";
  operatorTooltip.appendChild(OperatorTitle);

  operatorTooltip.style.display = "none";
  operatorTooltip.innerHTML = `You are here in ${
    ipInfo?.city
  }. Latitude: ${operatorCoord?.latitude.toFixed(
    2
  )} Longitude: ${operatorCoord?.longitude.toFixed(2)}`;
  viewerRef?.container.appendChild(operatorTooltip);

  const issEntity = viewerRef?.entities.getById("1");
  const operatorEntity = viewerRef?.entities.getById("2");

  const scratch3dPosition = new Cesium.Cartesian3();
  const scratch2dPosition = new Cesium.Cartesian2();

  // Every animation frame, update the HTML element position from the issEntity.
  viewerRef?.clock.onTick.addEventListener((clock) => {
    let issPosition3d;
    let issPosition2d;

    // Not all entities have a position, need to check.
    if (issEntity && issEntity.position) {
      issPosition3d = issEntity.position.getValue(
        clock.currentTime,
        scratch3dPosition
      );
    }

    // Moving entities don't have a position for every possible time, need to check.
    if (issPosition3d) {
      issPosition2d = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        viewerRef.scene,
        issPosition3d,
        scratch2dPosition
      );
    }

    // Having a position doesn't guarantee it's on screen, need to check.
    if (issPosition2d) {
      // Set the HTML position to match the issEntity's position.
      issTooltip.style.left = issPosition2d.x + 30 + "px";
      issTooltip.style.top =
        issPosition2d.y - issTooltip.clientHeight / 2 + "px";
    } else {
      issTooltip.style.display = "none";
    }
  });
  viewerRef?.clock.onTick.addEventListener(function (clock) {
    let OperatorPosition3d;
    let OperatorPosition2d;

    // Not all entities have a position, need to check.
    if (operatorEntity?.position) {
      OperatorPosition3d = operatorEntity?.position.getValue(
        clock.currentTime,
        scratch3dPosition
      );
    }

    // Moving entities don't have a position for every possible time, need to check.
    if (OperatorPosition3d) {
      OperatorPosition2d = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        viewerRef?.scene,
        OperatorPosition3d,
        scratch2dPosition
      );
    }

    // Having a position doesn't guarantee it's on screen, need to check.
    if (OperatorPosition2d) {
      // Set the HTML position to match the issEntity's position.
      operatorTooltip.style.left = OperatorPosition2d.x + 30 + "px";
      operatorTooltip.style.top =
        OperatorPosition2d.y - operatorTooltip.clientHeight / 2 + "px";
    } else {
      operatorTooltip.style.display = "none";
    }
  });

  var scene = viewerRef?.scene;
  var handler = new Cesium.ScreenSpaceEventHandler(scene?.canvas);

  //Mouse in custom pop-up
  handler.setInputAction(function (movement) {
    if (scene?.mode !== Cesium.SceneMode.MORPHING) {
      var pickedObject = scene?.pick(movement.endPosition);

      if (Cesium.defined(pickedObject) && pickedObject.id._id === "1") {
        // isEntityVisible = false;
        console.log("pickedObject", pickedObject);
        issTooltip.style.display = "block";
      } else if (Cesium.defined(pickedObject) && pickedObject.id._id === "2") {
        operatorTooltip.style.display = "block";
      } else {
        // isEntityVisible = true;
        issTooltip.style.display = "none";
        operatorTooltip.style.display = "none";
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  useEffect(() => {
    setIssLat(latitude);
    setIssLong(longitude);
  }, [latitude, longitude]);

  return (
    <div id="iss_global_view">
      {issLat && issLong && (
        <Viewer
          full
          fullscreenElement="iss_global_view"
          style={{ height: "100%", width: "100%", position: "absolute" }}
          ref={(e) => {
            if (e !== null) {
              // @ts-ignore
              setViewerRef(e.cesiumElement);
            }
          }}
        >
          {latlngs?.length < 4 ? null : (
            <Resium.Entity>
              <Resium.PolylineGraphics
                show
                width={10}
                material={
                  new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    taperPower: 0.5,
                    color: Cesium.Color.CORNFLOWERBLUE,
                  })
                }
                // material={Cesium.Color.RED}
                positions={Cesium.Cartesian3.fromDegreesArray(latlngs)}
                eyeOffset={new Cartesian3(0.0, 0.0, -10.0)}
                heightReference={Cesium.HeightReference.CLAMP_TO_GROUND}
                verticalOrigin={Cesium.VerticalOrigin.CENTER}
                horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
                disableDepthTestDistance={1.2742018 * 10 ** 7}
              />
            </Resium.Entity>
          )}
          <Resium.Entity
            id="1"
            name="ISS"
            description="Here is ISS"
            position={Cartesian3.fromDegrees(issLat, issLong, 100)}
          >
            <Resium.BillboardGraphics
              image={image}
              // scale = {0.2}
              eyeOffset={new Cartesian3(0.0, 0.0, -10.0)}
              heightReference={Cesium.HeightReference.CLAMP_TO_GROUND}
              verticalOrigin={Cesium.VerticalOrigin.CENTER}
              horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
              disableDepthTestDistance={1.2742018 * 10 ** 7}
            />
          </Resium.Entity>
          {ipInfo && (
            <Resium.Entity
              id="2"
              name="Operator Position"
              description="You are here."
              position={Cartesian3.fromDegrees(
                parseFloat(operatorCoord.latitude),
                parseFloat(operatorCoord.longitude),
                100
              )}
              width={10}
              point={{ pixelSize: 8, color: Cesium.Color.YELLOW }}
            ></Resium.Entity>
          )}
        </Viewer>
      )}
    </div>
  );
};

export default Globe;
