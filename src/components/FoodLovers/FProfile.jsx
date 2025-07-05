import React, { useState, useContext } from 'react';
import '../../css/chefDash/Profile.css';
import { FaShare, FaCog } from 'react-icons/fa';
import Liked from '../ProfileTabs/Liked';
import Favorite from '../ProfileTabs/Favorite';
import { AuthContext } from '../Auth/Authentication';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Fprofile = () => {
  const [activeTab, setActiveTab] = useState('liked');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) return <p>Loading user data...</p>;

  const imageUrl = user.imageUrl
    ? `http://localhost:5221${user.imageUrl}`
    : '/Suju.jpg';

  const Update = () =>{
    navigate("/UpdateFoodLover")
  }

    // const UpdateUser = async (updatedData) => {
    //   try {
    //     await axios.put(
    //       `https://localhost:7031/api/FoodLovers/${user.id}`, // 👈 replace with actual FoodLover ID
    //       updatedData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           'Content-Type': 'application/json'
    //         }
    //       }
    //     );
    //     alert("Profile updated successfully!");
    //   } catch (error) {
    //     console.error("Failed to update profile", error);
    //     alert("Error updating profile.");
    //   }
    // };
    
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
            <button onClick={Update}>Update</button>
            <button>Action</button>
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
          <button className={activeTab === 'liked' ? 'active' : ''} onClick={() => setActiveTab('liked')}>Liked</button>
          <button className={activeTab === 'favorite' ? 'active' : ''} onClick={() => setActiveTab('favorite')}>Favorite</button>
        </div>
        <hr className='divider'/>
        <div className="tab-content">
          {activeTab === 'liked' && <Liked />}
          {activeTab === 'favorite' && <Favorite />}
        </div>
      </div>
    </div>
  );
};

export default Fprofile;
