import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../home1/Footer';
import '../../css/home1css/Chef.css';

const ShowFoodLovers = () => {
  const [foodLovers, setFoodLovers] = useState([]);

  const fetchFoodLovers = async () => {
    try {
      const response = await axios.get("http://localhost:5221/api/FoodLovers");
      setFoodLovers(response.data);
    } catch (error) {
      console.error("Failed to fetch food lovers:", error);
    }
  };

  useEffect(() => {
    fetchFoodLovers();
  }, []);

  return (
    <>
      <div className="foodlover-content">
        <br /><br /><br /><br /><br /><br /><br /><br />
        <h1 className='foodloverHeading'>
          <span>Our </span><span>Food Lovers</span>
        </h1>

        <div className="foodloverList">
          <div className="card-container">
            {foodLovers.length === 0 ? (
              <p>No food lovers found.</p>
            ) : (
              foodLovers.map((lover, index) => (
                <div key={index} className="card">
                  <img
                    src={`http://localhost:5221/${lover.imageUrl || 'default-avatar.png'}`}
                    className="card-img-top"
                    alt={lover.username}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{lover.username}</h5>
                    <p>{lover.email}</p>
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

export default ShowFoodLovers;
