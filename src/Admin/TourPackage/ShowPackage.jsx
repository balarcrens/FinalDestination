import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Calendar, MapPin, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";

export default function ShowPackage() {
    const [packages, setPackages] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch all tours
    const fetchTours = async () => {
        try {
            const res = await axios.get("http://localhost/FinalDestination/Backend/getAllTours.php");
            if (Array.isArray(res.data)) {
                setPackages(res.data);
            } else {
                setPackages([]);
                toast.error("No packages found");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching data");
        }
    };

    const totalPages = Math.ceil(packages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = packages.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        fetchTours();
    }, []);

    // Delete tour
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;

        try {
            const formData = new FormData();
            formData.append("id", id);

            const res = await axios.post(
                "http://localhost/FinalDestination/Backend/deleteTour.php",
                formData
            );

            if (res.data) {
                toast.success("Package deleted!");
                fetchTours();
            } else {
                toast.error(res.data.message || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting package");
        }
    };

    // Open modal
    const handleEdit = (pkg) => {
        setEditData(pkg);
        setShowModal(true);
    };

    // Update tour
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(editData).forEach((key) => {
                formData.append(key, editData[key]);
            });

            const res = await axios.post(
                "http://localhost/FinalDestination/Backend/editTour.php",
                formData
            );

            if (res.data.success) {
                toast.success("Package updated!");
                setShowModal(false);
                fetchTours();
            } else {
                toast.error(res.data.message || "Update failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error updating package");
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">All Tour Packages</h2>

            {currentData && currentData.length > 0 ? (
                <div className="w-full sm:overflow-x-auto lg:overflow-x-visible">
                    <table className="min-w-full border border-gray-200 rounded-lg shadow text-sm text-left bg-white">
                        <thead className="sticky top-0">
                            <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                                <th className="px-4 py-3 font-semibold">ID</th>
                                <th className="px-4 py-3 font-semibold">Title</th>
                                <th className="px-4 py-3 font-semibold">Location</th>
                                <th className="px-4 py-3 font-semibold">Price</th>
                                <th className="px-4 py-3 font-semibold">Dates</th>
                                <th className="px-4 py-3 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((pkg, idx) => (
                                <tr
                                    key={pkg.id}
                                    className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-indigo-50 transition`}
                                >
                                    <td className="px-4 py-3 text-gray-700">{pkg.id}</td>

                                    {/* Title */}
                                    <td
                                        className="px-4 py-3 font-medium text-gray-900 truncate max-w-[180px]"
                                        title={pkg.title}
                                    >
                                        {pkg.title}
                                    </td>

                                    {/* Location */}
                                    <td
                                        className="px-4 py-3 text-gray-700 truncate max-w-[200px]"
                                        title={pkg.location}
                                    >
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-red-500 shrink-0" />
                                            <span className="truncate">{pkg.location}</span>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <IndianRupee size={16} className="text-green-600" />
                                            {pkg.price}
                                        </div>
                                    </td>

                                    {/* Dates */}
                                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-500" />
                                            {pkg.start_date} → {pkg.end_date}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3 text-center whitespace-nowrap flex justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(pkg)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pkg.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-red-500 font-semibold text-center mt-6">
                    No packages found.
                </p>
            )}

            {packages.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="font-semibold">
                        {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-3xl bg-black/30 flex items-center justify-center px-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Edit Package</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                placeholder="Title"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                value={editData.location}
                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                placeholder="Location"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="number"
                                value={editData.price}
                                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                placeholder="Price"
                                className="w-full p-2 border rounded"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                    type="date"
                                    value={editData.start_date}
                                    onChange={(e) => setEditData({ ...editData, start_date: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="date"
                                    value={editData.end_date}
                                    onChange={(e) => setEditData({ ...editData, end_date: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}