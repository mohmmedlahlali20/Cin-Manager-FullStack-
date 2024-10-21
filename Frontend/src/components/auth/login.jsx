import { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import LogoSvg from "../logo/LogoSvg";
import Svg1 from '../logo/Svg1';

function Login() {
    const path = import.meta.env.VITE_BACK_END_URI;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setError(null);
        if (e.target.name === 'email') setEmail(e.target.value);
        if (e.target.name === 'password') setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${path}/auth/login`, { email, password });
            const token = response.data.user.token;

            if (token) {
                Cookies.set('token', token);
                const user = jwtDecode(token);

                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/movies');
                }
            } else {
                setError('No token found. Please try logging in again.');
            }
        } catch (error) {
            setError(error.response?.data?.msg || 'An error occurred during login.');
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const user = jwtDecode(token);
                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/movies');
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setError('Invalid token. Please log in again.');
            }
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-red-500">
            <div className="hidden lg:block">
                <Svg1 />
            </div>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <LogoSvg />
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center justify-around mt-6 text-sm text-gray-600">
                    <Link to="/forgot-password" className="mb-2 hover:underline">Forgot Password?</Link>
                    <Link to="/register" className="mb-2 hover:underline">Create an Account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
