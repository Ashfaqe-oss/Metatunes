/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import Error from "../Error";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  let src

  // console.log(typeof activeSong?.hub?.actions[1]);
  if (activeSong?.preview !== "undefined") {
    src = activeSong?.preview;
  } else {
    <Error title="Song data does not exist. Pls hear other songs.." />;
  }

  // : activeSong?.hub?.options[0]?.actions[0]
  // console.log(src);

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={src}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
