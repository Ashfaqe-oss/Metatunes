import React, { useState, useEffect } from "react";
import { Loader } from "../components";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import {
  collection, query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const Profile = ({ setRoute }) => {
  setRoute("profile");
  const [isLoading, setisLoading] = useState(false);
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const songs = [];
  const [songList, setsongList] = useState([]);

  //searching songs
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  //authoring user
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
  }, []);

  //fetching user songs
  const fetchingUserSongs = async (userId) => {
    setisLoading(true);
    const usersRef = collection(db, "users");

    const q = query(
      usersRef,
      where("userId", "==", userId),
      orderBy("songs.timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=> ", doc.data())
      songs.push(doc?.data()?.songs);
    });
    // console.log(songs)
    setsongList(songs);
    setisLoading(false);
    // return songs;
  };

  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    fetchingUserSongs(userId);
  }, [userId]);

  //searching songs
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = songList.filter(
          (song) =>
            song.title.toLowerCase().includes(searchText.toLowerCase()) ||
            song.subtitle.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(searchResults);
      }, 500)
    );
  };

  {
    isLoading && <Loader />;
  }

  return (
    <div className="flex font-epilogue text-[12px] sm:text-[14px] flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="p-2 border-lime-100">Profile</h1>

        <h2 className="p-4 text-lg sm:text-xl text-center">
          {userId
            ? `Hello,  ${user?.displayName}, here are the Songs you've played ..`
            : "Please Login to see your Songs"}
        </h2>

        <div className="flex-1 w-full m-6 py-3 mx-6 pl-4 pr-4 h-[52px] bg-[#1c1c24] rounded-[100px]">
          <input
            type="text"
            placeholder="Search songs you have played"
            value={searchText}
            onChange={handleSearchChange}
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap mt-8 justify-center gap-2 items-center max-w-[768px]">
        {userId && searchText
          ? searchResults.map((song, i) => (
              <div
                className={`w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-2 sm:p-4 rounded-lg cursor-pointer mb-2`}
                key={song.key + i}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex-1 flex flex-row justify-between items-center">
                  <img
                    className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg"
                    src={song?.images?.cover}
                    alt={song?.title}
                  />
                  <div className="flex-1 flex flex-col justify-center mx-3 md:mx-5">
                    <p className="text-lg sm:text-xl font-bold text-white truncate">
                      {song?.title.length > 24
                        ? song?.title.slice(0, 25) + ".."
                        : song?.title}
                    </p>

                    <motion.p
                      className="text-xs sm:text-base text-gray-300 mt-1 truncate hover:underline"
                      whileHover={{ scale: 0.98 }}
                    >
                      {song?.subtitle.length > 37
                        ? song?.subtitle.slice(0, 38) + ".."
                        : song?.subtitle}
                    </motion.p>
                    <motion.p
                      className="text-xs sm:text-base text-gray-300 mt-1 truncate hover:underline"
                      whileHover={{ scale: 0.98 }}
                    >
                      {song?.timestamp?.toDate().toDateString()}
                    </motion.p>
                  </div>
                </div>
              </div>
            ))
          : songList.map((song, i) => (
              <div
                className={`w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-2 sm:p-4 rounded-lg cursor-pointer mb-2`}
                key={song.key + i}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex-1 flex flex-row justify-between items-center">
                  <img
                    className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg"
                    src={song?.images?.cover}
                    alt={song?.title}
                  />
                  <div className="flex-1 flex flex-col justify-center mx-3 md:mx-5">
                    <p className="text-lg sm:text-xl font-bold text-white truncate">
                      {song?.title.length > 24
                        ? song?.title.slice(0, 25) + ".."
                        : song?.title}
                    </p>

                    <motion.p
                      className="text-xs sm:text-base text-gray-300 mt-1 truncate hover:underline"
                      whileHover={{ scale: 0.98 }}
                    >
                      {song?.subtitle.length > 37
                        ? song?.subtitle.slice(0, 38) + ".."
                        : song?.subtitle}
                    </motion.p>
                    <motion.p
                      className="text-xs sm:text-base text-gray-300 mt-1 truncate hover:underline"
                      whileHover={{ scale: 0.98 }}
                    >
                      {song?.timestamp?.toDate().toDateString()}
                    </motion.p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Profile;