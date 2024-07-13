import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

const Login = () => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpGenerated, setOtpGenerated] = useState(false);
  const { login, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleGenerateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you should call an API to generate the OTP
    // For now, we're just setting the state to simulate OTP generation
    setOtpGenerated(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(mobileOrEmail, otp);
      if (data.id) {
        login(data.id); // Assuming the token is returned in data.token
        navigate('/'); // Navigate to the home page after login
      } else {
        console.error('No token returned from the server');
      }
    } catch (error) {
      console.error('Invalid OTP', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Render login form if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="mt-20 bg-gray-100 flex items-center justify-center">
        <form onSubmit={otpGenerated ? handleSubmit: handleGenerateOtp} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <div className="text-2xl mb-4 text-gray-800">Login</div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile or Email</label>
            <input
              type="text"
              value={mobileOrEmail}
              onChange={(e) => setMobileOrEmail(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          { otpGenerated && (<div className="mb-4">
            <label className="block text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>) }
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
            {otpGenerated ? 'Login' : 'Generate OTP'}
          </button>
        </form>
      </div>
    );
  }

  // Render logout button if user is authenticated
  return (
    <div className="mt-20 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <p className="text-2xl mb-4 text-gray-800 text-center">You are already logged in.</p>
        <div className="w-auto flex justify-center">
          <button className="flex rounded-md w-auto m-auto bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" onClick={()=> navigate('/')}>
            Home
          </button>
          <button className="flex rounded-md w-auto m-auto bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" onClick={handleLogout}>
            Logout
          </button>
          </div>
      </div>
    </div>
  );
};

export default Login;
