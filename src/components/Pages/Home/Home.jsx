import React from 'react';
import Banner from './Banner';
import About from './About';
import Services from './Services';

const Home = () => {
    return (
        <div>
            <h1 className="text-3xl">Home</h1>
            <Banner></Banner>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;