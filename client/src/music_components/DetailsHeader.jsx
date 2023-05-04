import React from "react";
import { Link } from "react-router-dom";

function DetailsHeader({ artistId, artistData, songData }) {
  const artist = artistData?.artists[artistId]?.attributes;

  return (
    <div className="relative w-full flex flex-col my-8 xl:my-0">
      <div className="w-full rounded-2xl bg-gradient-to-l from-transparent to-gray-900 sm:h-48 h-28 p   -6" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={
            artistId
              ? artist?.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : songData?.images?.coverart
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist?.name : songData?.title}
          </p>

          {!artistId && (
            <Link to={`/mp/artists/${songData?.artists[0]?.adamid}`}>
              <p className="text-base">{songData?.subtitle}</p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artist?.genreNames[0]
              : songData?.genres?.primary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
