import React from 'react';
import { FaFacebook, FaGithub, FaTiktok, FaTwitter } from 'react-icons/fa';
import '../../css/home1css/Footer.css'
const Footer = () =>{
    return(
        <>
        <div className="footercontent">
            <div className="footer-top">
                <h1 className='heading'>RecipeNest    
                </h1>      
                <p>Join RecipeNest now and embark on a culinary journey 
                to explore, create, and savor amazing recipes!</p>
            </div>
            <div className="footer-right">
                <div className="company">
                    <h1>Company</h1>
                    <p>Home</p>
                    <p>About Us</p>
                    <p>Recipes</p>
                    <p>Chefs</p>
                </div>
                <div className="Recipes">
                    <h1>Recipes</h1>
                    <p>Main Courses</p>
                    <p>International</p>
                    <p>Deserts and Sweets</p>
                    <p>Appetizers</p>
                    <p>Explore more</p>
                </div>
                <div className="contact">
                    <h1>Contact</h1>
                    <p>Instagram</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Tiktok</p>
                </div>
            </div>
            <div className="followus">
                <ul className='followlist'>
                    <li>Follow us on: </li>
                    <li><FaGithub/></li>
                    <li><FaFacebook/></li>
                    <li><FaTwitter/></li>
                    <li><FaTiktok/></li>
                </ul>
            </div>
        </div>
  
        </>
    )
}
export default Footer;