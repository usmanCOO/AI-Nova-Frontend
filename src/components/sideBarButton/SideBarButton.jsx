import React from "react";
import { Link } from "react-router-dom";

function SideBarButton({ label, icon, link, handleClick, pathname }) {
  return (
    <Link to={link}>
      <div
        className="flex items-center px-1 w-full mt-2 gap-2 rounded-lg"
        onClick={handleClick}
      >
        <span className="p-1 rounded-[50%] bg-[#D3B1FF]">{icon}</span>
        <p
          className={`text-[10px] py-2 rounded-lg ${
            pathname === link ? "bg-[#D3B1FF]" : "bg-[#EDF6FC]"
          } px-1 w-full text-center font-black`}
        >
          {label}
        </p>
      </div>
    </Link>
  );
}

export { SideBarButton };
