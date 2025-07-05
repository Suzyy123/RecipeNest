import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MdOutlineRestaurantMenu } from 'react-icons/md';
import axios from 'axios';

const FilterChefRecipe = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);

  const fetchChefRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:5221/api/Recipe/chef/${id}`);
      setRecipes(response.data);
    } catch (error) {
      console.error("Failed to fetch chef's recipes:", error);
    }
  };

  useEffect(() => {
    fetchChefRecipes();
  }, [id]);

  return (
    <div className="recipes">
      <h2 className='chef-heading'>Recipes by Chef</h2>
      <div className="card-container">
        {recipes.length === 0 ? (
          <p>No recipes found for this chef.</p>
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
                <a href={`/viewRecipe/${recipe.recipeId}`} className="btn btn-primary">
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

export default FilterChefRecipe;