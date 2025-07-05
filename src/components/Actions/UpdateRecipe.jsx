import React, { useEffect, useState } from 'react';
import '../../css/ChefDash/Addrecipe.css';
import { FiEdit2 } from 'react-icons/fi';
import { FaDeleteLeft, FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRecipe = () => {
  const { id } = useParams(); // recipeId
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [imagePreview, setImagePreview] = useState(null);
  const handleDelete = async (id, e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirm) return;
  
    try {
      await axios.delete(`https://localhost:7031/api/Recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Recipe deleted!");
      navigate("/CProfile");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete recipe.");
    }
  };
  // 🔁 Fetch existing recipe
  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`https://localhost:7031/api/Recipe/${id}`);
      const recipe = res.data;

      setImagePreview(`http://localhost:5221${recipe.imageUrl}`);
      setValues({
        title: recipe.title || '',
        description: recipe.description || '',
        cuisineType: recipe.cuisineType || '',
        prepTime: recipe.prepTime || '',
        cookTime: recipe.cookTime || '',
        foodType: recipe.foodType || '',
        ingredients: recipe.ingredient?.split(', ') || [''],
        instructions: recipe.instruction?.split('\n') || [''],
        nutrition: recipe.nutrition?.split('\n') || [''],
        image: null
      });
    } catch (err) {
      console.error("Failed to load recipe", err);
    }
  };

  // 🔄 Submit updated recipe
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
      if (values.image) formData.append("Image", values.image);

      await axios.put(`https://localhost:7031/api/Recipe/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      alert("Recipe updated!");
      navigate("/CProfile");
    } catch (err) {
      console.error("Failed to update recipe", err);
      alert("Failed to update recipe");
    }
  };

  const {
    values, handleChange, handleBlur, handleSubmit, setValues
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

  // 🔁 Add/Remove for dynamic fields
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

  // 📸 Image file & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValues(prev => ({ ...prev, image: file }));
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className="Addrecipe">
      <h1>Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="left-column">
            <label>Title:</label>
            <input type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />

            <label>Description:</label>
            <input type="text" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />

            <label>Cuisine Type:</label>
            <input type="text" name="cuisineType" value={values.cuisineType} onChange={handleChange} onBlur={handleBlur} />
          </div>

          <div className="right-column">
            <label>Preparation Time:</label>
            <input type="text" name="prepTime" value={values.prepTime} onChange={handleChange} onBlur={handleBlur} />

            <label>Cook Time:</label>
            <input type="text" name="cookTime" value={values.cookTime} onChange={handleChange} onBlur={handleBlur} />

            <label>Food Type:</label>
            <input type="text" name="foodType" value={values.foodType} onChange={handleChange} onBlur={handleBlur} />
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

        {/* Dynamic Field Groups */}
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
                <button onClick={(e) => { e.preventDefault(); handleRemoveField(field, index); }} className="delete-btn"><FaDeleteLeft /></button>
                {index === values[field].length - 1 && (
                  <button onClick={(e) => { e.preventDefault(); handleAddField(field); }} className="add-btn"><FaPlus /></button>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="add-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={(e) => handleDelete(id, e)}>Delete</button>
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipe;
