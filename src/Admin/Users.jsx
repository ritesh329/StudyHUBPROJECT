import { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "Ashutosh Maurya",
    email: "ashutoshmaurya2333@gmail.com",
    role: "Student",
    status: "Active",
  },
  {
    id: 2,
    name: "AkaSh Maurya",
    email: "akashmaurya32332@gmail.com",
    role: "Teacher",
    status: "Active",
  },
  {
    id: 3,
    name: "Ritesh Maurya",
    email: "riteshmaurya32442@gmail.com",
    role: "Student",
    status: "Active",
  },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);

  // Block / Unblock
  const toggleBlock = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>

        <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
          Total Users: {users.length}
        </div>
      </div>

      {/* Users Grid */}
      {/* Users Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {users.map((user) => (
    <div
      key={user.id}
      className="
        bg-white/40
        backdrop-blur-md
        border border-gray-200
        rounded-xl
        p-5
        shadow-md
        transition-all
        hover:shadow-lg
        md:hover:scale-[1.04]
      "
    >
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-800 break-all">{user.email}</p>

      <div className="flex flex-col sm:flex-row sm:justify-between mt-3 text-sm gap-1">
        <span>
          Role: <b>{user.role}</b>
        </span>
        <span
          className={`font-semibold ${
            user.status === "Active" ? "text-green-600" : "text-red-500"
          }`}
        >
          {user.status}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={() => toggleBlock(user.id)}
          className={`px-4 py-2 rounded text-white ${
            user.status === "Active"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {user.status === "Active" ? "Block" : "Unblock"}
        </button>

        <button
          onClick={() => deleteUser(user.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
