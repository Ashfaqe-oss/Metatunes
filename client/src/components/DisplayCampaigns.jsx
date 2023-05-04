import React from "react";
import { useNavigate } from "react-router-dom";
// import { DotWave } from "@uiball/loaders";
import { FundCard } from "../components";

function DisplayCampaings({ title, isLoading, campaigns }) {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/cf/campaign-details/${campaign.title}`, { state: campaign });
  };//passing the entire data of the campaign as state to the react context

  return (
    <div className="w-full">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} - {campaigns.length}
      </h1>
      <div className="flex justify-center lg:justify-start flex-wrap mt-[20px] gap-[26px]">

        {/* chechking for null campaigns */}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">There are no campaigns yet.</p>
        )}

        {/* rendering the campaign */}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id + campaign.title}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default DisplayCampaings;
