import { useState } from "react";
import { FaHome, FaUser, FaPlane, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import TourAdmin from "./TourAdmin";
import UserAdmin from "./UserAdmin";
import ContactAdmin from "./ContactAdmin";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("tours");

    const renderContent = () => {
        switch (activeTab) {
            case "tours":
                return <TourAdmin />;
            case "users":
                return <UserAdmin />;
            case "contacts":
                return <ContactAdmin />;
            default:
                return <TourAdmin />;
        }
    };

    return (
        <div className="flex min-h-screen mt-3">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b rounded-t-2xl pt-6 from-blue-700 to-white text-white shadow-lg">
                {/* <div className="p-6 text-center text-2xl font-bold">Admin Panel</div> */}
                <nav className="flex flex-col space-y-2 px-4">
                    <button
                        onClick={() => setActiveTab("tours")}
                        className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 transition ${activeTab === "tours" ? "bg-blue-600" : ""
                            }`}
                    >
                        <FaPlane /> <span>Tours</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 transition ${activeTab === "users" ? "bg-blue-600" : ""
                            }`}
                    >
                        <FaUser /> <span>Users</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 transition ${activeTab === "contacts" ? "bg-blue-600" : ""
                            }`}
                    >
                        <FaEnvelope /> <span>Contacts</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 p-3 rounded-lg mt-10 hover:bg-red-600 transition"
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}
                    >
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-0 lg:p-6">
                <h1 className="text-3xl mx-2 lg:mx-6 font-bold mb-4">Admin Dashboard</h1>
                <div className="bg-white rounded-xl p-2 lg:p-6">{renderContent()}</div>
            </div>
        </div>
    );
}
