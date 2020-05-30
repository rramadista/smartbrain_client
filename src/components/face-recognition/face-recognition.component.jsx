import React from 'react';
import './face-recognition.styles.css';
import BorderBox from '../border-box/border-box.component';

const FaceRecognition = ({ imageUrl, boxAll }) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img
					id="inputImage"
					src={imageUrl}
					alt=""
					width="500px"
					height="auto"
				/>
				{boxAll.map((box, i) => {
					return (
						<BorderBox
							key={boxAll[i].topRow}
							top={boxAll[i].topRow}
							right={boxAll[i].rightCol}
							bottom={boxAll[i].bottomRow}
							left={boxAll[i].leftCol}
						/>
					);
				})}
				<div className="white f3">{`Terdapat ${boxAll.length} wajah di dalam gambar`}</div>
				{/* <div
                    className='bounding-box'
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol,
                    }}
                /> */}
			</div>
		</div>
	);
};

export default FaceRecognition;
