import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-0.5 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} block h-10 w-10 ssm:h-16 sm:w-16 mr-4`}>
      <img src={activeSong?.album?.cover_big} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[25vw] md:w-[20vw] lg:w-[10vw]">
      <p className="truncate text-white font-bold text-lg w-[100%]">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.artist?.name ? activeSong?.artist?.name : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
