import { Viewer, Entity } from "resium";
import { useEffect, useState } from "react";
import { ScreenSpaceEventHandler, ScreenSpaceEvent } from "resium";
import {
  Cartesian3,
  HeightReference,
  ScreenSpaceEventType,
  SceneMode,
  Math,
  Cartographic,
  SceneTransforms,
  PolylineGlowMaterialProperty,
  Color,
  Ellipsoid,
  JulianDate,
} from "cesium";
import iss from "../../assets/images/iss.png";
import operator from "../../assets/images/operator.png";

const Tooltip = ({ description, position }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
        minHeight: "50px",
        maxHeight: "50px",
        position: "absolute",
        width: "230px",
        border: "2px solid rgba(19, 159, 255, 1)",
        borderRadius: "10px",
        backgroundColor: "rgba(30, 49, 74, 0.6)",
        left: position.x + 30,
        top: position.y,
      }}
    >
      {description}
    </div>
  );
};

const Entities = ({ entities }) => {
  return (
    <>
      {entities &&
        entities.map((entity) => <Entity key={entity.id} {...entity} />)}
    </>
  );
};

const ViewerWithMouseMove = ({ children, center, issData }) => {
  const [viewerRef, setViewerRef] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipDescription, setTooltipDescription] = useState("");

  const handleMouseMove = (e) => {
    if (viewerRef.scene?.mode !== SceneMode.MORPHING) {
      const pickedObject = viewerRef.scene.pick(e.endPosition);
      if (pickedObject && pickedObject.id && pickedObject.id.description) {
        const description = pickedObject.id.description._value;
        const cartesian = viewerRef.scene.pickPosition(e.endPosition);
        if (cartesian) {
          const cartographic = Cartographic.fromCartesian(cartesian);
          const longitude = Math.toDegrees(cartographic.longitude);
          const latitude = Math.toDegrees(cartographic.latitude);
          const altitude = cartographic.height;

          // Convert the WGS84 coordinates to window coordinates
          const position3d = Cartesian3.fromDegrees(
            longitude,
            latitude,
            altitude
          );
          const position2d = SceneTransforms.wgs84ToWindowCoordinates(
            viewerRef.scene,
            position3d
          );

          setTooltipPosition({ x: position2d.x, y: position2d.y });
          setTooltipDescription(description);
          setShowTooltip(true);
        }
      } else {
        setShowTooltip(false);
      }
    }
  };

  useEffect(() => {
    if (center) {
      viewerRef?.camera.setView({
        destination: Cartesian3.fromDegrees(
          parseFloat(issData.longitude),
          parseFloat(issData.latitude),
          Ellipsoid.WGS84.cartesianToCartographic(viewerRef?.camera.position)
            .height
        ),
      });
    }
  });

  useEffect(() => {
    if (!viewerRef) {
      return;
    }
    const clock = viewerRef.clock;
    clock.shouldAnimate = true;
    const now = JulianDate.now();
    const newEndDate = JulianDate.addSeconds(
      now,
      60,
      new JulianDate()
    );
    viewerRef.timeline.zoomTo(clock.startTime, newEndDate);
  
  }, [viewerRef]);

  return (
    <Viewer
      full
      ref={(e) => {
        if (e !== null) {
          setViewerRef(e.cesiumElement);
        }
      }}
    >
      <ScreenSpaceEventHandler>
        <ScreenSpaceEvent
          action={(evt) => handleMouseMove(evt)}
          type={ScreenSpaceEventType.MOUSE_MOVE}
        />
      </ScreenSpaceEventHandler>
      {showTooltip && (
        <Tooltip description={tooltipDescription} position={tooltipPosition} />
      )}
      {children}
    </Viewer>
  );
};

const GenerateEntity = ({ operatorCoord, ipInfo, issData, latlngs }) => {
  let entities = [];

  if (latlngs.length >= 2) {
    entities.push({
      id: 3,
      name: "ISS Trajectory",
      polyline: {
        positions: Cartesian3.fromDegreesArray(latlngs),
        width: 10,
        material: new PolylineGlowMaterialProperty({
          glowPower: 0.2,
          taperPower: 0.5,
          color: Color.CORNFLOWERBLUE,
        }),
        clampToGround: true,
      },
    });
  }

  entities = [
    ...entities,
    {
      id: 1,
      name: "Operator position",
      description: `You are here in ${
        ipInfo?.city
      }. Latitude: ${operatorCoord?.latitude.toFixed(
        1
      )} Longitude: ${operatorCoord?.longitude.toFixed(1)}`,
      position: operatorCoord
        ? Cartesian3.fromDegrees(
            operatorCoord.longitude,
            operatorCoord.latitude,
            1000
          )
        : Cartesian3.ZERO,
      billboard: {
        image: operator,
        scale: 0.2,
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
    },
    {
      id: 2,
      name: "ISS",
      description: `Here is ISS. Latitude: ${parseFloat(
        issData?.latitude
      ).toFixed(1)} Longitude: ${parseFloat(issData?.longitude).toFixed(1)}`,
      position:
        issData && issData.longitude !== undefined
          ? Cartesian3.fromDegrees(
              parseFloat(issData.longitude),
              parseFloat(issData.latitude),
              1000
            )
          : Cartesian3.ZERO,
      billboard: {
        image: iss,
        scale: 1.2,
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
    },
  ];

  return entities;
};

const ResiumViewer = ({ operatorCoord, ipInfo, issData, center, latlngs }) => {
  const entities = GenerateEntity({
    operatorCoord,
    ipInfo,
    issData,
    center,
    latlngs,
  });
  if (entities === null) return null;

  return (
    <ViewerWithMouseMove center={center} issData={issData}>
      <Entities entities={entities} />
    </ViewerWithMouseMove>
  );
};

export default ResiumViewer;
