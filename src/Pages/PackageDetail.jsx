import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PackageDetail() {
    const { tour_name } = useParams();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        fetch("http://localhost/FinalDestination/Backend/getTour.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tour_name }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPackageData({
                        ...data.package,
                        poster: data.poster,
                        gallery: data.gallery,
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching package:", err);
                setLoading(false);
            });
    }, [tour_name]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <p className="text-gray-600 text-lg animate-pulse">
                    Loading package details...
                </p>
            </div>
        );
    }

    if (!packageData) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <p className="text-gray-600 text-lg">Package not found</p>
            </div>
        );
    }

    const discountPercent = 20;
    const BeforediscountPrice = parseFloat(packageData.price) + parseFloat(packageData.price * discountPercent) / 100;

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-2 sm:px-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                    {packageData.title}
                </h1>
                <p className="text-gray-600 mt-2 text-base">
                    📍 {packageData.location}
                </p>
                {/* Chip for days/nights */}
                <div className="my-3 inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 shadow-sm">
                    {packageData.days} Days • {packageData.nights} Nights
                </div>

                <div className="bg-white/90 backdrop-blur rounded-xl overflow-hidden border border-gray-100">
                    {/* Poster */}
                    {packageData.poster ? (
                        <div className="relative h-[420px] rounded-xl overflow-hidden">
                            <img
                                src={`http://localhost/FinalDestination/Backend/uploads/${packageData.poster}`}
                                alt={packageData.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                <h1 className="text-3xl md:text-5xl font-bold text-white">{packageData.title}</h1>
                                <p className="text-gray-200 mt-2">📍 {packageData.location}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-[420px] flex items-center justify-center bg-gray-200 text-gray-500 text-xl font-medium">
                            No Image Available
                        </div>
                    )}

                    <h1 className="text-lg font-semibold md:text-2xl bg-gradient-to-r mt-6 from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                        Gallery Images
                    </h1>
                    {/* Gallery */}
                    {packageData.gallery?.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-1.5">
                            {packageData.gallery.map((img, i) => (
                                <div
                                    key={i}
                                    className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300"
                                >
                                    <div onClick={() => setSelectedImg(img)} className="relative overflow-hidden rounded-xl group">
                                        <img
                                            src={`http://localhost/FinalDestination/Backend/uploads/${img}`}
                                            className="w-full h-40 object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold transition">
                                            View
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                    {/* Show Gallery Image */}
                    {selectedImg && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelectedImg(null)}>
                            <img
                                src={`http://localhost/FinalDestination/Backend/uploads/${selectedImg}`}
                                alt="Selected"
                                className="max-h-[90%] max-w-[95%] rounded-lg shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button onClick={() => setSelectedImg(null)}
                                className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Details */}
                    <div className="py-10">
                        <h1 className="text-lg font-semibold md:text-2xl bg-gradient-to-r mt-6 from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                            Package Overview
                        </h1>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {packageData.description}
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center sm:justify-between items-center border-t border-gray-200 pt-6">
                            <div>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-xl line-through text-gray-600">₹{BeforediscountPrice}</span>
                                    <span className="text-green-600 text-lg font-semibold">{discountPercent}% OFF</span>
                                </div>
                                <p className="text-4xl font-bold text-blue-600">₹{packageData.price}</p>
                                <p className="text-sm text-gray-500">Per Person</p>
                            </div>

                            <button className="bg-blue-700 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl text-lg font-medium tracking-wide shadow hover:shadow-2xl transition-all duration-300 ease-in-out ">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Extra Info Cards */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition">
                        <h3 className="text-lg font-semibold text-blue-600">Duration</h3>
                        <p className="text-gray-600 mt-2">
                            {packageData.days} Days / {packageData.nights} Nights
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition">
                        <h3 className="text-lg font-semibold text-blue-600">Highlights</h3>
                        <p className="text-gray-600 mt-2">
                            {packageData.highlights || "Beautiful views, adventure activities"}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition">
                        <h3 className="text-lg font-semibold text-blue-600">Contact</h3>
                        <p className="text-gray-600 mt-2">
                            {packageData.contact || "support@finaldestination.com"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}