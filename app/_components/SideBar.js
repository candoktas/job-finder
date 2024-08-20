"use client";

import { useSelector } from "react-redux";

function SideBar(props) {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  if (!user) return null;

  return (
    <div className="bg-white w-4/12 min-h-screen p-4 border-black border">
      <img
        src={user.profileImage || "https://i.pravatar.cc/300"}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-lg font-semibold text-center mt-4">{user.email}</h2>
      <h3 className="text-xl font-semibold text-center mt-6">Applied Jobs</h3>
      {/* Applied Jobs will be added */}
    </div>
  );
}

export default SideBar;
