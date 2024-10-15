import { Outlet } from "react-router-dom";
import Sidebar from "./SidBar";
import Footer from "./footer";



export default function Layouts() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col justify-between flex-grow bg-white shadow-md">
            <main className="flex-grow p-6 md:p-8">
                <Outlet />
            </main>
            <Footer />
            </div>
        </div>
    )
}
