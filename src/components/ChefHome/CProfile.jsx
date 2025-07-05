import React, { useState, useContext } from 'react';
import '../../css/chefDash/Profile.css';
import { FaShare, FaCog } from 'react-icons/fa';
import Liked from '../ProfileTabs/Liked';
import Favorite from '../ProfileTabs/Favorite';
import ChefRecipe from '../ProfileTabs/ChefRecipe';
import { AuthContext } from '../Auth/Authentication';
import { useNavigate } from 'react-router-dom';

const Cprofile = () => {
  const [activeTab, setActiveTab] = useState('recipe');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading user data...</p>;
  const Updatechef = () =>{
    navigate("/ChefUpdate");
  }
  const imageUrl = user.imageUrl
    ? `http://localhost:5221${user.imageUrl}`
    : '/Suju.jpg';

  return (
    <div>
      <div className="profileContainer">
        <div className="profileContent">
          <div className="imgProfile">
            <img src={imageUrl} alt="User" />
          </div>

          <div className="name">
            {user.username || 'Food Lover'}
          </div>

          <div className="pButtons">
            <button onClick={Updatechef} className='btnUpdate'>Update</button>
            <button className='btnAction'>Action</button>
            <FaCog style={{ fontSize: '30px', padding: '2px', color: 'orange' }} />
            <FaShare style={{ fontSize: '30px', padding: '2px', color: 'orange' }} />
          </div>

          <div className="description">
            <p>{user.bio || "No description available."}</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-header">
        <button className={activeTab === 'recipe' ? 'active' : ''} onClick={() => setActiveTab('recipe')}>Recipe</button>
        <button className={activeTab === 'favorite' ? 'active' : ''} onClick={() => setActiveTab('favorite')}>Favorite</button>
          <button className={activeTab === 'liked' ? 'active' : ''} onClick={() => setActiveTab('liked')}>Liked</button>
        </div>
        <hr className='divider'/>
        <div className="tab-content">
          {activeTab === 'recipe' && <ChefRecipe/>}
          {activeTab === 'liked' && <Liked />}
          {activeTab === 'favorite' && <Favorite />}
        </div>
      </div>
    </div>
  );
};

export default Cprofile;
