
export default function Dashboard() {


    return (
        <div className="min-h-screen p-6 ">
            <h1 className="text-3xl font-semibold text-center text-teal-800 text-bold">Dashboard Admin</h1>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                <div className="p-4 bg-teal-300 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                    <p className="text-3xl font-bold text-gray-900"></p>
                </div>

                <div className="p-4 bg-teal-300 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Total Movies</h2>
                    <p className="text-3xl font-bold text-gray-900"></p>
                </div>

                <div className="p-4 bg-teal-300 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Total Bookings</h2>
                    <p className="text-3xl font-bold text-gray-900"></p>
                </div>
            </div>

         

        </div>
    );
}
