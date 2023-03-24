const Tooltip = ({ text, position }) => {
    const style = {
      position: 'absolute',
      left: position.x,
      top: position.y,
      backgroundColor: 'white',
      padding: '4px',
      border: '1px solid black',
      zIndex: 999,
    };
  
    return <div style={style}>{text}</div>;
  };

//   useEffect(() => {
//     if (center) {
//       viewerRef?.camera.setView({
//         destination: Cesium.Cartesian3.fromDegrees(
//           latitude,
//           longitude,
//           Cesium.Ellipsoid.WGS84.cartesianToCartographic(
//             viewerRef?.camera.position
//           ).height
//         ),
//       });
//     }
//   });