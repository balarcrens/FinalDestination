import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Packages() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredTours, setFilteredTours] = useState([]);

    // parent state for filters
    const [filters, setFilters] = useState({
        sortBy: "",
        price: "",
    });

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await axios.get(
                    "http://localhost/FinalDestination/Backend/getAllTours.php"
                );
                setTours(res.data);
                setFilteredTours(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching tours:", err);
                setLoading(false);
            }
        };
        fetchTours();
    }, []);

    // filtering logic
    useEffect(() => {
        let updated = [...tours];

        // PRICE filter
        if (filters.price) {
            if (filters.price.includes("+")) {
                const min = Number(filters.price.replace("+", ""));
                updated = updated.filter((tour) => tour.price >= min);
            } else {
                const [min, max] = filters.price.split("-").map(Number);
                updated = updated.filter(
                    (tour) => tour.price >= min && tour.price <= max
                );
            }
        }

        // SORT filter
        if (filters.sortBy === "priceLowHigh") {
            updated.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === "priceHighLow") {
            updated.sort((a, b) => b.price - a.price);
        }

        setFilteredTours(updated);
    }, [filters, tours]);

    const resetFilters = () => {
        setFilters({
            sortBy: "",
            price: "",
        });
        setFilteredTours(tours);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!tours.length) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">No tours available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-6">
            <div className="max-w-5xl mx-auto px-2">
                <div className="mt-2">
                    <FilterBar
                        filters={filters}
                        setFilters={setFilters}
                        onReset={resetFilters}
                    />
                </div>

                <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-6 mt-6">
                    <div className="sm:col-span-3 col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6">
                        {filteredTours.map((tour) => (
                            <Link key={tour.id} to={`/package/${tour.title}`} className="bg-white border border-gray-200 group rounded-xl hover:shadow-lg transition p-1.5 sm:p-3 flex flex-col" >
                                {tour.poster ? (
                                    <div className="w-full h-48 overflow-hidden rounded-lg">
                                        <img
                                            src={`http://localhost/FinalDestination/Backend/uploads/${tour.poster}`}
                                            alt={tour.title}
                                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-115"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                                        No Image
                                    </div>
                                )}
                                <div className="mt-3 flex-1 flex flex-col">
                                    <h3 className="text-lg font-semibold">{tour.title}</h3>
                                    <p className="text-gray-600 text-sm">{tour.location}</p>
                                    <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                                        {tour.description}
                                    </p>
                                    <div className="flex flex-wrap justify-between items-center mt-auto ">
                                        <p className="font-bold text-sm text-blue-600">
                                            ₹{tour.price}
                                        </p>
                                        <button className="text-sm ml-auto bg-blue-600 w-fit hover:bg-blue-700 text-white py-1 px-2 rounded-xl">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

function FilterBar({ filters, setFilters, onReset }) {
    const handleChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div
            className="
                flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3
                bg-white shadow-md text-sm p-2 sm:p-3 rounded-xl
            "
        >
            {/* Sort Dropdown */}
            <select
                className="flex-1 px-2 py-1.5 sm:py-2 border border-gray-200 rounded-lg"
                value={filters.sortBy}
                onChange={(e) => handleChange("sortBy", e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="priceLowHigh">Price (Low to High)</option>
                <option value="priceHighLow">Price (High to Low)</option>
            </select>

            {/* Price Dropdown */}
            <select
                className="flex-1 px-2 py-1.5 sm:py-2 border border-gray-200 rounded-lg"
                value={filters.price}
                onChange={(e) => handleChange("price", e.target.value)}
            >
                <option value="">Price</option>
                <option value="0-5000">Below ₹5000</option>
                <option value="5000-10000">₹5000 - ₹10000</option>
                <option value="10000-20000">₹10000 - ₹20000</option>
                <option value="20000+">Above ₹20000</option>
            </select>

            <button
                onClick={onReset}
                className="
                    w-full sm:w-auto bg-red-500 hover:bg-red-600 
                    text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg
                "
            >
                Reset
            </button>
        </div>
    );
}
