import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddPackage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append normal fields
            Object.keys(data).forEach((key) => {
                if (key !== "poster" && key !== "gallery") {
                    formData.append(key, data[key]);
                }
            });

            // Append poster
            if (data.poster && data.poster[0]) {
                formData.append("poster", data.poster[0]);
            }

            if (data.gallery && data.gallery.length > 0) {
                for (let i = 0; i < data.gallery.length; i++) {
                    formData.append("gallery[]", data.gallery[i]);
                }
            }

            const res = await axios.post(
                "http://localhost/FinalDestination/Backend/addTour.php",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.success) {
                toast.success("Package added successfully!");
                reset();
                navigate("/tourpackages");
            } else {
                toast.error(res.data.message || "Failed to add package");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };

    return (
        <div className="flex max-w-full items-center md:justify-center">
            <div className="w-full max-w-md md:max-w-2xl relative group px-2 py-4 lg:p-8">
                <h2 className="absolute inset-x-0 text-3xl font-extrabold text-center text-gray-800 mb-6 
           transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:-translate-y-2">
                    Add New Package
                </h2>

                <h2 className="absolute inset-x-0 text-3xl font-extrabold text-center text-gray-800 mb-6 
           transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    Let’s Create a Tour
                </h2>

                <p className="mt-16 text-center text-gray-500 mb-8">
                    Fill in the details of your new tour package
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Title */}
                    <div>
                        <input
                            type="text"
                            placeholder="Tour Title"
                            {...register("title", { required: "Title is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <textarea
                            placeholder="Description"
                            {...register("description")}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <input
                            type="number"
                            placeholder="Price"
                            {...register("price", { required: "Price is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    {/* Nights + Days */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Nights"
                            {...register("nights")}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <input
                            type="number"
                            placeholder="Days"
                            {...register("days", { required: "Days are required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    {errors.days && <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>}

                    {/* Location */}
                    <div>
                        <input
                            type="text"
                            placeholder="Location"
                            {...register("location", { required: "Location is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="date"
                            {...register("start_date", { required: "Start date is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <input
                            type="date"
                            {...register("end_date", { required: "End date is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    {(errors.start_date || errors.end_date) && (
                        <p className="text-red-500 text-sm mt-1">Both dates are required</p>
                    )}

                    {/* Poster */}
                    <div>
                        <label className="block text-gray-600 mb-2 font-medium">Poster Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("poster", { required: "Poster image is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.poster && <p className="text-red-500 text-sm mt-1">{errors.poster.message}</p>}
                    </div>

                    {/* Gallery */}
                    <div>
                        <label className="block text-gray-600 mb-2 font-medium">Gallery Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            {...register("gallery")}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
                    >
                        Add Package
                    </button>
                </form>
            </div>
        </div>
    );
}
