import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";

//the Awesome reusable Sidebar Components
//Reuse this !!!
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  //use () instead of {} to instant return JSX
  <div
    className={`${
      name &&
      "relative group hover:w-full delay-75 duration-300 hover:ease-in-out hover:p-6 hover:px-8"
    }  w-[48px] h-[48px]  rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } hover:bg-[#2c2f32] flex justify-center items-center cursor-pointer ${
      disabled && "cursor-not-allowed"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-6 h-6 ${name && "hover:w-full"}`}
      />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-6 h-6 ${name && "hover:w-full"} ${
          isActive !== name && "greyscale hover:animate-ping"
        }`}
      />
    )}
    <p
      className={`group-hover:block left-3 hidden ml-[20px] font-epilogue font-semibold text-[14px] ${
        isActive === name ? "text-[#1dc071]" : "text-[#808191]"
      }`}
    >
      {name}
    </p>
  </div>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState("dashboard"); //to control highlight of the active link

  const { disconnect } = useStateContext();

  return (
    <div className="flex justify-between top-5 h-[93vh] sticky flex-col items-center">
      <Link to="/">
        <Icon className="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex-1 flex-col items-center justify-between bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-4">
          {navlinks.map((Link) => (
            <div key={Link.name}>
              <Icon
                key={Link.name}
                {...Link} //spreading all the link properties
                isActive={isActive}
                disabled={Link.disabled}
                handleClick={() => {
                  if (!Link.disabled) {
                    setisActive(Link.name);
                    navigate(Link.link);
                    if (Link.name === "Disconnect Wallet") {
                      disconnect();
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Icon imgUrl={sun} styles="bg-[#1c1c24] shadow-secondary" />
    </div>
  );
}
