import { Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Home from "./Pages/Home"
import ContactUs from "./Pages/ContactUs"
import AboutUs from "./Pages/AboutUs"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop"
import AddPackage from "./Pages/AddPackage"
import Package from "./Pages/Package"
import PackageDetail from "./Pages/PackageDetail"

function App() {
    return (
        <div className="relative transition-all">
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/tourpackages" element={<Package />} />
                <Route path="/package/:tour_name" element={<PackageDetail />} />
                <Route path="/addtourpackages" element={<AddPackage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
