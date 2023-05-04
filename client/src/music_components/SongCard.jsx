import { Link } from "react-router-dom";
//import useDispatch
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { motion } from "framer-motion";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {

  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // console.log(song.id)
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-90 backdrop-blur-sm animate-slideup rounded-2xl cursor-pointer"
    >
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-gray-700 bg-opacity-50 group-hover:flex rounded-xl ${
            activeSong?.title === song.title
              ? "flex bg-gray-700 bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause song={song} handlePause={handlePauseClick} isPlaying={isPlaying} activeSong={activeSong} handlePlay={handlePlayClick} />
        </div>
        <img
          src={song.album?.cover_big}
          alt={song.title_short}
          className="w-full h-full rounded-xl"
        />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-semibold text-lg text-white">
          <Link to={`/songs/${song?.id}`}>
          {song.title}
          </Link>
        </p>

        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.artist ? `/artists/${song?.artist?.id}` : '/top-artists' }>{song?.subtitle}</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SongCard;
