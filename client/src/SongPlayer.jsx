import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { MusicPlayer, TopPlay, Sidebar, Navbar } from "./music_components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Profile,
} from "./music_pages";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useGetTopChartsQuery } from "./redux/services/shazamCore";
import { db } from "./utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={location.pathname}
        initial={{ y: '0%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function SongPlayer() {
  const { activeSong } = useSelector((state) => state.player);
  const country_code = "IN";
  const auth = getAuth();
  const [currentRoute, setCurrentRoute] = useState(null);
  const { data, isFetching, error } = useGetTopChartsQuery({ country_code });

  const userId = auth?.currentUser?.uid;
  const location = useLocation();
  const [showStyle, setShowStyle] = useState(true);
  
  const addSongToFirestore = async (id, title, title_short, album, userId) => {

    if (activeSong?.id) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          userId: userId,
          songs: {
            key: id,
            title: title,
            subtitle: title_short,
            images: {
              cover: album?.cover_big,
            },
            timestamp: serverTimestamp(),
          },
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  useEffect(() => {
    if (activeSong?.id) {
      const { id, title, title_short, album } = activeSong;

      addSongToFirestore(id, title, title_short, album, userId);
    }

    // console.log(fetchingUserSongs);

    return () => {};
  }, [activeSong]);

  useEffect(() => {

    if(location.pathname === "/mp/profile") setShowStyle(false);
    else setShowStyle(true);
    
  }, [location.pathname]);

  return (
    <div className="flex relative sm:p-4">
      <div className="sm:flex hidden">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col bg-[#13131a]">
        {/* <Searchbar /> */}
        <Navbar />
        <div className={`px-4 ${showStyle && 'sm:p-6'} h-[clac(100vh-72px)]  flex xl:flex-row flex-col-reverse`}>
          <div className="flex-1 h-fit pb-40">
            <PageWrapper>
            <Routes>
              <Route
                path=""
                element={
                  <Discover
                    setRoute={setCurrentRoute}
                    data={data}
                    isFetching={isFetching}
                    error={error}
                  />
                }
              />
              <Route
                path="top-artists"
                element={<TopArtists setRoute={setCurrentRoute} />}
              />
              <Route
                path="top-charts"
                element={<TopCharts setRoute={setCurrentRoute} />}
              />
              <Route
                path="around-you"
                element={<AroundYou setRoute={setCurrentRoute} />}
              />
              <Route
                path="artists/:id"
                element={<ArtistDetails setRoute={setCurrentRoute} />}
              />
              <Route
                path="songs/:songid"
                element={<SongDetails setRoute={setCurrentRoute} />}
              />
              <Route
                path="search/:searchTerm"
                element={<Search setRoute={setCurrentRoute} />}
              />
              <Route
                path="profile"
                element={
                  <Profile
                    setRoute={setCurrentRoute}
                  />
                }
              />
            </Routes>
            </PageWrapper>
          </div>
          <div className="xl:sticky relative top-0 h-fit flex-0 xl:max-w-[500px]">
            {currentRoute === "discover" && <TopPlay data={data} />}
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="fixed h-28 m-2 sm:m-4 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#16844e] backdrop-blur-lg rounded-3xl sm:rounded-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default SongPlayer;




// const usersRef = collection(db, "users");

// const q = query(usersRef, where("userId", "==", userId));

// const querySnapshot = await getDocs(q);

// querySnapshot.forEach((doc) => {

//   doc?.data()?.songs.forEach(async (song) => {
//     console.log("reached forEach");
//     if (title !== song.title ) {
//       console.log("title not equal");
//       const docRef = await addDoc(collection(db, "users"), {
//         userId: userId,
//         songs: {
//           key: key,
//           title: title,
//           subtitle: subtitle,
//           images: {
//             cover: images?.coverart,
//           },
//         },
//       });

//       console.log("Document written with ID: ", docRef.id);
//       console.log("Document added to Firestore");
//     }
//   }

// );
// });
