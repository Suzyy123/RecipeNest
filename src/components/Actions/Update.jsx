import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/Authentication';
import '../../css/Actions/UpdateFoodlover.css'; // Your custom CSS

const FoodLoverUpdate = () => {
  const { user, token, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    user?.imageUrl ? `http://localhost:5221${user.imageUrl}` : '/Suju.jpg'
  );

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append('Username', formData.username);
      data.append('Email', formData.email);
      if (file) {
        data.append('Image', file);
      }

      const response = await axios.put(`https://localhost:7031/api/FoodLovers/${user.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(response.data); // ✅ Update global user state
      localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Optional for reload safety
      alert("Profile updated!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="update-container">
      <div className="update-card">
        <h2 className="update-title">Update Your Profile 🍽️</h2>

        <div className="image-wrapper">
          <label htmlFor="fileUpload">
            <img
              src={previewUrl}
              alt="profile"
              className="profile-image"
              style={{ cursor: 'pointer' }}
              title="Click to change image"
            />
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="form-group">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="input-field"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="input-field"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="update-button"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default FoodLoverUpdate;
