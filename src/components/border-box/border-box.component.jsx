import React from 'react';
import '../face-recognition/face-recognition.styles.css';

const BorderBox = ({ top, right, bottom, left }) => {
	return (
		<div className="bounding-box" style={{ top, right, bottom, left }} />
	);
};

export default BorderBox;
