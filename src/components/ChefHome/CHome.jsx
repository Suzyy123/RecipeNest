
import React from 'react';
import Footer from '../home1/Footer';
import '../../css/DefaultHome.css'
import AboutUs from '../home1/AboutUs';
import Recipes from '../home1/Recipes';
import Favorite from '../ProfileTabs/Favorite';
import Chef from '../home1/Chefs';
const CHome = () => {
    return(
        <>
        <div className='home'>
            <div className="home-content">
                <img src='src/assets/HomePage.png' className='defaultHome'/>
                <div className="home-starting">
                    <h1 className='quen1'>
                    <span>Do</span> <span>you</span> <span>love</span> <span>to</span> <span>cook?</span>
                    </h1>
                <div className="filters">
                    {/* <RecipeFilter/> */}
                    {/* <CFavorite/>
                    <Chef/>              */}
                   
                    <Recipes/>
                    <div className="recipeContent">
                <p><span>More </span> <span>than </span> <span>500+ </span><span>Recipes</span></p>
            </div>
        
                <p><a href='/recipes'>See More</a></p>
                <Favorite/>            
                <Chef/> 
                   
                    <AboutUs/>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                </div>
                </div>
            </div>
            <Footer/>
        </div>
        </>

    )
}
export default CHome