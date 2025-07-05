import React from 'react';
import '../css/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useFormik } from 'formik';
import { RegisterSchema } from './Validations/Schemas';

const Register = () => {
  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
  
      // only if uploading image
      if (values.image) {
        formData.append("image", values.image);
      }
  
      const url =
        values.role === "chef"
          ? "http://localhost:5221/api/Chef"
          : "http://localhost:5221/api/FoodLovers";
  
      await axios.post(url, formData); // no need to set headers manually
  
      alert("Account registered successfully!");
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error("Registration error:", error.message);
      alert("Failed to register");
    }
  };
  
  const { values, handleChange, handleSubmit, handleBlur, setFieldValue, errors, touched } =
    useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        image: null,
      },
      validationSchema: RegisterSchema,
      onSubmit,
    });

  return (
    <div className='register-wrapper'>
      <img src='src/assets/Login.png' alt='background' className='registerImage' />

      <form className='register-form' onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Username */}
        <div className='input-group'>
          <label htmlFor='username'>Username:</label>
          <div className='input-icon-group'>
            <input id='username' type='text' value={values.username} onChange={handleChange} onBlur={handleBlur} placeholder='Enter username' />
            <FontAwesomeIcon icon={faUser} className='register-icon' />
          </div>
          {touched.username && errors.username && <div className="error">{errors.username}</div>}
        </div>

        {/* Email */}
        <div className='input-group'>
          <label htmlFor='email'>Email:</label>
          <div className='input-icon-group'>
            <input id='email' type='email' value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='Enter email' />
            <FontAwesomeIcon icon={faEnvelope} className='register-icon' />
          </div>
          {touched.email && errors.email && <div className="error">{errors.email}</div>}
        </div>

        {/* Role Selection */}
        <div className='input-group role-wrapper'>
          <label>Role:</label>
          <div className='input-radio-group'>
            <label>
              <input type='radio' name='role' value='chef' checked={values.role === 'chef'} onChange={handleChange} />
              Chef
            </label>
            <label>
              <input type='radio' name='role' value='foodlover' checked={values.role === 'foodlover'} onChange={handleChange} />
              Food Lover
            </label>
          </div>
          {touched.role && errors.role && <div className="error">{errors.role}</div>}
        </div>
        {/* Image Upload (optional) */}
        <div className='input-group'>
          <label htmlFor='image'>Upload Profile Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) =>
              setFieldValue("image", event.currentTarget.files[0])
            }            
          />
        </div>
        {/* Password */}
        <div className='input-group'>
          <label htmlFor='password'>Password:</label>
          <div className='input-icon-group'>
            <input id='password' type='password' value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder='Enter password' />
            <FontAwesomeIcon icon={faLock} className='register-icon' />
          </div>
          {touched.password && errors.password && <div className="error">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className='input-group'>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <div className='input-icon-group'>
            <input id='confirmPassword' type='password' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder='Confirm password' />
            <FontAwesomeIcon icon={faLock} className='register-icon' />
          </div>
          {touched.confirmPassword && errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
        <button type='submit' className='btn-register'>Register</button>
        <div className='login-link'>
          Already have an account? <a href='/login'>Sign in</a>
          <br /><br /><br />
          OR
        <hr />
       <p> Register with</p>
        </div>
       
        <div className='social-register'>
          <img src='src/assets/facebook.webp' alt='Facebook' />
          <img src='src/assets/google.png' alt='Google' />
          <img src='src/assets/twitter.png' alt='Twitter' />
        </div>
      </form>
    </div>
  );
};

export default Register;
