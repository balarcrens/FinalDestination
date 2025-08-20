import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
                {/* Logo + Tagline */}
                <div>
                    <img
                        src="/assets/header_logo.png"
                        alt="Final Destination"
                        className="h-14 w-auto mb-4 rounded-lg bg-white p-1"
                    />
                    <p className="text-sm leading-6">
                        Explore the world with us. Discover unforgettable destinations,
                        unique experiences, and your next adventure today.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/tourpackages" className="hover:text-cyan-400 transition">Packages</Link>
                        </li>
                        <li>
                            <Link to="/aboutus" className="hover:text-cyan-400 transition">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contactus" className="hover:text-cyan-400 transition">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li>📍 Surat, Gujarat, India</li>
                        <li>📧 info@finaldestination.com</li>
                        <li>📞 +91 98255 15123</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-[#1877F2] transition">
                            <Facebook size={22} />
                        </a>
                        <a href="#" className="hover:text-[#E1306C] transition">
                            <Instagram size={22} />
                        </a>
                        <a href="#" className="hover:text-[#1DA1F2] transition">
                            <Twitter size={22} />
                        </a>
                        <a href="#" className="hover:text-[#FF0000] transition">
                            <Youtube size={22} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm">
                © {new Date().getFullYear()} Final Destination. All rights reserved.
            </div>
        </footer>
    );
}
