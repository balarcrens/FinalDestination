import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PackageDetail() {
    const { tour_name } = useParams();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);

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
                        <img
                            src={`http://localhost/FinalDestination/Backend/uploads/${packageData.poster}`}
                            alt={packageData.title}
                            className="w-full h-[420px] object-cover rounded-xl"
                        />
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
                                    <img
                                        src={`http://localhost/FinalDestination/Backend/uploads/${img}`}
                                        alt={`${packageData.title} ${i + 1}`}
                                        className="w-full h-40 object-cover hover:scale-110 transition duration-500"
                                    />
                                </div>
                            ))}
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
                                <p className="text-xl text-gray-800 font-bold flex items-center">
                                    <strike>₹{BeforediscountPrice}</strike>
                                    <p className="text-green-600 text-sm font-semibold ml-2">
                                        {discountPercent}% OFF
                                    </p>
                                </p>

                                <p className="text-3xl font-bold flex items-center text-blue-600">
                                    ₹{packageData.price}
                                    <span className="text-sm mx-1 text-black font-medium"> Per Person</span>
                                </p>
                            </div>

                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl text-lg font-semibold transition shadow-lg hover:shadow-xl">
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