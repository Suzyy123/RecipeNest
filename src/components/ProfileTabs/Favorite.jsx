import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../../css/home1css/Recipe.css';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../Auth/Authentication';

const Favorite = () => {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('https://localhost:7031/api/Favorite/MyFavorites', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFavorites(res.data);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="recipes">
      <div className="card-container">
        {favorites.map((recipe) => (
          <div className="card" key={recipe.recipeId}>
            <FaHeart style={{ fontSize: '30px', marginLeft: '280px', color: 'red' }} />
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

export default Favorite;
