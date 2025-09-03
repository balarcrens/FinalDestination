import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const res = await axios.post(
                "http://localhost/FinalDestination/Backend/register.php",
                formData
            );

            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success("Registration successfully");
                navigate("/");
                window.location.reload();
            } else {
                toast.error(res.data.message || "Login failed");
            }

            reset();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full group max-w-md p-8 bg-white rounded-2xl border border-gray-200">
                <h2 className="absolute inset-x-0 text-3xl font-extrabold text-center text-gray-800 mb-6 
                 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:-translate-y-2">
                    Registration
                </h2>

                <h2 className="absolute inset-x-0 text-3xl font-extrabold text-center text-gray-800 mb-6 
                 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    Create Account
                </h2>
                <p className="mt-16 text-center text-gray-500 mb-8">
                    Fill in the details to get started
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            {...register("email", { required: "Email is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Phone"
                            {...register("phone", { required: "Phone is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
                    >
                        Register
                    </button>

                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
