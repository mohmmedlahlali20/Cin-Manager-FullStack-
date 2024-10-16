/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoSvg from '../logo/LogoSvg';
import Svg1 from '../logo/Svg1';
import axios from 'axios';

function Register() {
  const path = import.meta.env.VITE_BACK_END_URI;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate('')

  const hundelRegister = async (e) => {
    e.preventDefault();

      try {
        const userData = {
          firstname: firstName, 
          lastname: lastName, 
          email,
          password,
          dateOfBirth,
          avatar:  null, 
        };
        const response = await axios.post(`${path}/auth/register`, userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        navigate('/login')
      
        console.log(response.data);
      } catch (error) {
        console.log(error.response?.data);
        setError(error.message);
      }
  };

 

  return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5 bg-gradient-to-r from-blue-500 to-purple-600 sm:px-4 md:flex-row md:px-10">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-8">
            <LogoSvg />
          </div>
          <form onSubmit={hundelRegister} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-semibold text-gray-700">
                  Birthday
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="confirmPassword"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="avatar" className="block mb-2 text-sm font-semibold text-gray-700">
                Avatar
              </label>
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                id="avatar"
                accept="image/*"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Register
            </button>
          </form>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
            <Link to="/login" className="hover:underline">
              Already have an Account? Login
            </Link>
          </div>
        </div>

          <Svg1 />
      
      </div>

  );
}

export default Register;
