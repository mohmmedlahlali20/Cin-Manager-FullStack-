import { Outlet } from "react-router-dom";
import SidBar from "./SidBar";
import Footer from "./footer";



export default function Layouts() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidBar />
            <div className="flex flex-col justify-between flex-grow bg-white shadow-md">
            <main className="flex-grow p-6 md:p-8">
                <Outlet />
            </main>
            </div>
            <Footer />
        </div>
    )
}
