
export default function Dashboard() {


    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-semibold text-center text-gray-800 text-bold">Dashboard Admin</h1>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                    <p className="text-3xl font-bold text-gray-900"></p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Total Movies</h2>
                    <p className="text-3xl font-bold text-gray-900"></p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Total Bookings</h2>
                    <p className="text-3xl font-bold text-gray-900"></p>
                </div>
            </div>

         

        </div>
    );
}
