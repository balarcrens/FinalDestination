import { useState } from "react";
import { FaUser, FaPlane, FaEnvelope } from "react-icons/fa";
import TourAdmin from "./TourAdmin";
import UserAdmin from "./UserAdmin";
import ContactAdmin from "./ContactAdmin";
import { Ticket } from "lucide-react";
import BookingAdmin from "./BookingAdmin";

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
            case "booking":
                return <BookingAdmin />;
            default:
                return <TourAdmin />;
        }
    };

    return (
        <div className="flex min-h-screen overflow-hidden mt-3">
            {/* Sidebar */}
            <div className="max-w-64 bg-gradient-to-b rounded-t-2xl pt-6 shadow-lg">
                <nav className="flex flex-col space-y-2 px-2 md:px-4">
                    <button title="Package"
                        onClick={() => setActiveTab("tours")}
                        className={`flex text justify-center items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition ${activeTab === "tours" ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        <FaPlane className="m-0 lg:mr-2" /> <span className="hidden lg:inline">Tours</span>
                    </button>
                    <button title="Booking"
                        onClick={() => setActiveTab("booking")}
                        className={`flex text justify-center items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition ${activeTab === "booking" ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        <Ticket className="m-0 lg:mr-2" /> <span className="hidden lg:inline">Booking</span>
                    </button>
                    <button title="Users"
                        onClick={() => setActiveTab("users")}
                        className={`flex text justify-center items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition ${activeTab === "users" ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        <FaUser className="m-0 lg:mr-2" /> <span className="hidden lg:inline">Users</span>
                    </button>
                    <button title="Contacts"
                        onClick={() => setActiveTab("contacts")}
                        className={`flex text justify-center items-center space-x-2 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition ${activeTab === "contacts" ? "bg-blue-600 text-white" : ""
                            }`}
                    >
                        <FaEnvelope className="m-0 lg:mr-2" /> <span className="hidden lg:inline">Contacts</span>
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-0 lg:p-4">
                <h1 className="text-3xl mx-2 lg:mx-6 font-bold mb-4"><span className="text-blue-500"> Admin </span> Dashboard</h1>
                <div className="bg-white rounded-xl p-2 lg:p-4">{renderContent()}</div>
            </div>
        </div>
    );
}
