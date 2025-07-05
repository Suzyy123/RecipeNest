import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/Recipes/RecipeDetail.css';
import {
  FaCommentDots, FaDrumstickBite, FaFire, FaHeart,
  FaHourglassStart, FaShareAlt, FaStar, FaThumbsUp, FaUtensils
} from 'react-icons/fa';

const RecipeDetail = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [commented, setCommented] = useState(false);
  const [shared, setShared] = useState(false);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0); // ✅ new
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5221/api/Recipe/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };
//for chef photo
  const fetchChef = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Chef`);
      const allChefs = res.data;
      const matchedChef = allChefs.find(c => c.id === recipe.chefId);
      setChef(matchedChef);
    } catch (error) {
      console.error("Error fetching chef info:", error);
    }
  };
  
  // 🔄 Like Count
  const fetchLikeCount = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Like/Count/${id}`);
      setLikeCount(res.data.likes);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  // 🔄 Favorite Count
  const fetchFavoriteCount = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Favorite/Count/${id}`);
      setFavoriteCount(res.data.favorites);
    } catch (error) {
      console.error("Error fetching favorite count:", error);
    }
  };

  //Check if already favorited
  const fetchFavoriteStatus = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Favorite/IsFavorited/${id}`, config);
      setFavorited(res.data.favorited);
    } catch (error) {
      console.error("Error checking favorite status", error);
    }
  };

  // Check if already liked
  const fetchLikeStatus = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Like/IsLiked/${id}`, config);
      setLiked(res.data.liked);
    } catch (error) {
      console.error("Error checking like status", error);
    }
  };

  // Get user rating
  const fetchUserRating = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Rate/User/${id}`, config);
      setUserRating(res.data.stars);
      setRating(res.data.stars);
    } catch (error) {
      console.error("Error fetching user rating:", error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Rate/Average/${id}`);
      setAverageRating(res.data.average);
      setRatingCount(res.data.count); // ✅ save count
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };
  

  // ✅ Like Toggle
  const handleLike = async () => {
    try {
      await axios.post(`https://localhost:7031/api/Like/Toggle/${id}`, null, config);
      setLiked(prev => !prev);
      await fetchLikeCount();
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  // ✅ Favorite Toggle
  const handleFavorite = async () => {
    try {
      await axios.post(`https://localhost:7031/api/Favorite/Toggle/${id}`, null, config);
      setFavorited(prev => !prev);
      await fetchFavoriteCount();
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  const handleUpdate = () =>{
    navigate("/UpdateRecipe/:id")
  }
  const submitRating = async (value) => {
    try {
      setRating(value);
      await axios.post(
        `https://localhost:7031/api/Rate/${id}`,
        JSON.stringify(value), // convert to JSON
        {
          ...config,
          headers: {
            ...config.headers,
            'Content-Type': 'application/json' // tell server it's JSON
          }
        }
      );
      setUserRating(value);
      await fetchAverageRating();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };
  

  // 🔁 Initial Load
  useEffect(() => {
    fetchRecipe();
    fetchLikeCount();
    fetchFavoriteCount();
    fetchAverageRating();
    if (token) {
      fetchFavoriteStatus();
      fetchLikeStatus();
      fetchUserRating();
    }
  }, [id]);
  
  // Fetch Chef Info after recipe is loaded
  useEffect(() => {
    if (recipe) {
      fetchChef();
    }
  }, [recipe]);
  

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="recipe-detail">
      <div className="heading">
        <img
          src={`http://localhost:5221${recipe.imageUrl}`}
          alt={recipe.title}
          className="detailImage"
        />
        <div className="textColumn">       
        <div className="title-rating-row">
  <h1 className="detailHeading">{recipe.title}</h1>
  <div className="simple-rating">
    <div className="star-section">
      <p><strong>Your Rating:</strong></p>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          onClick={() => submitRating(star)}
          color={star <= rating ? 'gold' : '#ccc'}
          style={{ cursor: 'pointer', marginRight: 5 }}
        />
      ))}
    </div>
    <div className="average-section">
      <p>
        <strong>Average Rating:</strong> {averageRating} / 5
      </p>
      <span style={{ fontSize: '14px', color: '#555' }}>
        Rated by {ratingCount} {ratingCount === 1 ? "user" : "users"}
      </span>
    </div>
  </div>



          </div> 
          {/* <p className="desc"><strong>Description:</strong> {recipe.description}</p> */}

          {/* Interaction Icons */}
          <ul className="interaction-list">
           <li className='interaction'
              onClick={handleLike}
              style={{ color: liked ? 'red' : '#555', cursor: 'pointer' }}
            >
              {likeCount} <FaThumbsUp />
            </li>

            <li className='interaction'
              onClick={handleFavorite}
              style={{ color: favorited ? 'red' : '#555', cursor: 'pointer' }}
            >
              {favoriteCount} <FaHeart />
            </li>

             <li className='interaction'
              onClick={() => setCommented(!commented)}
              style={{ color: commented ? 'orangered' : '#555' }}
            >
              <FaCommentDots />
            </li>

             <li className='interaction'
              onClick={() => setShared(!shared)}
              style={{ color: shared ? 'orangered' : '#555' }}
            >
              <FaShareAlt />
            </li>
          </ul>

          {/* Chef Info */}
          <div className="chef-photo">
        {chef ? (
          <div className="chef">
            Recipe by:
            <img
              src={`http://localhost:5221${chef.imageUrl}`}
              alt={chef.username}
              className="by-chef"
            />
          </div>
        ) : (
          <div className="chef">
            <p>Loading chef info...</p>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="highlights">
        <p><strong><FaUtensils style={{ marginRight: '6px', color: 'orangered' }} /> Cuisine:</strong> {recipe.cuisineType}</p>
        <p><strong><FaHourglassStart style={{ marginRight: '6px', color: 'orangered' }} /> Preparation Time:</strong> {recipe.prepTime}</p>
        <p><strong><FaFire style={{ marginRight: '6px', color: 'orangered' }} /> Cook Time:</strong> {recipe.cookTime}</p>
        <p><strong><FaDrumstickBite style={{ marginRight: '6px', color: 'orangered' }} /> Food Type:</strong> {recipe.foodType}</p>
      </div>

    {/* Ingredients */}
<div className="ing">
  <p><strong>Ingredients:</strong></p>
  <ul>
    {recipe.ingredient?.split(',').map((item, index) => (
      <li key={index}>{index + 1}. {item.trim()}</li>
    ))}
  </ul>
</div>

{/* Instructions */}
<div className="ins">
  <p><strong>Instructions:</strong></p>
  <ul>
    {recipe.instruction?.split('\n').map((step, index) => (
      <li key={index}>{index + 1}. {step.trim()}</li>
    ))}
  </ul>
</div>

{/* Nutrition Info */}
<div className="nut">
  <p><strong>Nutrition Info:</strong></p>
  <ul>
    {recipe.nutrition?.split('\n').map((line, index) => (
      <li key={index}>{line.trim()}</li>
    ))}
  </ul>
</div>

    </div>
  );
};

export default RecipeDetail;
