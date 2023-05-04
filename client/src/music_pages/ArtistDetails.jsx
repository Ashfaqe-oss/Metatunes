import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetArtistDetailsQuery,
  // useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { motion } from "framer-motion";
import {
  DetailsHeader,
  Error,
  Loader,
  RelatedSongs,
} from "../music_components";

const ArtistDetails = ({setRoute}) => {
  setRoute("artistDetails");
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  console.log(artistId);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  console.log(data);

  if (isFetchingSongDetails) return <Loader title="Searching Artist details" />;

  if (error) return <Error title="error loading Artist details . . ." />;

  return (
    <div className="flex flex-col mt-12 xl:mt-0">
      <DetailsHeader artistId={artistId} data={data} />


      {/* <RelatedSongs
        data={Object.values(data?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
    </div>
  );
};

export default ArtistDetails;
