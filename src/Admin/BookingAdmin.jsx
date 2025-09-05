import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";

export default function BookingAdmin() {
    const [bookings, setBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://localhost/FinalDestination/Backend/getAllBookings.php");
            setBookings(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            toast.error("Error fetching bookings");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await axios.post("http://localhost/FinalDestination/Backend/updateBooking.php", { id, status });
            if (res.data.success) {
                toast.success("Status updated!");
                setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)));
            } else {
                toast.error(res.data.message || "Update failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error updating status");
        }
    };

    const filteredData = bookings.filter(b => statusFilter === "all" || b.status === statusFilter);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const statusClasses = status => {
        switch (status) {
            case "confirmed": return "bg-green-100 text-green-600";
            case "pending": return "bg-yellow-100 text-yellow-600";
            case "cancelled": return "bg-red-100 text-red-600";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div>
            {/* Status Filter */}
            <div className="flex justify-between items-center mb-4">
                <select
                    value={statusFilter}
                    onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="border p-1 rounded"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Booking Table */}
            {currentData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg shadow text-sm text-left bg-white">
                        <thead className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold">ID</th>
                                <th className="px-4 py-3 font-semibold">User</th>
                                <th className="px-4 py-3 font-semibold">Tour</th>
                                <th className="px-4 py-3 font-semibold">Travelers</th>
                                <th className="px-4 py-3 font-semibold">Date</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map(b => (
                                <tr key={b.id} className="hover:bg-blue-50 transition">
                                    <td className="px-4 py-3">{b.id}</td>
                                    <td className="px-4 py-3">{b.user_name}</td>
                                    <td className="px-4 py-3">{b.tour_name}</td>
                                    <td className="px-4 py-3">{b.travelers}</td>
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-500" />
                                        {b.travel_date}
                                    </td>
                                    <td className={`px-2 text-xs font-semibold ${statusClasses(b.status)}`}>
                                        <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)} className="bg-transparent outline-0 py-1 w-full border-none" >
                                            <option value="pending">pending</option>
                                            <option value="confirmed">confirmed</option>
                                            <option value="cancelled">cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-3">{b.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <p className="text-red-500 font-semibold text-center mt-6">No bookings found.</p>}

            {/* Pagination */}
            {filteredData.length > itemsPerPage && (
                <div className="flex justify-center gap-3 mt-4">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Prev</button>
                    <span className="font-semibold flex items-center">{currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Next</button>
                </div>
            )}
        </div>
    );
}
