"use client";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../Context/AuthContext";

const AdminLogin = () => {
  const router = useRouter();
  const { login, getMe } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      console.log(res);
      if (res.success) {
        toast.success("Login Successfully");
        router.push("/admin");
        getMe();
      } else {
        toast.error(res.message || "Login failed.");
      }
    } catch (error) {
      toast.error("Invalid credentials or server error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-[100vh] w-[100vw] overflow-hidden flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-4xl tracking-wider font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
