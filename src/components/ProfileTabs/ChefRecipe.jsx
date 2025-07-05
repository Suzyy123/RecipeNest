import React, { useEffect, useState, useContext } from 'react';
import '../../css/home1css/Recipe.css';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/Authentication';


const ChefRecipe = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // ✅ use token from context
  const [recipes, setRecipes] = useState([]);

  const AddRecipe = () => {
    navigate("/addrecipe");
  };

  const fetchRecipes = async () => {
    console.log("Fetching my recipes with token:", token);
  
    try {
      const response = await axios.get("https://localhost:7031/api/Recipe/myrecipes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log("Fetched recipes:", response.data);
      setRecipes(response.data);
    } catch (error) {
      // alert("Failed to fetch your recipes");
      console.error("Fetch error:", error);
    }
  };
  
  useEffect(() => {
    if (token) {
      fetchRecipes();
    }
  }, [token]);

  return (
    <div className="recipes">
      <div className="card-container">
        <div className="card add-card" onClick={AddRecipe}>
          <div className="card-body">
            <h1 className="text-center text-xl font-bold">
              Add New Recipe
              <br /><br /><br />
              <FaPlus className="mx-auto text-4xl text-green-500" />
            </h1>
          </div>
        </div>

        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe, index) => (
            <div key={index} className="card">
              <img
                src={`http://localhost:5221${recipe.imageUrl}`}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <a href={`/UpdateRecipe/${recipe.recipeId}`} className="btn btn-primary">
                  View Full Recipe
                  <MdOutlineRestaurantMenu
                    style={{
                      fontSize: '20px',
                      marginLeft: '60px',
                      padding: '2px',
                      color: 'orange'
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

export default ChefRecipe;
