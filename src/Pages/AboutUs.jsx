import { Globe2, Compass, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <section>
            {/* Hero */}
            <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-9 text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    About <span className="text-blue-500">Final Destination</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    We are passionate travelers dedicated to crafting unforgettable journeys for explorers across the globe.
                </p>
            </div>

            {/* Our Story */}
            <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                        alt="Our Story"
                        className="rounded-2xl shadow-lg"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Story
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Founded in 2006, Final Destination was born from a love for exploration and cultural immersion. From small group adventures to luxury escapes, we’ve helped thousands of travelers create lifelong memories.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        Our team works with trusted partners around the world to bring you unique experiences, personalized itineraries, and exceptional service — every step of the way.
                    </p>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Our <span className="text-blue-500">Core Values</span>
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Globe2 className="w-10 h-10 text-blue-500 mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Global Reach</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Connecting travelers with destinations across the globe.
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Compass className="w-10 h-10 text-blue-500 mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Expert Guidance</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Experienced travel planners ensuring smooth journeys.
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Heart className="w-10 h-10 text-blue-500 mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Customer First</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Crafting trips tailored to your dreams and comfort.
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Users className="w-10 h-10 text-blue-500 mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Strong Community</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Building connections among travelers worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet the Team */}
            <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Meet Our <span className="text-blue-500">Travel Experts</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Balar Crens", role: "Founder & CEO", phone: "+91 9825515123", email: "balarcrens@gmail.com" },
                        { name: "Dhameliya Hit", role: "Co-Founder & CEO", phone: "+91 9638601192", email: "heetdhameliya@gmail.com" },
                        { name: "Dhanani Harsh", role: "Cultural Guide", phone: "+91 8905718200", email: "harshdhanani@gmail.com" }
                    ].map((member, idx) => (
                        <div
                            key={idx}
                            className="relative bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 text-center border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-102 overflow-hidden group"
                        >
                            {/* Info */}
                            <div className="transition-opacity duration-300 group-hover:opacity-0">
                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.role}</p>
                            </div>

                            {/* Contact Info */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-gray-900">
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{member.phone}</p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{member.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/assets/cta-travel-bg.jpeg')`,
                    }}
                ></div>

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10 py-16 px-6 text-center text-white max-w-4xl mx-auto">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                        Let’s Create Memories That Last Forever ✈️
                    </h3>
                    <p className="mb-8 text-base sm:text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
                        From golden beaches to snowy peaks, we’ll take you beyond the ordinary —
                        so every journey feels like a story worth telling.
                    </p>

                    <Link
                        to="/contactus"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </div>
        </section>
    );
}
