import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, User, Calendar } from "lucide-react";

export default function ContactAdmin() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost/FinalDestination/Backend/getAllContact.php")
            .then((res) => {
                setContacts(res.data || []);
            })
            .catch((err) => {
                console.error("Error fetching contacts:", err);
                setContacts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {loading ? (
                <p className="text-gray-500">Loading contacts...</p>
            ) : contacts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contacts.map((c) => (
                        <div
                            key={c.id}
                            className="p-5 bg-white rounded-2xl hover:shadow-xl transition border border-gray-200"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <User className="text-indigo-600" size={20} />
                                <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Mail size={18} className="text-blue-500" />
                                <span className="truncate">{c.email}</span>
                            </div>

                            <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg mb-3">
                                {c.message}
                            </p>

                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Calendar size={16} />
                                {new Date(c.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-500 font-semibold mt-6">No contacts found.</p>
            )}
        </>
    );
}
