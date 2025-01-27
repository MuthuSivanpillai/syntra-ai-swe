"use client";

import { useState, useEffect } from "react";

const UserTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8069/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data); // Assuming the data is returned as an array
      } catch (error: any) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-200 py-10">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-black font-bold text-center mb-6">User Records</h1>
        <table className="min-w-full table-auto border-separate border-spacing-0 border border-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-black text-black text-left">Full Name</th>
              <th className="py-2 px-4 border border-black text-black text-left">Email</th>
              <th className="py-2 px-4 border border-black text-black text-left">Role</th>
              <th className="py-2 px-4 border border-black text-black text-left">Specific Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border border-black text-black">{user.fullName}</td>
                <td className="py-2 px-4 border border-black text-black">{user.email}</td>
                <td className="py-2 px-4 border border-black text-black">{user.role}</td>
                <td className="py-2 px-4 border border-black text-black">{user.specificName || "No Specific Name"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
