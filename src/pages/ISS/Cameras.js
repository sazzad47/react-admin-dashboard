import Carousel from "react-elastic-carousel";
import ISSStream from "./ISSStream";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];

const Cameras = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Carousel
          style={{ minHeight: "15rem", position: "relative" }}
          breakPoints={breakPoints}
        >
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} style={{ minHeight: "16rem" }}>
              <ISSStream width="100%" height="100%" />
            </div>
          ))}
        </Carousel>
      </div>
      <div>
        <Carousel
          style={{
            minHeight: "15rem",
            position: "relative",
            marginTop: "10px",
          }}
          breakPoints={breakPoints}
        >
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} style={{ minHeight: "16rem" }}>
              <ISSStream width="100%" height="100%" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Cameras;
