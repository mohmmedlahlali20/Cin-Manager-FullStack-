import { Outlet } from "react-router-dom";
import Sidebar from "./SidBar";
import Footer from "./footer";
import ProtectedRoute from "../routes/protected.routes";



export default function Layouts() {
    return (
        <ProtectedRoute>
        <div className="flex min-h-screen bg-gray-900">
            <Sidebar />
            <div className="flex flex-col justify-between flex-grow  shadow-lg rounded-l-lg overflow-hidden">
                <main className="flex-grow p-6 md:p-8">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    </ProtectedRoute>
    

    )
}
