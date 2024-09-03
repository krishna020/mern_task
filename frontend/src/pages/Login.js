import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../features/authSlice';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }

    dispatch(loginRequest()); // Dispatch request action

    try {
      const url = 'http://localhost:8080/api/v1/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        dispatch(loginSuccess({ jwtToken, name })); // Dispatch success action
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        const details = error?.details?.[0]?.message || message;
        handleError(details);
        dispatch(loginFailure(details)); // Dispatch failure action
      }
    } catch (err) {
      handleError('An unexpected error occurred');
      dispatch(loginFailure('An unexpected error occurred')); // Dispatch failure action
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={loginInfo.password}
          />
        </div>
        <button type='submit'>Login</button>
        <span>Doesn't have an account?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
