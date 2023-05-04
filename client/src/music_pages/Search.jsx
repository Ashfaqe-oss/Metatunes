import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Error, Loader, SongCard } from '../music_components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = ({setRoute}) => {
  setRoute('Search');
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  // console.log(data);
  // const songs = data?.map((song) => song.track);


  if (isFetching) return <Loader title={`Searching for ${searchTerm}...`} />;

  if (error) return <Error />;
  // console.log(songs)

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mb-10">Showing results for <span className="font-black">{searchTerm}</span></h2>

      <div className="flex flex-wrap  justify-center gap-8 items-center ">
        {data?.data?.map((song, i) => (
          
          <SongCard
            key={i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;