import { useEffect, useRef, useState } from "react";
import { getUsers, deleteUser } from "../../api/users";
import type{User} from '../../api/users'
import { Input } from "../ui/Input";
import ConfirmDialog from "../ui/ConfirmDialog";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!hasMore || loading) return;
      setLoading(true);
      try {
        const res = await getUsers();
        const filtered = res.filter(
          (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.mobile.includes(search)
        );
        setUsers(filtered);
        setHasMore(false); // for now fetch all at once
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, search]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, hasMore]);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser?._id) return;
    try {
      await deleteUser(selectedUser._id);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirm(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="w-full text-white">
      {/* Top bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search users by name, email or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xl bg-transparent border border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <Button
          onClick={() => navigate("/users/create")}
         className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-lg px-4 py-2"
        >
          + Create User
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-neutral-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Mobile</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-gray-800">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-900 transition-colors duration-150">
                  <td className="px-4 py-3 text-sm text-gray-100">{u.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{u.mobile}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/users/edit/${u._id}`)}
                        className="text-sm px-3 py-1 rounded-md border border-gray-700 hover:bg-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(u)}
                        className="text-sm px-3 py-1 rounded-md border border-red-700 text-red-400 hover:bg-red-900/30"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-neutral-950 hover:bg-gray-900 transition"
          >
            <div>
              <div className="text-lg text-white font-medium">{u.name}</div>
              <div className="text-sm text-gray-400">{u.email}</div>
              <div className="text-sm text-gray-500">{u.mobile}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                // onClick={() => navigate(`/users/edit/${u._id}`)}
                onClick={() => navigate(`/users/edit/${u._id}`, { state: u })}

                className="text-sm text-orange-400 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(u)}
                className="text-sm text-red-400 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} />

      {/* Loading & Errors */}
      <div className="mt-4 flex items-center justify-center">
        {loading && <div className="text-gray-400">Loading...</div>}
        {error && <div className="text-red-400">{error}</div>}
      </div>

      {showConfirm && (
        <ConfirmDialog
          title={`Delete "${selectedUser?.name}"?`}
          message="This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
