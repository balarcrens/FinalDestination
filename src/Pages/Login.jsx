import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                "http://localhost/FinalDestination/FinalDestination-Backend/login.php",
                data,
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data.success) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success("Login successfully");
                navigate("/");
                window.location.reload();
            } else {
                toast.error(res.data.message || "Login failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md group p-8 bg-white rounded-2xl  border border-gray-200">
                <h2 className="absolute inset-x-0 text-3xl font-extrabold text-center text-gray-800 mb-6 
                 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:-translate-y-2">
                    Login
                </h2>

                <h2 className="absolute inset-x-0 text-3xl font-extrabold text-center text-gray-800 mb-6 
                 transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    Welcome Back
                </h2>

                <p className="mt-16 text-center text-gray-500 mb-8">
                    Please login to your account
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                            {...register("password", { required: "Password is required" })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
