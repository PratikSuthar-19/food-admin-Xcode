import UserForm from "../components/ui/UserForm";

export default function CreateUser() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-4">
      <UserForm mode="create" />
    </div>
  );
}
