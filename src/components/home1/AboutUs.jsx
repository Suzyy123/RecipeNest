import React from 'react';
import '../../css/home1css/About.css';
import CustomImage from '../SmallComponents/CustomImage';
import i1 from '../../assets/CustomImages/i1.png';
import i2 from '../../assets/CustomImages/i2.png';
import i3 from '../../assets/CustomImages/i3.png';
import i4 from '../../assets/CustomImages/i4.png';
import i5 from '../../assets/CustomImages/i5.png';
import i6 from '../../assets/CustomImages/i6.png';
import i7 from '../../assets/CustomImages/i7.png';
import i8 from '../../assets/CustomImages/i8.png';
import i9 from '../../assets/CustomImages/i9.png';
const AboutUs = () => {
    const images = [
       i1,i2,i3,i4,i5,i6,i7,i8,i9

    ]
    return (
        <div className="aboutusContainer" id='aboutus'>
            <div className="aboutcol typography">
                <h1 className='about-title'>Whats <br/> Special About RecipeNest ?</h1>
                <p className='about-info'>
                Welcome to RecipeNest, a vibrant digital platform designed to bring chefs and food lovers together under one culinary roof. Built with simplicity, interactivity, and passion in mind, RecipeNest empowers chefs to showcase their creativity while giving food enthusiasts a chance to explore, save, and engage with recipes from around the world. Whether you're here to discover your next favorite dish, follow your favorite chef, or build your own recipe collection, RecipeNest offers a seamless experience tailored to every role. With secure access, role-based features, and user-focused design, our goal is to make food discovery more personal, interactive, and inspiring. From profile management to real-time interactions like liking, commenting, and favoriting, we make sure your culinary journey is both meaningful and enjoyable. Dive into RecipeNest — where every recipe tells a story, and every user is part of the kitchen.
                </p>
                <button className='about-btn'>Explore More</button>
            </div>
            <div className="aboutcol gallery">
            {images.map((src, index )=>( 
             <CustomImage key = {index} imgsrc={src} pt={"80%"}/>
            ))}
            
             
            </div>
        </div>
    );
};

export default AboutUs;
