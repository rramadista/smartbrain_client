import React, { useState } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import Rank from './components/rank/rank.component';
import ImageLinkForm from './components/image-link-form/image-link-form.component';
import FaceRecognition from './components/face-recognition/face-recognition.component';
import SignIn from './components/sign-in/sign-in.component';
import Register from './components/register/register.component';

const particlesOptions = {
	particles: {
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

function App() {
	const [input, setInput] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [boxAll, setBoxAll] = useState([]);
	const [route, setRoute] = useState('signin');
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState({
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
	});

	const loadUser = (data) => {
		setUser({
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined,
		});
	};

	const calculateFaceLocation = (data) => {
		const clarifaiFaceAll = data.outputs[0].data.regions;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		const boxArr = clarifaiFaceAll.map((region) => {
			return {
				leftCol: region.region_info.bounding_box.left_col * width,
				topRow: region.region_info.bounding_box.top_row * height,
				rightCol:
					width - region.region_info.bounding_box.right_col * width,
				bottomRow:
					height -
					region.region_info.bounding_box.bottom_row * height,
			};
		});
		return boxArr;
	};

	const displayFaceBox = (boxAll) => {
		setBoxAll(boxAll);
		console.log(boxAll.length);
	};

	// const calculateFaceLocation = (data) => {
	// 	const clarifaiFace =
	// 		data.outputs[0].data.regions[0].region_info.bounding_box;
	// 	const image = document.getElementById('inputImage');
	// 	const width = Number(image.width);
	// 	const height = Number(image.height);

	// 	return {
	// 		leftCol: clarifaiFace.left_col * width,
	// 		topRow: clarifaiFace.top_row * height,
	// 		rightCol: width - clarifaiFace.right_col * width,
	// 		bottomRow: height - clarifaiFace.bottom_row * height,
	// 	};
	// };

	// const displayFaceBox = (box) => {
	// 	setBox(box);
	// };

	const onInputChange = (e) => {
		setInput(e.target.value);
	};

	const onButtonSubmit = () => {
		setImageUrl(input);

		fetch('https://blooming-crag-02132.herokuapp.com/imageurl', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: input,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res) {
					fetch('https://blooming-crag-02132.herokuapp.com/image', {
						method: 'put',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: user.id,
						}),
					})
						.then((res) => res.json())
						.then((count) => setUser({ ...user, entries: count }))
						.catch(console.log);
				}
				displayFaceBox(calculateFaceLocation(res));
			})
			.catch((err) => console.log(err));
	};

	const onRouteChange = (route) => {
		if (route === 'signout') {
			setIsSignedIn(false);
		} else if (route === 'home') {
			setIsSignedIn(true);
		}
		setRoute(route);
	};

	return (
		<div className="App">
			<Particles className="particles" params={particlesOptions} />
			<Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
			{route === 'home' ? (
				<div>
					<Logo />
					<Rank name={user.name} entries={user.entries} />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onButtonSubmit}
					/>
					<FaceRecognition imageUrl={imageUrl} boxAll={boxAll} />
				</div>
			) : route === 'signin' ? (
				<SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
			) : (
				<Register loadUser={loadUser} onRouteChange={onRouteChange} />
			)}
		</div>
	);
}

export default App;
