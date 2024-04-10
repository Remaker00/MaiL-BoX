import React from 'react';
import Img from './Images/mailLogo.webp';

const BackgroundImage = () => {
    return (
        <div className='backimage'>
            <img src={Img} alt='Background Logo' width={150} />
            <h2>Wlecome To MaiL-BoX Service</h2>
            <h5>Only for Display</h5>
            <p>Download our app from Playstore for Free.</p>
            <button>Go To Playstore</button>
        </div>
    );
}

export default BackgroundImage;
