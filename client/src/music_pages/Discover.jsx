import React from "react";
import { Error, Loader, SongCard } from "../music_components";
import { genres } from "../assets/constants";
// import {useGetTopChartsQuery} from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";

const Discover = ({setRoute, data, isFetching, error}) => {
  // const {loading, error, songs} = useSelector((state) => state.discover);
  setRoute("discover");
  const country_code = 'IN'
  // const {data, isFetching, error} = useGetTopChartsQuery({country_code});
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  console.log(data);

  if(isFetching) return <Loader title="Loading songs ..." />
  if(error) <Error title="something went wrong. Please try again"/>

  return (
    <div className="flex flex-col mt-4 xl:mt-0">
      <div className="flex flex-col sm:flex-row w-full items-center justify-around mt-4 xl:mt-0 mb-10">
        <h1 className=" font-bold text-3xl mb-4 m-2">Discover</h1>
        <h4 className=" font-bold text-lg m-2">⬆️ Search for more songs</h4>
        <div className="flex flex-row items-center">
          <h1 className="text-sm font-bold m-2">Sort by</h1>
          <select className="bg-[#1c1c24] text-white font-bold ml-2 outline-none text-grey-300 text-sm rounded-xl p-3 pr-6 sm:mt-0">
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value} placeholder="genres">
                {genre.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row flex-wrap sm:justify-center justify-center gap-8 mt-5">
        {isFetching ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          data?.data?.filter(song => song?.preview)?.map((song, i) => <SongCard key={song.id} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={song} />)
        )}
      </div>
    </div>
  );
};

export default Discover;
