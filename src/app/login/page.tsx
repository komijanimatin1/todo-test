"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/authStore";
import { useState } from "react";

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    
    const onSubmit = (data: FormData) => {
        if (data.email === "admin@example.com" && data.password === "123456") {
            login("1234");
            router.push("/");

        } else {
            setError("Invalid credentials");

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#658c50]">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#e2d7ab] p-8 rounded-lg shadow-lg w-[90%] max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                {error && <p className="text-red-600 text-center">{error}</p>}

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Email</label>
                    
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full p-2 rounded bg-yellow-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#658c50]"
                        placeholder="admin@example.com"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Password</label>
                    
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full p-2 rounded bg-yellow-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#658c50]"
                        placeholder="123456"
                    />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#658c50] text-white py-2 rounded hover:bg-[#567a43] transition duration-200"
                >
                    Login
                </button>

            </form>
        </div>
    );
}
