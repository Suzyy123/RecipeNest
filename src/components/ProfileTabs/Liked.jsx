import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../../css/home1css/Recipe.css';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaThumbsUp } from 'react-icons/fa';
import { AuthContext } from '../Auth/Authentication';

const Liked = () => {
  const { token } = useContext(AuthContext);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const fetchLikedRecipes = async () => {
    try {
      const response = await axios.get('https://localhost:7031/api/Like/MyLikes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLikedRecipes(response.data);
    } catch (error) {
      console.error("Error fetching liked recipes:", error);
    }
  };

  useEffect(() => {
    fetchLikedRecipes();
  }, []);

  return (
    <div className="recipes">
      <div className="card-container">
        {likedRecipes.map((recipe) => (
          <div className="card" key={recipe.recipeId}>
            <FaThumbsUp style={{ fontSize: '30px', marginLeft: '280px', color: 'red' }} />
            <img src={`http://localhost:5221${recipe.imageUrl}`} className="card-img-top" alt={recipe.title} />
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
              <a href={`/recipes/${recipe.recipeId}`} className="btn btn-primary">
                View Full Recipe
                <MdOutlineRestaurantMenu style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color: 'orange' }} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Liked;
