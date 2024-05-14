import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { SignupApi } from '../services/loginApi';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const nic = e.target.nic.value;
    const contact = e.target.contact.value;
    const password = e.target.password.value;

    if (!email || !password || !name || !nic || !contact) {
      setError('Please fill in all the fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid Email');
      return;
    }

    const passlen = password.length;
    if (passlen < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const contactlen = contact.length;
    if (contactlen !== 10) {
      setError('Contact number must be 10 characters');
      return;
    }

    const request = {
      name: name,
      role: role,
      email: email,
      nic: nic,
      contact: contact,
      password: password,
    };
    setError('');
    try {
      const response = await SignupApi(request);
      if (response.success) {
        enqueueSnackbar('Sign Up Success', { variant: 'success' });
        navigate('/');
      } else {
        enqueueSnackbar('Sign Up Failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="text" name="name" placeholder="Name" className="border rounded-md py-2 px-3 w-full" />
          </div>
          <div className="mb-4">
            <input type="email" name="email" placeholder="Email" className="border rounded-md py-2 px-3 w-full" />
          </div>
          <div className="mb-4">
            <input type="text" name="nic" placeholder="NIC" className="border rounded-md py-2 px-3 w-full" />
          </div>
          <div className="mb-4">
            <input type="text" name="contact" placeholder="Contact Number" className="border rounded-md py-2 px-3 w-full" />
          </div>
          <div className="mb-4">
            <input type="password" name="password" placeholder="Password" className="border rounded-md py-2 px-3 w-full" />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit"className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            Signup
          </button>
        </form>
        <div className="mt-4 flex justify-end">
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
