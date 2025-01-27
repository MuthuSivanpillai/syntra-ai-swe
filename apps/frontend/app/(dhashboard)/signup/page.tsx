"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const SyntraLogin = () => {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const selectedRole = (document.getElementById("role") as HTMLSelectElement).value;
    const specificName = (document.getElementById("specificName") as HTMLInputElement)?.value;

    // Construct user payload
    const userPayload = {
      fullName,
      email,
      password,
      role: selectedRole,
      specificName: specificName || null, // Handle cases where this may not exist
    };

    try {
      // Send POST request to create a new user
      const response = await fetch("http://localhost:8069/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });

      // Check if response is successful
      if (response.ok) {
        const data = await response.json();
        toast.success(`Account created successfully! Welcome ${data.role}`);
        router.push("/"); // Redirect to Login page
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "An error occurred while creating the account");
    }
  };

  return (
    <ClerkProvider>
      {/* Add ToastContainer here to show toast notifications */}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop closeButton rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="min-h-screen bg-gray-200">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
            <h1 className="text-2xl text-black font-bold text-center mb-4">Join Syntra AI</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-black">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 block w-full text-black px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
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
              <div className="mb-4">
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
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-black">
                  Role
                </label>
                <select
                  id="role"
                  className="mt-1 block w-full text-black px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Learner">Learner</option>
                  <option value="University">University</option>
                  <option value="Company">Company</option>
                </select>
              </div>

              {role === "University" || role === "Company" ? (
                <div className="mb-4">
                  <label htmlFor="specificName" className="block text-sm font-medium text-black">
                    {role} Name
                  </label>
                  <input
                    type="text"
                    id="specificName"
                    className="mt-1 block w-full text-black px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder={`Enter your ${role} name`}
                    required
                  />
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full bg-[#5cc4b4] text-white py-2 px-4 rounded-md hover:bg-green-400"
              >
                Create Account and Begin Onboarding
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-black">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/")}
                  className="text-[#5cc4b4] underline hover:text-green-500"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
        <footer className="text-center py-4 text-black text-sm">
          © 2025 Syntra AI. All rights reserved.
        </footer>
      </div>
    </ClerkProvider>
  );
};

export default SyntraLogin;
