import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Header() {
    const lightLogo = "/assets/header_logo.png";
    const [isFixed, setIsFixed] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const headerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const User = JSON.parse(localStorage.getItem("user"));
        if (User) setUser(User);

        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        const handleScroll = () => {
            setIsFixed(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
        toast.success("Logout successfully");
    };

    return (
        <>
            {isFixed && <div style={{ height: headerHeight }}></div>}

            <header
                ref={headerRef}
                className={`${isFixed ? "fixed top-3 left-0 right-0" : "mt-3"} 
                mx-auto w-[calc(100%-2rem)] sm:max-w-5xl flex items-center justify-between px-2.5 sm:px-6 py-1
                border rounded-lg transition-all ease-in duration-300 z-50 backdrop-blur-md bg-white `}
            >
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <img src={lightLogo} alt="Final Destination" className="h-14 w-auto object-contain rounded-lg p-1" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-5 font-medium">
                    <Link to="/" className="hover:underline hover:text-[#144565] transition-all duration-300 underline-offset-4">
                        Home
                    </Link>
                    <Link to="/tourpackages" className="hover:underline hover:text-[#144565] transition-all duration-300 underline-offset-4">
                        Packages
                    </Link>
                    <Link to="/addtourpackages" className="hover:underline hover:text-[#144565] transition-all duration-300 underline-offset-4">
                        AddPackages
                    </Link>
                    <Link to="/aboutus" className="hover:underline hover:text-[#144565] transition-all duration-300 underline-offset-4">
                        About
                    </Link>
                    <Link to="/contactus" className="hover:underline hover:text-[#144565] transition-all duration-300 underline-offset-4">
                        Contact Us
                    </Link>
                </nav>

                {/* Desktop Login */}
                <div className="hidden md:flex font-medium">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hover:underline hover:text-red-500 transition-all duration-300 underline-offset-6"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="hover:underline hover:text-[#144565] transition-all duration-300 underline-offset-6"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                        window.scroll(0, 0);
                    }}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </header>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white backdrop-blur-md p-6 space-y-4 animate-slideDown">
                    <Link to="/" className="block hover:underline underline-offset-4" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/tourpackages" className="block hover:underline underline-offset-4" onClick={() => setMenuOpen(false)}>Packages</Link>
                    <Link to="/aboutus" className="block hover:underline underline-offset-4" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/contactus" className="block hover:underline underline-offset-4" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                    {user ? (
                        <button
                            onClick={() => { handleLogout(); setMenuOpen(false); }}
                            className="block text-left w-full hover:underline underline-offset-4 text-red-500"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="block hover:underline underline-offset-4" onClick={() => setMenuOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </>
    );
}