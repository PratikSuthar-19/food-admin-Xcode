
import { useLocation, useParams } from "react-router-dom";
import UserForm from "../components/ui/UserForm";
import type{ User } from "../api/users";

export default function EditUser() {
  const { id } = useParams();
  const location = useLocation();
  const userData = location.state as User | undefined;

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p className="text-lg text-red-400 mb-3">No user data passed.</p>
        <a href="/users" className="text-blue-400 underline">Go back to Users</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-4">
      <UserForm mode="edit" initialData={userData} userId={id!} />
    </div>
  );
}

