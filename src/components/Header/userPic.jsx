import React from "react";
import Profile from '../../assets/Profile.png'

function UserPic({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
    >
      <img
        src={Profile}
        alt="User Profile"
        className="w-full h-full object-cover"
      />
    </button>
  );
}

export default UserPic;
