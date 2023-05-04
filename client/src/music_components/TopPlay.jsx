import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { motion } from "framer-motion";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
// import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

export default function TopPlay({data}) {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  const country_code = 'IN'
  // const { data } = useGetTopChartsQuery({country_code});

  const topPlays = data?.data?.slice(0,4 );

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div ref={divRef} className="xl:ml-8 md:mx-6">
      <div className="flex w-full flex-col">
        <div className="flex flex-row justify-between items-center pt-2">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/mp/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          {topPlays?.map((song, i) => (
            <motion.div
              className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
                activeSong?.title === song?.title
                  ? "bg-[#4c426e]"
                  : "bg-transparent"
              } py-2 p-2 sm:p-4 rounded-lg cursor-pointer mb-2`}
              key={song.id}
              whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.9 }}
            >
              <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg"
                  src={song?.album?.cover_big}
                  alt={song?.title_short}
                />
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <Link to={`/mp/songs/${song.id}`}>
                    <p className="text-xl font-bold text-white truncate">
                      {song?.title.length > 15 ? song?.title.slice(0,14) + '..' : song?.title}
                    </p>
                  </Link>
                  {/* <Link to={`/mp/artists/${song?.artists[0].adamid}`}> */}
                    <motion.p className="text-base text-gray-300 mt-1 truncate hover:underline" whileHover={{ scale: 0.98 }}>
                      {song?.title.length > 25 ? song?.title.slice(0,24) + '..' : song?.title}
                    </motion.p>
                  {/* </Link> */}
                </div>
              </div>
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(song, i)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col mt-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/mp/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {data?.data?.slice(4, 11)?.map((song) => (
            <SwiperSlide
              key={song.id}
              style={{ width: "25%", height: "auto" }}
              className=""
            >
              {/* <Link to={`/mp/artists/${song?.artists[0]?.adamid}`}> */}
                <motion.img
                  src={song?.album?.cover_big}
                  alt={song.title_short}
                  className="w-full rounded-full object-cover"
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 1.01 }}
                />
              {/* </Link> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

// export default TopPlay;

{
  /* <motion.div
              className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
                activeSong?.title === song?.title
                  ? "bg-[#4c426e]"
                  : "bg-transparent"
              } py-2 p-2 sm:p-4 rounded-lg cursor-pointer mb-2`}
              key={song.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg"
                  src={song?.images?.coverart}
                  alt={song?.title}
                />
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <Link to={`/songs/${song.key}`}>
                    <p className="text-xl font-bold text-white truncate">
                      {song?.title}
                    </p>
                  </Link>
                  <Link to={`/artists/${song?.artists[0].adamid}`}>
                    <p className="text-base text-gray-300 mt-1 truncate">
                      {song?.title}
                    </p>
                  </Link>
                </div>
              </div>
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
              />
            </motion.div> */
}

// <TopChartCard
// key={song.key}
// song={song}
// i={i}
// isPlaying={isPlaying}
// activeSong={activeSong}
// handlePauseClick={handlePauseClick}
// handlePlayClick={() => handlePlayClick(song, i)} />



// const TopChartCard = ({
//   song,
//   i,
//   isPlaying,
//   activeSong,
//   handlePlayClick,
//   handlePauseClick,
// }) => {
//   <motion.div
//     className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
//       activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
//     } py-2 p-2 sm:p-4 rounded-lg cursor-pointer mb-2`}
//     key={song.key}
//     whileHover={{ scale: 1.05 }}
//     // whileTap={{ scale: 0.9 }}
//   >
//     <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
//     <div className="flex-1 flex flex-row justify-between items-center">
//       <img
//         className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg"
//         src={song?.images?.coverart}
//         alt={song?.title}
//       />
//       <div className="flex-1 flex flex-col justify-center mx-3">
//         <Link to={`/songs/${song.key}`}>
//           <p className="text-xl font-bold text-white truncate">{song?.title}</p>
//         </Link>
//         <Link to={`/artists/${song?.artists[0].adamid}`}>
//           <p className="text-base text-gray-300 mt-1 truncate">
//             {song?.title}
//           </p>
//         </Link>
//       </div>
//     </div>
//     <PlayPause
//       isPlaying={isPlaying}
//       activeSong={activeSong}
//       song={song}
//       handlePause={handlePauseClick}
//       handlePlay={(song, i) => handlePlayClick(song, i)}
//     />
//   </motion.div>;
// };
