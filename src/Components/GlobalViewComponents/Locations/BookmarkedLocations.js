import React, { useContext } from "react";
import { StateContext } from "../../../pages/Pages/GlobalViewPage/StateProvider";
import yellow_icon from "../asset/images/yellow_icon.png";
import red_icon from "../asset/images/red_icon.jpg";
import green_icon from "../asset/images/green_icon.png";
import { BillboardGraphics, Entity, EntityDescription } from "resium";
import { DescriptionTable } from "../Common";
import * as Cesium from "cesium";

const BookmarkedLocations = () => {
  const { bookmarked } = useContext(StateContext);
  const icons = [yellow_icon, red_icon, green_icon];

  return (
    <>
      {bookmarked?.map((item, index) => (
        <Entity
          key={`${item?.name}-${index}`}
          position={item?.pos}
          name={item?.name}
        >
          <EntityDescription>
            <DescriptionTable
              longitude={item?.longitude}
              latitude={item?.latitude}
              date={item?.date}
              desc={item?.desc}
            />
          </EntityDescription>
          {item?.icon === "Yellow" && (
            <BillboardGraphics
              scale={0.08}
              image={icons[0]}
              heightReference={Cesium.HeightReference.CLAMP_TO_GROUND}
            />
          )}
          {item?.icon === "Red" && (
            <BillboardGraphics
              scale={0.05}
              image={icons[1]}
              heightReference={Cesium.HeightReference.CLAMP_TO_GROUND}
            />
          )}
          {item?.icon === "Green" && (
            <BillboardGraphics
              scale={0.05}
              image={icons[2]}
              heightReference={Cesium.HeightReference.CLAMP_TO_GROUND}
            />
          )}
        </Entity>
      ))}
    </>
  );
};

export default BookmarkedLocations;
