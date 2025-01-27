"use client";

import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use Next.js router
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:8069/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { role, message } = data;

        // Display success toast
        toast.success(`Login successful! Welcome, ${role}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });

        // Navigate to the dashboard based on the role
        if (role === "University") {
          router.push("/university-dashboard");
        } else if (role === "company" ) {
          router.push("/company-dashboard");
        } else if (role === "Super Admin" ) {
          router.push("/superad_dash");
        } else {
          router.push("/general-dashboard");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid login credentials!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <ClerkProvider>
      {/* Toast container for displaying messages */}
      <div>
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            <h1 className="text-2xl text-black font-bold text-center mb-4">SYNTRA-AI</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full text-black px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-black">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full text-black px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5cc4b4] text-white py-2 px-4 rounded-md hover:bg-green-400"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-black">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#5cc4b4] underline hover:text-green-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default Login;
