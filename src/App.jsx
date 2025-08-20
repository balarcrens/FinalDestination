import { Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import ContactUs from "./Pages/ContactUs"
import AboutUs from "./Pages/AboutUs"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="relative transition-all">
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default App
