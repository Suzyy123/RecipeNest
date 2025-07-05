import React, { useEffect, useState } from 'react';
import { TbChefHat } from 'react-icons/tb';
import '../css/home1css/Chef.css';
import Footer from './home1/Footer';
import SearchChef from './Search/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllChef = () => {
  const [chefs, setChefs] = useState([]);
  const navigate = useNavigate();

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
    <>
      <div className="allchef-content">
        <SearchChef />
        <div className="chefbackground">
          <img src="src/assets/Chefs/AllChef.png" alt="chefbackground" className="chefbackgroundimg" />
        </div>
        <h1 className='recipeHeading'><span>Explore </span><span>Chefs</span></h1>
        <div className="recipeContent">
          <p><span>More </span> <span>than </span> <span>100+ </span><span>Chefs</span></p>
        </div>

        <div className="cheflist">
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
                    <TbChefHat style={{ fontSize: '20px', marginLeft: '60px', padding: '2px', color: 'orange' }} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <br /><br /><br /><br /><br /><br />
        <Footer />
      </div>
    </>
  );
};

export default AllChef;
