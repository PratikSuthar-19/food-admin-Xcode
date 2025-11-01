import React, { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { signupUser } from "../api/auth";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signupUser(formData);
      console.log("Signup success:", res);
      alert("Account created successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 border border-gray-800 rounded-2xl bg-black shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account ✨</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
             name="name" 
             placeholder="Name" 
             value={formData.name} 
             onChange={handleChange}
          />
          <Input 
             name="email" 
             type="email" 
             placeholder="Email" 
             value={formData.email} 
             onChange={handleChange} 
          />
          <Input 
             name="mobile" 
             type="tel" 
             placeholder="Mobile" 
             value={formData.mobile} 
             onChange={handleChange} 
          />
          <Input 
             name="password" 
             type="password" 
             placeholder="Password" 
             value={formData.password} 
             onChange={handleChange} 
          />
          <Button 
             type="submit" 
             className="w-full mt-4">
                Sign Up
          </Button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-gray-300 transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
