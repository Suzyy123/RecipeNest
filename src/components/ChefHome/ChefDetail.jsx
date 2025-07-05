import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/chefDash/Profile.css';
import Liked from '../ProfileTabs/Liked';
import Favorite from '../ProfileTabs/Favorite';
import FilterChefRecipe from '../ProfileTabs/Chef/FilterRecipe';

const ChefDetail = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [activeTab, setActiveTab] = useState('recipes');

  const fetchChef = async () => {
    try {
      const response = await axios.get(`http://localhost:5221/api/Chef/${id}`);
      setChef(response.data);
    } catch (error) {
      console.error("Error fetching chef:", error);
    }
  };

  useEffect(() => {
    fetchChef();
  }, [id]);

  if (!chef) return <p>Loading chef...</p>;

  const imageUrl = chef.imageUrl
    ? `http://localhost:5221${chef.imageUrl}`
    : '/default-chef.png';

  return (
    <div>
      <div className="profileContainer">
        <div className="profileContent">
          <div className="imgProfile">
            <img src={imageUrl} alt={chef.username} />
          </div>

          <div className="name">
            {chef.username}
          </div>

          <div className="pButtons">
            <button>Follow</button>
            <button>Message</button>
          </div>

          <div className="description">
            <p><strong>Email:</strong> {chef.email}</p>
            <p><strong>Role:</strong> {chef.role}</p>
            <p><strong>Joined:</strong> {new Date(chef.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-header">
          <button className={activeTab === 'recipes' ? 'active' : ''} onClick={() => setActiveTab('recipes')}>Recipes</button>
          <button className={activeTab === 'liked' ? 'active' : ''} onClick={() => setActiveTab('liked')}>Liked</button>
          <button className={activeTab === 'favorite' ? 'active' : ''} onClick={() => setActiveTab('favorite')}>Favorite</button>
        </div>
        <hr className='divider' />
        <div className="tab-content">
          {activeTab === 'recipes' && <FilterChefRecipe chefId={chef.id} />}
          {activeTab === 'liked' && <Liked chefId={chef.id} />}
          {activeTab === 'favorite' && <Favorite chefId={chef.id} />}
        </div>
      </div>
    </div>
  );
};

export default ChefDetail;