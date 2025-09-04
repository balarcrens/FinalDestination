import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, User, Calendar } from "lucide-react";

export default function UserAdmin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost/FinalDestination/Backend/getAllUser.php")
            .then((res) => {
                setUsers(res.data || []);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setUsers([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {loading ? (
                <p className="text-gray-500">Loading users...</p>
            ) : users.length > 0 ? (
                <div className="overflow-x-auto border border-gray-200">
                    <table className="min-w-full text-sm text-left border-collapse bg-white rounded-xl">
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                                <th className="px-4 py-3 font-semibold">ID</th>
                                <th className="px-4 py-3 font-semibold">Name</th>
                                <th className="px-4 py-3 font-semibold">Email</th>
                                <th className="px-4 py-3 font-semibold">Role</th>
                                <th className="px-4 py-3 font-semibold">Phone</th>
                                <th className="px-4 py-3 font-semibold">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr
                                    key={user.id}
                                    className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
                                >
                                    <td className="px-4 py-3 text-gray-700">{user.id}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <User size={16} className="text-indigo-600" />
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="text-blue-500" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">{user.role}</td>
                                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="text-green-600" />
                                            {user.phone}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-500" />
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-red-500 font-semibold text-center mt-6">🚫 No users found.</p>
            )}
        </>
    );
}
