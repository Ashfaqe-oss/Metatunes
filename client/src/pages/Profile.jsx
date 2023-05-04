import React, { useState, useEffect } from "react";
// import { DotWave } from "@uiball/loaders";
// import CampaignDetails from "./CampaignDetails";
import { useStateContext } from "../context";
import { DisplayCampaigns, Loader } from "../components";

const Profile = () => {
  const [isLoading, setisLoading] = useState(false);
  const [campaigns, setcampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setisLoading(true);
    const campaigns = await getUserCampaigns();
    setcampaigns(campaigns);
    setisLoading(false);
  };

  //as we can't have await in useEffect, we need to use a function inside useEffect
  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
    return () => {
      // console.log("fetched campaigns");
    };
  }, [address, contract]);
  return (
    <div className="flex font-epilogue text-[12px] flex-col items-center justify-center">
      <h1 className="p-8 border-lime-100">Profile</h1>
      {isLoading && <Loader />}
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Profile;
