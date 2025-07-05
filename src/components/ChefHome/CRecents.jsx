import React from 'react';
import '../../css/home1css/Recipe.css';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
const CRecents= () => {
    return (
        <div className="recipes">
              <div className="recipeContent">
                <p><span>More </span> <span>than </span> <span>500+ </span><span>Recipes</span></p>
            </div>
            <div className="exploreMore">
                <p><a href='/recipes'>See More</a></p>
             </div>
            <div className="card-container">
                {/* 1 */}
                <div className="card">
                <img src="src/assets/Recipes/spagetti.png" className="card-img-top" alt="..." />
                <div className="card-body">
                
                    <h5 className="card-title">Royal Spagetti</h5>
                    <a href="#" className="btn btn-primary">
                    View Full Recipe
                    <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color: 'orange' }} />
                    </a>
                </div>
                </div>
                {/* 2 */}
                <div className="card">
                    <img src="src/assets/Recipes/spagetti.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Burger</h5>
                        <a href="#" className="btn btn-primary">View Full Recipe
                          <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color:'orange' }} />
                        </a>
                    </div>
                </div>
                {/* 3 */}
                <div className="card">
                    <img src="src/assets/Recipes/spagetti.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Spagett</h5>   
                        <a href="#" className="btn btn-primary">View Full Recipe
                          <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color:'orange' }} />
                        </a>
                    </div>
                </div>
                {/* 4 */}
                <div className="card">
                    <img src="src/assets/Recipes/spagetti.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Spagett</h5>  
                        <a href="#" className="btn btn-primary">View Full Recipe
                          <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color:'orange' }} />
                        </a>
                    </div>
                </div>
                {/* 5 */}
                <div className="card">
                    <img src="src/assets/Recipes/spagetti.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Spagett</h5>  
                        <a href="#" className="btn btn-primary">View Full Recipe
                          <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color:'orange' }} />
                        </a>
                    </div>
                </div>
                {/* 6 */}
                <div className="card">
                    <img src="src/assets/Recipes/spagetti.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Spagett</h5>
                        <a href="#" className="btn btn-primary">View Full Recipe
                          <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color:'orange' }} />
                        </a>
                    </div>
                </div>
               </div>
        </div>
    );
};
export default CRecents
