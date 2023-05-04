import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CustomButton, Icon } from "../components"; //inside the same directory
import { logo, menu, search, thirdweb } from "../assets";
import { musicNavlinks } from "../constants";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { provider } from "../utils/firebaseConfig";

export default function Navbar() {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState("dashboard");
  const [toggle, setToggle] = useState(false);

  const [searchTerm, setsearchTerm] = useState("");
  const [user, setUser] = useState(null);

  const [showSearch, setShowSearch] = useState(true);

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/mp/search/${searchTerm}`);
  };

  const auth = getAuth();

  const handleLogIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  };

  const handleLogOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
      alert("something went wrong can't sign out");
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [handleLogIn, handleLogOut]);

  useEffect(() => {
    if (location.pathname === "/mp/profile") setShowSearch(false);
    else setShowSearch(true);

  }, [location]);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 m-5">
      {/* search functionality */}
      {showSearch && (
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="lg:flex-1 flex flex-row max-w-[458px] py-2 mx-6 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]"
        >
          <input
            type="text"
            placeholder="Search for Songs, Artists, Albums, Playlists, etc."
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          />
          <button
            type="submit"
            className="flex justify-center items-center cursor-pointer rounded-[20px] w-[72px] "
          >
            <img
              src={search}
              alt="search icon"
              className="w-[15px] h-[15px] object-contain"
            />
          </button>
        </form>
      )}

      {!showSearch && <div className="lg:flex-1"></div>}

      {/* profile icon section */}
      <div className="sm:flex flex-row hidden justify-end gap-4">
        <CustomButton
          btnType="button"
          title={user ? user?.displayName.slice(0, 13) : `Sign In`}
          handleClick={!user ? handleLogIn : handleLogOut}
          styles={user ? "bg-[#8c6dfd]" : "bg-[#1dc071]"} //do for if address present
        />

        <Link to="/">
          <div className="w-[52px] h-[52px] flex rounded-full bg-[#2c2f32] justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex flex-row justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[34px] h-[34px] object-contain cursor-poiter"
            onClick={() => navigate("/")}
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[30px] h-[30px] object-contain cursor-pointer"
          onClick={() => (!toggle ? setToggle(true) : setToggle(false))}
        />
        {/* need changes */}
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggle ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {musicNavlinks.map((Link) => (
              <li
                key={Link.name}
                className={`flex p-4 ${
                  isActive === Link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setisActive(Link.name);
                  setToggle(false);
                  navigate(Link.link);
                  if (Link.name === "logout") {
                    disconnect();
                    alert("logout successful");
                  }
                }}
              >
                <img
                  src={Link.imgUrl}
                  alt={Link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === Link.name ? "greyscale-0" : "greyscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === Link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {Link.name}
                </p>
              </li>
            ))}
          </ul>

          <div>
            <CustomButton
              btnType="button"
              title={user ? user?.displayName.slice(0, 13) : `Sign In`}
              handleClick={!user ? handleLogIn : handleLogOut}
              styles={user ? "bg-[#8c6dfd]" : "bg-[#1dc071]"} //do for if address present
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//flex-col-reverse ---reverses the order of the flex items, here the button
