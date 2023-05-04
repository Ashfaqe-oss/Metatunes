import React from 'react';
import SongBar from './SongBar';


function RelatedSongs({data, isPlaying, activeSong, handlePauseClick, handlePlayClick}) {
  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl'>Related Songs :</h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.filter(song => song?.hub.actions && song.images)?.map((song, i) => (
          <SongBar
            key={`${song.key}-${i}`}
            i={i}
            song={song}
            isPlaying={isPlaying}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedSongs