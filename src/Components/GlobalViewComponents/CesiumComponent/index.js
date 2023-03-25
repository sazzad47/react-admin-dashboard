import { ScreenSpaceEventType } from "cesium";
import React from "react";
import { Container } from "reactstrap";
import {
  Camera,
  Globe,
  Scene,
  Viewer,
  ScreenSpaceEventHandler,
  ScreenSpaceEvent,
} from "resium";
import BookmarkedLocations from "../Locations/BookmarkedLocations";
import BookmarkingLocation from "../Locations/BookmarkingLocation";

const CesiumComponent = ({ updateHoverCoord, setViewerRef, viewerClicked }) => {
  return (
    <Container style={{ width: "100%", height: "100%", position: "relative" }}>
      <Viewer
        ref={(e) => {
          if (e !== null) {
            // @ts-ignore
            setViewerRef(e.cesiumElement);
          }
        }}
        fullscreenElement="globalAssetView_wrapper"
        onClick={viewerClicked}
        full
      >
        <Scene />
        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent
            action={(evt) => updateHoverCoord(evt)}
            type={ScreenSpaceEventType.MOUSE_MOVE}
          />
        </ScreenSpaceEventHandler>
        <Globe />
        <Camera />
        <BookmarkedLocations />
        <BookmarkingLocation />
      </Viewer>
    </Container>
  );
};

export default CesiumComponent;
