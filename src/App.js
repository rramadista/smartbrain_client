import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import Rank from './components/rank/rank.component';
import ImageLinkForm from './components/image-link-form/image-link-form.component';

const particlesOptions = {
    particles: {
        number: {
            value: 300,
            density: {
                enable: true,
                value_area: 800,
            },
        },
    },
};

function App() {
    return (
        <div className='App'>
            <Particles className='particles' params={particlesOptions} />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm />
            {/* <FaceRecognition /> */}
        </div>
    );
}

export default App;
