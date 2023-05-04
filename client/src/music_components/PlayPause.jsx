import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <motion.div whileHover={{ scale: 1.1 }}>
      <FaPauseCircle
        className="cursor-pointer text-gray-300"
        size={35}
        onClick={handlePause}
        title="Pause"
      />
    </motion.div>
  ) : (
    <motion.div whileHover={{ scale: 1.1 }}>
      <FaPlayCircle
        className="cursor-pointer text-gray-300"
        size={35}
        onClick={handlePlay}
        title="Play"
      />
    </motion.div>
  );

export default PlayPause;
