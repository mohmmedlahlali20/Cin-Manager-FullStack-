
function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-4">
                The page you&lsquo;re looking for doesn&lsquo;t exist. Please check the URL and try again.
            </p>
            <p className="text-gray-500">
                If you think this is a mistake, please contact support.
            </p>
            <a href="/" className="mt-6 text-blue-600 hover:underline">
                Back to Home
            </a>
        </div>
    );
}

export default NotFound;