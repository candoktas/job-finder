"use client";

import { useSelector } from "react-redux";

function UserAvatar(props) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="flex justify-center items-center gap-4 px-4">
      <h2 className="text-md font-light text-center">{user.email}</h2>
      <img
        src={user.profileImage}
        alt="User Avatar"
        className="w-8 h-8 md:w-14 md:h-14 rounded-full mx-auto"
      />
    </div>
  );
}

export default UserAvatar;
