import { Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import ContactUs from "./Pages/ContactUs"
import AboutUs from "./Pages/AboutUs"

function App() {
    return (
        <div className="relative transition-all">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
        </div>
    )
}

export default App
