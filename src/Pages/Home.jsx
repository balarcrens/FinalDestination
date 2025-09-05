import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ContactUs from "./ContactUs";
import heroVideo from "/assets/hero-video.mp4";

export default function Home() {
    return (
        <div className="w-full mt-3">
            <HeroSection />
            <Destinations />
            <DealsSection />
            <HiddenGems />
            <ContactUs />
        </div>
    );
}

const HeroSection = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center px-3 text-white h-[80vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
                <h2 className="text-lg md:text-2xl font-semibold mb-6">
                    Where Every Experience Counts!
                </h2>

                {/* Search Box */}
                <div className="flex items-center bg-white rounded-full p-2 shadow-lg max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Enter Your Dream Destination!"
                        className="flex-grow px-2 py-2 text-gray-700 rounded-l-full focus:outline-none"
                    />
                    <button className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                        Search
                    </button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center rounded-full mt-6 gap-2">
                    {[
                        { name: "Honeymoon", img: "/assets/australia-banner-home.webp" },
                        { name: "Pilgrimage", img: "/assets/dubai_newbb.png" },
                        { name: "Luxury", img: "/assets/europe-banner-home.webp" },
                        { name: "Adventure", img: "/assets/kerala_newbb.png" },
                    ].map((cat, idx) => (
                        <div
                            key={idx}
                            className="flex items-center group border bg-black/30 border-white/30 backdrop-blur-sm text-white rounded-full px-2 py-2 shadow cursor-pointer transition"
                        >
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="w-8 h-8 rounded-full group-hover:scale-110 transition mr-2 object-cover"
                            />
                            <span className="text-sm font-medium">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const Destinations = () => {
    const destinations = [
        { name: "Europe", img: "/assets/europe2.png", slug: "Europe Tour" },
        { name: "Kerala", img: "/assets/kerala-nwdepk.webp", slug: "Kerala Tour" },
        { name: "Bali", img: "/assets/bali.png", slug: "Bali Tour" },
        { name: "Kashmir", img: "/assets/kashmir-handpckd.webp", slug: "Kashmir Tour" },
        { name: "Vietnam", img: "/assets/vietnam-handpckd.webp", slug: "Vietnam Tour" },
    ]
    return (
        <>
            <div className="relative p-3 sm:p-5 max-w-7xl mx-auto">
                <div className="absolute top-25 sm:top-20 sm:left-10 -translate-y-1/2 pointer-events-none opacity-30 -z-10 max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
                    <svg
                        width="100%"
                        height="200"
                        viewBox="0 0 800 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Dashed flight path */}
                        <path
                            id="planePath"
                            d="M 20 150 C 150 50, 300 250, 450 100 S 750 50, 780 150"
                            stroke="#FF5722"
                            strokeWidth="3"
                            strokeDasharray="10 8"
                            fill="none"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="200"
                                to="0"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </path>

                        <g transform="scale(2)">
                            <path
                                d="M10 0 L-10 -5 L-10 5 Z" /* simple triangle as plane nose */
                                fill="#FF5722"
                            />
                            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                                <mpath href="#planePath" />
                            </animateMotion>
                        </g>
                    </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Top <span className="text-blue-500">Trending</span> Destinations</h2>
                <p className="text-gray-500 mb-8">
                    Explore the hottest travel spots around the globe with Final Destination.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-7">
                    {destinations.map((dest, index) => (
                        <Link key={index} to={`/package/${dest.slug}`}>
                            <div className="flex flex-col group items-center overflow-hidden text-center" >
                                <div className="w-full h-50 rounded-2xl shadow-md overflow-hidden">
                                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-115" />
                                </div>
                                <p className="mt-3 text-lg group-hover:text-[#09AFF4] font-semibold">{dest.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

const DealsSection = () => {
    const deals = [
        { name: "KASHMIR", nights: 5, days: 6, img: "/assets/kashmir-handpckd.webp", slug: "Kashmir Tour" },
        { name: "KERALA", nights: 4, days: 5, img: "/assets/kerala-handpckd.webp", slug: "Kerala Tour" },
        { name: "HIMACHAL PRADESH", nights: 5, days: 6, img: "/assets/himachal-handpckd.webp", slug: "Himachal Pradesh Tour" },
        { name: "THAILAND", nights: 4, days: 5, img: "/assets/thailand.jpeg", slug: "Thailand Tour" },
        { name: "BALI", nights: 4, days: 5, img: "/assets/bali-sec.png", slug: "Bali Tour" },
        { name: "SINGAPORE", nights: 3, days: 4, img: "/assets/singapore-handpckd.webp", slug: "Singapore Tour" },
    ];

    return (
        <div className="p-3 sm:p-5 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Deals You Can't Miss</h2>
            <p className="text-gray-500 mb-8">
                Travel beyond boundaries with incredible savings
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                    {deals.slice(0, 2).map((deal, i) => (
                        <DealCard key={i} {...deal} />
                    ))}
                </div>

                <div className="md:row-span-2">
                    <DealCard {...deals[3]} tall />
                </div>

                <div className="space-y-4">
                    {deals.slice(4, 6).map((deal, i) => (
                        <DealCard key={i} {...deal} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DealCard = ({ name, nights, days, img, tall, slug }) => (
    <div className={`relative rounded-2xl overflow-hidden group ${tall ? "h-48 sm:h-100 md:h-116" : "h-48 md:h-56"}`}>
        <Link to={`/package/${slug}`}>
            <img
                src={img}
                alt={name}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm">{nights} Nights / {days} Days</p>
            </div>
        </Link>
    </div>
);

const HiddenGems = () => {
    const slides = [
        {
            title: "Serbia Holiday Package",
            tag: "Spectacular",
            price: "₹ 1,32,999",
            image: "/assets/serbia-slider.webp",
        },
        {
            title: "Georgia Holiday Package",
            tag: "Unveiled",
            price: "₹ 31,990",
            image: "/assets/georgia-slider.webp",
        },
        {
            title: "Cambodia Holiday Package",
            tag: "Enchanting",
            price: "₹ 32,890",
            image: "/assets/gems_cambodia.webp",
        },
    ];

    return (
        <div className="p-3 sm:p-5 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold">Explore The Hidden Gems</h2>
            <p className="text-gray-500 mb-6">
                Tap into the untapped tourist spots for amazing vacations.
            </p>

            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative rounded-2xl overflow-hidden group">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-64 md:h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>

                            <div className="absolute top-[35%] left-5 sm:left-20 text-white">
                                <p className="italic text-4xl mb-2 slider">{slide.tag}</p>
                                <h3 className="font-bold text-2xl">{slide.title}</h3>
                                <p className="mt-1">
                                    Starting From <span className="font-bold text-xl">{slide.price}</span>
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
