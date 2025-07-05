import React from 'react';
import '../../css/home1css/RecipeFilter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faUtensils, faSeedling, faIceCream, faPlateWheat, faBowlRice, faEarthAsia, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const RecipeFilter = () => {
  return (
    <div>
      <ul className='filters'>
        <li className='f1'>
          <a href="">
            <FontAwesomeIcon className='icon-filter' icon={faBowlFood} style={{ color: "#FFD43B" }} /> 
            All Types
          </a>
        </li>

        <li className='f1'>
          <a href="">
            <FontAwesomeIcon className='icon-filter' icon={faUtensils} style={{ color: "#FFD43B" }} />
             Appetizers
          </a>
        </li>
        <li className='f1'><a href="">
        <FontAwesomeIcon className='icon-filter' icon= {faPlateWheat} style={{color: "#FFD43B",}} />
            Main Courses</a></li>
        <li className='f1'><a href="">
        <FontAwesomeIcon className='icon-filter' icon={faBowlRice} style={{color: "#FFD43B",}} />
            Vegetarian Delights</a></li>
        <li className='f1'><a href="">
        <FontAwesomeIcon className='icon-filter' icon={faEarthAsia} style={{color: "#FFD43B",}} />
            International Flavors</a></li>
        <li className='f1'><a href="">
        <FontAwesomeIcon className='icon-filter' icon= {faSeedling} style={{color: "#FFD43B",}} />
            Vegan Foods</a></li>
        <li className='f1'><a href="">
        <FontAwesomeIcon className='icon-filter' icon={faIceCream} style={{color: "#FFD43B",}} />
            Desserts and Sweets</a></li>
        <li className='f1'><a href="">
        <FontAwesomeIcon className='icon-filter' icon={faMagnifyingGlass} style={{color: "#FFD43B",}} />
            Explore More</a></li>

      </ul>
    </div>
  );
};

export default RecipeFilter;
