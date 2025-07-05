import React, { useContext, useEffect, useState } from 'react';
import { TbChefHat } from 'react-icons/tb';
import axios from 'axios';
import { AuthContext } from '../Auth/Authentication';
const Chef = () => {
  const [chefs, setChefs] = useState([]);
  const { token } = useContext(AuthContext);
  const fetchChefs = async () => {
    try {
      const response = await axios.get("http://localhost:5221/api/Chef");
      setChefs(response.data);
    } catch (error) {
      console.error("Failed to fetch chefs:", error);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  return (
    <div className="chefs">
      <div className="card-container">
        {chefs.map((chef, index) => (
          <div key={index} className="card">
            <img
              src={`http://localhost:5221${chef.imageUrl || '/default-chef.png'}`}
              className="card-img-top"
              alt={chef.username}
            />
            <div className="card-body">
              <h5 className="card-title">{chef.username}</h5>
              <a href={`/viewChefDetail/${chef.id}`} className="btn btn-primary">
                View Chef
                <TbChefHat
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
        ))}
      </div>
    </div>
  );
};

export default Chef;
