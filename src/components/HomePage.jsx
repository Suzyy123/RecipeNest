import React, { useContext, useEffect } from 'react';
import '../css/DefaultHome.css';
import RecipeFilter from './home1/RecipeFilter';
import Recipe from './home1/Recipes';
import Chef from './home1/Chefs';
import Footer from './home1/Footer';
import AboutUs from './home1/AboutUs';
import { AuthContext } from '../components/Auth/Authentication';
const DefaultHome = () => {
    const { user } = useContext(AuthContext);
    useEffect(() => {
        console.log("Decoded user from token:", user);
      }, [user]);
    return(
        <>
        <div className='home'>
            <div className="home-content">
                <img src='src/assets/HomePage.png' className='defaultHome'/>             
                    <h1 className='quen1'>
                    <span>Do</span> <span>you</span> <span>love</span> <span>to</span> <span>cook?</span>
                    </h1>
                    <RecipeFilter/>
                    <div className="section-header">
                <h1><span>Explore</span> <span className="highlight">Recipes</span></h1>
                <a href="/recipes" className="see-more">See More</a>
                </div>
                    <Recipe/>
                    <div className="section-header">
                <h1><span>Explore</span> <span className="highlight">Chefs</span></h1>
                <a href="/chefs" className="see-more">See More</a>
                </div>
                    <Chef/>  
                    <AboutUs/>  
                    <br /><br /><br /><br /><br /><br />             
            </div>
            <Footer/>
        </div>
        </>

    )
}
export default DefaultHome