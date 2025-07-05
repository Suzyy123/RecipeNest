import React from 'react';
import '../css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './Auth/Authentication';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from './Validations/Schemas';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5221/api/Login/Login", values);
      const { token, role, user } = response.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      login(token, user); // ✅ Update context

      alert("Login Successful");
      navigate("/home"); // ✅ Redirect all roles to /home
    } catch (error) {
      alert("Incorrect Email or Password");
      console.error("Login failed:", error);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit
  });

  return (
    <div className='login-wrapper'>
      <img src='src/assets/Login.png' alt='background-image' className='loginImage' />
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='email'>Email:</label>
          <div className='input-icon-group'>
            <input
              id='email'
              name='email'
              type='text'
              placeholder='Enter email'
              autoComplete='off'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FontAwesomeIcon icon={faUser} className='login-icon' />
          </div>
          {touched.email && errors.email && <div className='error'>{errors.email}</div>}
        </div>

        <div className='input-group'>
          <label htmlFor='password'>Password:</label>
          <div className='input-icon-group'>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Enter password'
              autoComplete='off'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FontAwesomeIcon icon={faLock} className='login-icon' />
          </div>
          {touched.password && errors.password && <div className='error'>{errors.password}</div>}
        </div>

        <button type='submit' className='btn-signin'>Sign in</button>

        <div className='register-link'>
          Don't have an account? <a href='/register'>Register Now</a>
          <h1 />
        OR
        <hr />
        Login With
        </div>
       

        <div className='social-login'>
          <img src='src/assets/facebook.webp' alt='Facebook' />
          <img src='src/assets/google.png' alt='Google' />
          <img src='src/assets/twitter.png' alt='Twitter' />
        </div>
      </form>
    </div>
  );
};

export default Login;
