import React, { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { loginUser } from "../api/auth";
import { Link , useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";

export default function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle input change (dynamic)
//   VITE_CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload
// VITE_CLOUDINARY_UPLOAD_PRESET=<your-upload-preset></your-upload-preset>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData); // passing full object
      console.log("✅ Login success:", res);
      localStorage.setItem("token", res.data.token)
        setTimeout(() => navigate("/"), 1000)
      alert("Login successful!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 border border-gray-800 rounded-2xl bg-black shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 hover:text-gray-300 transition-colors duration-200"
                  >
                    signup
                  </Link>
                </p>
      </div>
    </div>
    </>
  );
}
