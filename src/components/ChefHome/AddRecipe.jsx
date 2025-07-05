import React, { useState } from 'react';
import '../../css/ChefDash/Addrecipe.css';
import { FiEdit2 } from 'react-icons/fi';
import { FaDeleteLeft, FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");
  const fetchRecipes = async () => {
    const token = localStorage.getItem("token");
    console.log("Fetching recipes with token:", token);
  
    try {
      const response = await axios.get("http://localhost:5221/api/Recipe/myrecipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Fetched recipes:", response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
      // alert("Failed to fetch recipes");
    }
  };
const handleUpdate = () =>{
  navigate("/UpdateRecipe/:id")
}

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("Title", values.title);
      formData.append("Description", values.description);
      formData.append("CuisineType", values.cuisineType);
      formData.append("PrepTime", values.prepTime);
      formData.append("CookTime", values.cookTime);
      formData.append("FoodType", values.foodType);
      formData.append("Ingredient", values.ingredients.join(", "));
      formData.append("Instruction", values.instructions.join("\n"));
      formData.append("Nutrition", values.nutrition.join("\n"));
      formData.append("Image", values.image);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      await axios.post("https://localhost:7031/api/Recipe/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Recipe added successfully!");
      fetchRecipes();
      navigate("/SubmittedRecipe");
  
    } catch (error) {
      alert("Failed to add recipe");
      console.error("Error adding recipe:", error.response?.data || error.message);
    }
  };
  

  const {
    values, handleChange, handleBlur, handleSubmit, setValues, touched, errors
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
      cuisineType: '',
      prepTime: '',
      cookTime: '',
      foodType: '',
      ingredients: [''],
      instructions: [''],
      nutrition: [''],
      image: null
    },
    onSubmit
  });

  const handleAddField = (fieldName) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }));
  };

  const handleRemoveField = (fieldName, index) => {
    if (values[fieldName].length > 1) {
      const updated = [...values[fieldName]];
      updated.splice(index, 1);
      setValues(prev => ({
        ...prev,
        [fieldName]: updated
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValues(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="Addrecipe">
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="left-column">
            <label>Title:</label>
            <input type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
            {touched.title && errors.title && <div className='error'>{errors.title}</div>}

            <label>Description:</label>
            <input type="text" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
            {touched.description && errors.description && <div className='error'>{errors.description}</div>}

            <label>Cuisine Type:</label>
            <input type="text" name="cuisineType" value={values.cuisineType} onChange={handleChange} onBlur={handleBlur} />
            {touched.cuisineType && errors.cuisineType && <div className='error'>{errors.cuisineType}</div>}
          </div>

          <div className="right-column">
            <label>Preparation Time:</label>
            <input type="text" name="prepTime" value={values.prepTime} onChange={handleChange} onBlur={handleBlur} />
            {touched.prepTime && errors.prepTime && <div className='error'>{errors.prepTime}</div>}

            <label>Cook Time:</label>
            <input type="text" name="cookTime" value={values.cookTime} onChange={handleChange} onBlur={handleBlur} />
            {touched.cookTime && errors.cookTime && <div className='error'>{errors.cookTime}</div>}

            <label>Food Type:</label>
            <input type="text" name="foodType" value={values.foodType} onChange={handleChange} onBlur={handleBlur} />
            {touched.foodType && errors.foodType && <div className='error'>{errors.foodType}</div>}
          </div>
        </div>

        {/* Image Upload */}
        <div className="image-upload-container">
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <label htmlFor="imageInput" className="edit-icon"><FiEdit2 /></label>
            </div>
          ) : (
            <label htmlFor="imageInput" className="upload-placeholder">Upload Image Here</label>
          )}
          <input type="file" name="image" id="imageInput" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Dynamic Fields */}
        {['ingredients', 'instructions', 'nutrition'].map((field) => (
          <div key={field} className={`${field}-group`} style={{ marginBottom: '20px' }}>
            <label className="block text-lg font-semibold mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            {values[field].map((item, index) => (
              <div key={index} className={`${field}-row`} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  name={`${field}[${index}]`}
                  value={item}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="dynamic"
                />
                <button onClick={(e) => { e.preventDefault(); handleRemoveField(field, index); }}
                  className="delete-btn"><FaDeleteLeft /></button>
                {index === values[field].length - 1 && (
                  <button onClick={(e) => { e.preventDefault(); handleAddField(field); }}
                    className="add-btn"><FaPlus /></button>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="add-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleUpdate}>Update Recipe</button>
        </div>
      </form>

      {/* Recipe Preview */}
      <div className="recipe-display">
        <h2>My Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <img src={`http://localhost:5221${recipe.imageUrl}`} alt="recipe" width="200" height="150" />
              <p><strong>Cuisine:</strong> {recipe.cuisineType}</p>
              <p><strong>Prep:</strong> {recipe.prepTime} | Cook: {recipe.cookTime}</p>
              <p><strong>Type:</strong> {recipe.foodType}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredient}</p>
              <p><strong>Instructions:</strong> {recipe.instruction}</p>
              <p><strong>Nutrition:</strong> {recipe.nutrition}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddRecipe;
