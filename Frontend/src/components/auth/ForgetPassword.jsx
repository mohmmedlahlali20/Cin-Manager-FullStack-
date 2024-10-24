import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const path = import.meta.env.VITE_BACK_END_URI;
            const response = await axios.post(`${path}/auth/forget-password`, { email });

            setEmail('');
            Swal.fire('Success', 'email Send Success', 'success');

        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
            Swal.fire('Warning', 'This email dosn\'t exist.', 'warning');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-teal-500 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">Forgot Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;