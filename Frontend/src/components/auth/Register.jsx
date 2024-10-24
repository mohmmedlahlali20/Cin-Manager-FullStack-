/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoSvg from '../logo/LogoSvg';
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 sm:px-4 md:flex-row md:px-10">
    <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
            <LogoSvg />
        </div>
        <form onSubmit={hundelRegister} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm font-semibold text-teal-400">
                        First Name
                    </label>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-semibold text-teal-400">
                        Last Name
                    </label>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your last name"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-semibold text-teal-400">
                        Birthday
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-teal-400">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-semibold text-teal-400">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        className="w-full px-4 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-teal-400">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        id="confirmPassword"
                        className="w-full px-4 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Confirm your password"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="avatar" className="block mb-2 text-sm font-semibold text-teal-400">
                    Avatar
                </label>
                <input
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    id="avatar"
                    accept="image/*"
                    className="w-full px-4 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-200"
            >
                Register
            </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
            <Link to="/forgot_password" className="hover:underline hover:text-teal-400 transition duration-200">
                Forgot Password?
            </Link>
            <Link to="/login" className="hover:underline hover:text-teal-400 transition duration-200">
                Already have an Account? Login
            </Link>
        </div>
    </div>
</div>


  );
}

export default Register;
