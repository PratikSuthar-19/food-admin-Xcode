import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { createUser, updateUser } from "../../api/users";
import type { User } from "../../api/users";
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  mode?: "create" | "edit";
  initialData?: User;
  userId?: string;
}

export default function UserForm({ mode = "create", initialData, userId }: UserFormProps) {
  const navigate = useNavigate();

  // initialize form data
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    mobile: initialData?.mobile || "",
  });
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle password input separately
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "edit" && userId) {
        // update user (no password field)
        await updateUser(userId, formData);
        setMessage(" User updated successfully!");
      } else {
        // create user (include password)
        const payload = { ...formData, password };
        await createUser(payload);
        setMessage(" User created successfully!");
        setFormData({ name: "", email: "", mobile: "" });
        setPassword("");
      }

      setTimeout(() => navigate("/users"), 1000);
    } catch (err: any) {
      console.error(err);
      setMessage(" Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl border border-gray-800 bg-neutral-950 text-white shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-6">
        {mode === "edit" ? "Edit User" : "Create User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

  
        {mode === "create" && (
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            required
          />
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {loading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update User"
            : "Create User"}
        </Button>
      </form>

      {message && (
        <p
          className={`text-center text-sm mt-4 ${
            message.includes("Error") ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

