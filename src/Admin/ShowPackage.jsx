import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ShowPackage() {
    const [packages, setPackages] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
        <div className="md:p-6">
            <h2 className="text-2xl font-bold mb-4">All Tour Packages</h2>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Price</th>
                            <th className="px-4 py-2 border">Dates</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages && packages.length > 0 ? (
                            packages.map((pkg) => (
                                <tr key={pkg.id}>
                                    <td className="border px-4 py-2">{pkg.id}</td>
                                    <td className="border px-4 py-2">{pkg.title}</td>
                                    <td className="border px-4 py-2">₹{pkg.price}</td>
                                    <td className="border px-4 py-2">{pkg.start_date} → {pkg.end_date}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleEdit(pkg)} className="text-blue-600">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(pkg.id)} className="text-red-600 ml-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No packages found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-3xl bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Edit Package</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            title:
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                placeholder="Title"
                                className="w-full p-2 border rounded"
                            />

                            location:
                            <input
                                type="text"
                                value={editData.location}
                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                placeholder="Location"
                                className="w-full p-2 border rounded"
                            />

                            price:
                            <input
                                type="number"
                                value={editData.price}
                                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                placeholder="Price"
                                className="w-full p-2 border rounded"
                            />

                            date:
                            <div className="grid grid-cols-2 gap-2">
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
        </div>
    );
}
