import { Mail, Phone, MapPin, Send, Sun, Handshake, Calendar, Megaphone } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ContactUs() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("message", data.message);

            const res = await axios.post(
                "http://localhost/FinalDestination/Backend/contact.php",
                formData
            );

            if (res.data.success) {
                toast.success(res.data.message);
                reset();
            } else {
                toast.error(res.data.message || "Failed to send message");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error.message);
        }
    };

    return (
        <section className="py-16">
            <div className="p-3 sm:p-5 max-w-6xl mx-auto">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Get in <span className="text-[#2B7FFF]">Touch</span>
                    </h2>
                    <p className="max-w-2xl mx-auto">
                        Planning your dream getaway? Let us help you make it unforgettable.
                        Reach out today and our travel experts will assist you.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-8 px-4 flex flex-col justify-center">
                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-500 p-3 rounded-full text-white">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <a href="tel:+91 9825515123"><p>+91 9825515123</p></a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-500 p-3 rounded-full text-white">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                <p>info@finaldestination.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-500 p-3 rounded-full text-white">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Location</h3>
                                <p> Chikuwadi, Nana varachha, Surat - 395006 </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="shadow-md rounded-2xl p-4 sm:p-8 border border-gray-400">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block mb-2 font-medium">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    {...register("name", { required: "Name is required" })}
                                    className="p-2 border w-full"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email", { required: "Email is required" })}
                                    className="p-2 border w-full"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Message</label>
                                <textarea
                                    placeholder="Tell us about your dream trip..."
                                    {...register("message", { required: "Message is required" })}
                                    className="p-2 border w-full h-32"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 py-2 px-4 rounded-md text-white flex items-center gap-2"
                            >
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7438.677534689519!2d72.87923741445087!3d21.2184109731211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f6ef999fe8b%3A0x2b1e12024710c65b!2sChikuwadi%2C%20Nana%20Varachha%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1755009983854!5m2!1sen!2sin"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Extra Contact Cards */}
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h3 className="text-2xl font-bold text-center mb-10">
                        Connect With <span className="text-blue-500">Us At</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center bg-blue-50 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Sun className="w-8 h-8 text-blue-500 mb-3" />
                            <h4 className="font-semibold text-black">Holidays Enquiry</h4>
                            <p className="text-gray-600 text-sm">holidays@finaldestination.com</p>
                        </div>

                        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Handshake className="w-8 h-8 text-gray-800 mb-3" />
                            <h4 className="font-semibold text-black">Partnership</h4>
                            <p className="text-gray-600 text-sm">marketing@finaldestination.com</p>
                        </div>

                        <div className="flex flex-col items-center bg-blue-50 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Calendar className="w-8 h-8 text-blue-500 mb-3" />
                            <h4 className="font-semibold text-black">Booking Status</h4>
                            <p className="text-gray-600 text-sm">care@finaldestination.com</p>
                        </div>

                        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
                            <Megaphone className="w-8 h-8 text-gray-800 mb-3" />
                            <h4 className="font-semibold text-black">Event Sponsorships</h4>
                            <p className="text-gray-600 text-sm">sponsorship@finaldestination.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
