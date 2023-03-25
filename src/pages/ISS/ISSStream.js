import React from 'react';

const ISSStream = ({ width, height }) => (
  <iframe
    title="ISS Stream"
    width={width}
    height={height}
    src="https://ustream.tv/embed/17074538"
    scrolling="no"
    allowFullScreen
    frameBorder="0"
    className="issFrame"
  ></iframe>
);

export default ISSStream;
