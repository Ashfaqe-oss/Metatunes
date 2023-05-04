import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";
import { motion } from "framer-motion";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    {/* <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" /> */}
    {/* {currentSongs?.length && ( */}
      <MdSkipPrevious
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handlePrevSong}
      />
    {/* )} */}
    {isPlaying ? (
      <motion.div whileHover={{ scale: 1.1 }} className="mx-3">
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      </motion.div>
    ) : (
      <motion.div whileHover={{ scale: 1.1 }} className="mx-3">
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      </motion.div>
    )}
    {/* {currentSongs?.length && ( */}
      <MdSkipNext
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handleNextSong}
      />
    {/* )} */}
    {/* <BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" /> */}
  </div>
);

export default Controls;
