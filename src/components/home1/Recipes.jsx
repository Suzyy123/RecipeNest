import React, { useEffect, useState, useContext } from 'react';
// import '../../css/home1css/Recipe.css';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import axios from 'axios';
import { AuthContext } from '../Auth/Authentication';

const Recipes = () => {
  const { token } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("https://localhost:7031/api/Recipe/allrecipes");
      console.log("Fetched recipes:", response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch recipes");
    }
  };

  useEffect(() => {
    fetchRecipes(); 
  }, []);

  return (
    <div className="recipes">
      <div className="card-container">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe, index) => (
            <div key={index} className="card">
              <img
                src={`http://localhost:5221${recipe.imageUrl || ''}`}
                className="card-img-top"
                alt={recipe.title || 'Recipe'}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <a href={`/viewRecipe/${recipe.recipeId}`} className="btn btn-primary">
                  View Full Recipe
                  <MdOutlineRestaurantMenu
                    style={{
                      fontSize: '20px',
                      marginLeft: '60px',
                      padding: '2px',
                      color: 'orange',
                    }}
                  />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recipes;
