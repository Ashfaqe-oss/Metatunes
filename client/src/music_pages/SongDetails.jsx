import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { motion } from "framer-motion";
import {
  DetailsHeader,
  Error,
  Loader,
  RelatedSongs,
} from "../music_components";

const SongDetails = ({setRoute}) => {
  setRoute("songDetails");
  const dispatch = useDispatch();
  const { songid } = useParams();
  // console.log(songid);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails, error1 } = useGetSongDetailsQuery({ songid });

  // console.log(songData);

  const artistId = songData?.sections[0].metadata?.artistid;

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error2,
  } = useGetSongRelatedQuery({ songid });

  // console.log(data);


  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongDetails && isFetchingRelatedSongs)
    return <Loader title="Searching song details" />;


    if(error1 || error2) return <Error title="error loading songs." />

  return (
    <div className="flex flex-col xl:mt-0 xl:max-w-[800px] xl:mx-auto">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-3xl font-bold md:ml-6 my-8">Lyrics :</h2>

        <div className="mt-5 m-8 text-center">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text?.map((line, i) => (
              <motion.p
                key={i}
                whileInView={{ scale: 1.1, opacity: 1 }}
                className="text-white opacity-80 text-base my-2"
              >
                {line}
              </motion.p>
            ))
          ) : (
            <p
              whileInView={{ scale: 1.1, opacity: 1 }}
              className="text-white opacity-80 text-base my-2"
            >
              Sorry, No lyrics Found !
            </p>
          )}
        </div>
      </div>

      <RelatedSongs 
      data={data}
      artistId={artistId}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePauseClick={handlePauseClick}
      handlePlayClick={handlePlayClick}/>
    </div>
  );
};

export default SongDetails;
