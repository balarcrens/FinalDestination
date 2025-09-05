import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function PackageDetail() {
    const { tour_name } = useParams();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            travelers: 1,
            travel_date: today,
        },
    });

    // Fetch package data
    useEffect(() => {
        axios.post("http://localhost/FinalDestination/Backend/getTour.php", { tour_name })
            .then(res => {
                const data = res.data;
                if (data.success) {
                    setPackageData({ ...data.package, poster: data.poster, gallery: data.gallery });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching package:", err);
                setLoading(false);
            });
    }, [tour_name]);

    const handleBooking = async (formData) => {
        if (!user?.id) {
            toast.error("Please login first!");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost/FinalDestination/Backend/bookTour.php",
                {
                    user_id: user.id,
                    tour_id: packageData.id,
                    travelers: formData.travelers,
                    travel_date: formData.travel_date,
                },
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success(res.data.message);
            setShowBooking(false);
            reset({ travelers: 1, travel_date: today });
        } catch (err) {
            console.error("Booking failed:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (loading) return <p className="text-center mt-20 animate-pulse">Loading package...</p>;
    if (!packageData) return <p className="text-center mt-20">Package not found</p>;

    const discountPercent = 20;
    const beforeDiscountPrice =
        parseFloat(packageData.price) + (parseFloat(packageData.price) * discountPercent) / 100;

    return (
        <div className="min-h-screen py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">

                {/* Package Title */}
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                    {packageData.title}
                </h1>
                <p className="text-gray-600 mt-2 text-base">📍 {packageData.location}</p>
                <div className="my-3 inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 shadow-sm">
                    {packageData.days} Days • {packageData.nights} Nights
                </div>

                {/* Poster */}
                {packageData.poster && (
                    <img
                        src={`http://localhost/FinalDestination/Backend/uploads/${packageData.poster}`}
                        alt={packageData.title}
                        className="w-full h-80 object-cover rounded-xl mt-4"
                    />
                )}

                {/* Gallery */}
                {packageData.gallery?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {packageData.gallery.map((img, i) => (
                            <img
                                key={i}
                                src={`http://localhost/FinalDestination/Backend/uploads/${img}`}
                                alt={`gallery-${i}`}
                                className="w-full h-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                                onClick={() => setSelectedImg(img)}
                            />
                        ))}
                    </div>
                )}

                {/* Description */}
                <div className="mt-6 bg-white p-2 rounded-xl">
                    <h2 className="text-2xl font-semibold text-blue-600">Package Overview</h2>
                    <p className="text-gray-700 mt-2">{packageData.description}</p>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline space-x-3">
                        <span className="line-through text-gray-600">₹{beforeDiscountPrice}</span>
                        <span className="text-green-600 font-semibold">{discountPercent}% OFF</span>
                    </div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-600 mt-1">₹{packageData.price} per person</p>

                    {/* Book Now Button */}
                    <button
                        onClick={() => setShowBooking(true)}
                        className="mt-6 bg-blue-700 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-lg font-medium shadow hover:shadow-2xl transition-all duration-300 ease-in-out"
                    >
                        Book Now
                    </button>
                </div>

                {/* Booking Modal */}
                {showBooking && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-md shadow-lg overflow-hidden">
                            {packageData.poster && (
                                <img
                                    src={`http://localhost/FinalDestination/Backend/uploads/${packageData.poster}`}
                                    alt={packageData.title}
                                    className="w-full h-64 object-cover"
                                />
                            )}

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-blue-600">{packageData.title}</h2>
                                <p className="text-gray-600 mt-1">📍 {packageData.location}</p>
                                <p className="text-lg font-semibold mt-2">₹{packageData.price} per person</p>

                                {/* Booking Form */}
                                <form onSubmit={handleSubmit(handleBooking)} className="mt-4 space-y-3">
                                    <div>
                                        <label className="block text-gray-600 mb-1">Travelers</label>
                                        <input
                                            type="number"
                                            min="1"
                                            {...register("travelers", { required: true, min: 1 })}
                                            className="w-full border px-3 py-2 rounded"
                                        />
                                        {errors.travelers && <p className="text-red-500 text-sm">Enter valid number</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 mb-1">Travel Date</label>
                                        <input
                                            type="date"
                                            {...register("travel_date", { required: true })}
                                            className="w-full border px-3 py-2 rounded"
                                        />
                                        {errors.travel_date && <p className="text-red-500 text-sm">Select a date</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Confirm Booking
                                    </button>
                                </form>

                                <button
                                    type="button"
                                    className="w-full mt-2 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
                                    onClick={() => setShowBooking(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected Image Modal */}
                {selectedImg && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setSelectedImg(null)}
                    >
                        <img
                            src={`http://localhost/FinalDestination/Backend/uploads/${selectedImg}`}
                            alt="Selected"
                            className="max-h-[90%] max-w-[95%] rounded-lg shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setSelectedImg(null)}
                            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white py-3 px-4.5 rounded-full transition"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Extra Info Cards */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition">
                        <h3 className="text-lg font-semibold text-blue-600">Duration</h3>
                        <p className="text-gray-600 mt-2"> {packageData.days} Days / {packageData.nights} Nights </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition">
                        <h3 className="text-lg font-semibold text-blue-600">Highlights</h3>
                        <p className="text-gray-600 mt-2"> {packageData.highlights || "Beautiful views, adventure activities"} </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition">
                        <h3 className="text-lg font-semibold text-blue-600">Contact</h3>
                        <p className="text-gray-600 mt-2"> {packageData.contact || "support@finaldestination.com"} </p>
                    </div>
                </div>
            </div>
        </div>
    );
}