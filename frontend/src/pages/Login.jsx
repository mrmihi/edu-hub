import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../../services/AuthAPI';
import background from '../assests/background.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    if (!email || !password || !role) {
      setError('Email, Password and role are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid Email');
      return;
    }
    const request = {
      email: email,
      password: password,
      role: role,
    };
    setError('');
    setLoading(true);

    try {
      const response = await LoginApi(request);
      if (response.success) {
        enqueueSnackbar('Login Success', { variant: 'success' });
        if (role === 'learner') {
          navigate('/dashboard');
        } else if (role === 'instructor') {
          navigate('/instructor-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        }
      } else {
        enqueueSnackbar('Login Failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: url(`${background}`) }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="relative">
          <div className="mb-4 flex flex-col">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="border rounded-md p-2" />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="border rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" className="border rounded-md p-2">
              <option value="learner">Learner</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <br />
          <div className="flex justify-between mt-6">
            <Link to="/forgot-password" className="text-blue-500">
              Forgot password?
            </Link>
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
