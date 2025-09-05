/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";

export default function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user?.id) fetchBookings();
    }, [user]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get(
                `http://localhost/FinalDestination/Backend/getBooking.php?user_id=${user.id}`
            );

            if (Array.isArray(res.data)) {
                // Sort bookings by travel_date ascending
                const sorted = res.data.sort(
                    (a, b) => new Date(a.travel_date) - new Date(b.travel_date)
                );
                setBookings(sorted);
            } else {
                setBookings([]);
                toast.error(res.data.error || "No bookings found");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching bookings");
        }
    };

    return (
        <div className="max-w-7xl min-h-screen mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
                My Bookings
            </h2>

            {bookings.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                    {bookings.map((b) => (
                        <div key={b.id} className="border border-gray-200 rounded-xl shadow-lg p-6 bg-gradient-to-tr from-white to-indigo-100 hover:scale-105 transform transition duration-300" >
                            <h3 className="text-xl font-bold mb-3 text-indigo-700">
                                {b.tour_name}
                            </h3>

                            <div className="flex justify-between mb-2">
                                <p className="text-gray-700 font-medium">
                                    <span className="text-gray-500">Travelers:</span> {b.travelers}
                                </p>
                                <p className="text-gray-700 font-medium flex items-center gap-1">
                                    <Calendar size={16} className="text-indigo-400" />
                                    <span>{b.travel_date}</span>
                                </p>
                            </div>

                            <p className="mb-2">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold ${b.status === "confirmed"
                                        ? "bg-green-100 text-green-700"
                                        : b.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                                </span>
                            </p>

                            <p className="text-gray-500 text-sm mt-4">
                                Booked on: {new Date(b.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10 text-lg">
                    You have no bookings yet.
                </p>
            )}
        </div>
    );
}
