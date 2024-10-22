import { Link } from "react-router-dom";

const Authorization = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-lg text-gray-700 mb-6">
                    You do not have the necessary permissions to access this page.
                </p>
                <Link
                    to="/"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Authorization;