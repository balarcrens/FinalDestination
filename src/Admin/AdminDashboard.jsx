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
        <div className="flex min-h-screen overflow-hidden mt-3">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b rounded-t-2xl pt-6 shadow-lg">
                {/* <div className="p-6 text-center text-2xl font-bold">Admin Panel</div> */}
                <nav className="flex flex-col space-y-2 px-4">
                    <button
                        onClick={() => setActiveTab("tours")}
                        className={`flex text items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition ${activeTab === "tours" ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        <FaPlane /> <span>Tours</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex text items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition ${activeTab === "users" ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        <FaUser /> <span>Users</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`flex text items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition ${activeTab === "contacts" ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        <FaEnvelope /> <span>Contacts</span>
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-0 lg:p-4">
                <h1 className="text-3xl mx-2 lg:mx-6 font-bold mb-4">Admin Dashboard</h1>
                <div className="bg-white rounded-xl p-2 lg:p-4">{renderContent()}</div>
            </div>
        </div>
    );
}
