import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { ResetPasswordApi } from "../services/loginApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!email || !newPassword || !confirmPassword) {
      setError('Please fill in all the fields');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const request = {
      email: email,
      newPassword: newPassword,
    };
    setError('');
    setLoading(true);

    try {
      const response = await ResetPasswordApi(request);
      if (response.success) {
        enqueueSnackbar("Password Reset Success", { variant: "success" });
        navigate("/login");
      } else {
        enqueueSnackbar("Password Reset Failed", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="email" name="email" placeholder="Email" className="border rounded-md py-2 px-3 w-full" />
          </div>
          <div className="mb-4">
            <input type="password" name="newPassword" placeholder="New Password" className="border rounded-md py-2 px-3 w-full" />
          </div>
          <div className="mb-4">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="border rounded-md py-2 px-3 w-full" />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            {loading ? 'Loading...' : 'Reset Password'}
          </button>
          <div className="mt-4 flex justify-end">
            <Link to="/" className="text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
