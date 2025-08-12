import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
    const lightLogo = "/assets/header_logo.png";
    const darkLogo = "/assets/header_logo_dark.png";
    const [isFixed, setIsFixed] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        const handleScroll = () => {
            setIsFixed(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {isFixed && <div style={{ height: headerHeight }}></div>}

            <header
                ref={headerRef}
                className={`${isFixed ? "fixed top-3 left-0 right-0" : "mt-3"} 
                mx-auto w-[calc(100%-2rem)] sm:max-w-5xl flex items-center justify-between px-2.5 sm:px-6 py-1
                bg-white/30 dark:bg-black/30 border backdrop-blur-md rounded-lg
                transition-all ease-in duration-300 z-50`}
            >
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        {/* Light mode logo */}
                        <img src={lightLogo} alt="Final Destination" className="h-14 w-auto object-contain rounded-lg p-1 dark:hidden" />
                        {/* Dark mode logo */}
                        <img src={darkLogo} alt="Final Destination" className="h-14 w-auto object-contain rounded-lg p-1 hidden dark:block" />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-5 font-medium">
                    <Link to="/" className="hover:underline hover:text-[#09AFF4] underline-offset-4">
                        Home
                    </Link>
                    <Link to="/tourpackages" className="hover:underline hover:text-[#09AFF4] underline-offset-4">
                        Packages
                    </Link>
                    <Link to="/aboutus" className="hover:underline hover:text-[#09AFF4] underline-offset-4">
                        About
                    </Link>
                    <Link to="/contactus" className="hover:underline hover:text-[#09AFF4] underline-offset-4">
                        Contact Us
                    </Link>
                </nav>

                {/* Desktop Login */}
                <div className="hidden md:flex font-medium">
                    <Link className="hover:underline hover:text-[#09AFF4] underline-offset-6">
                        Login
                    </Link>
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
                <div className="md:hidden bg-white dark:bg-black/90 backdrop-blur-md border-t p-4 space-y-4 animate-slideDown">
                    <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/tourpackages" className="block hover:underline" onClick={() => setMenuOpen(false)}>Packages</Link>
                    <Link to="/aboutus" className="block hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/contactus" className="block hover:underline" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                    <Link className="block hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
                </div>
            )}
        </>
    );
}