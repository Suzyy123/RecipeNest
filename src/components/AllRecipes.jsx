import React, { useEffect, useState } from 'react';
import Footer from './home1/Footer';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import RecipeFilter from './home1/RecipeFilter';
import SearchChef from './Search/Search';
import axios from 'axios';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5221/api/Recipe/allrecipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <div className="recipe-content">
        <SearchChef />
        <div className="recipebg">
          <img src="src/assets/Chefs/AllChef.png" alt="recipeImage" className='recipebgImg' />
        </div>
        <h1 className='recipeHeading'><span>Explore </span><span>Recipe</span></h1>
        <div className="recipeContent">
          <p><span>More </span> <span>than </span> <span>500+ </span><span>Recipes</span></p>
        </div>
        <RecipeFilter />

        <div className="recipeList">
          <div className="card-container">
            {recipes.length === 0 ? (
              <p>No recipes found.</p>
            ) : (
              recipes.map((recipe, index) => (
                <div key={index} className="card">
                  <img
                    src={`http://localhost:5221${recipe.imageUrl || '/default-image.png'}`}
                    className="card-img-top"
                    alt={recipe.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <a href={`/viewRecipe/${recipe.recipeId}`} className="btn btn-primary">
                      View Full Recipe
                      <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color: 'orange' }} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          <br /><br /><br /><br /><br /><br />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AllRecipes;
