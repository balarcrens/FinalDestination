import { useRef } from "react";
import AddPackage from "./TourPackage/AddPackage";
import ShowPackage from "./TourPackage/ShowPackage";

export default function TourAdmin() {
    const addRef = useRef(null);
    const showRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Top Options */}
            <div className="flex gap-4 mb-6">
                <button className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={() => scrollToSection(addRef)}>
                    Add Tour
                </button>
                <button className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                    onClick={() => scrollToSection(showRef)}>
                    Show Tour
                </button>
            </div>

            {/* Add Tour Section */}
            <div ref={addRef}>
                <AddPackage />
            </div>

            {/* Show/Edit/Delete Section */}
            <div ref={showRef}>
                <ShowPackage />
            </div>
        </>
    );
}