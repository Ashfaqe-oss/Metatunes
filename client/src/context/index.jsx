import { ethers } from "ethers";
import React, { useContext, createContext } from "react";
import {
  useAddress,
  useDisconnect,
  useContract,
  useMetamask,
  useWalletConnect,
  useContractWrite,
} from "@thirdweb-dev/react";
import { parse } from "@ethersproject/transactions";

const StateContext = createContext();

//context provider has children inside props, with which we can wrap our entire react app and have access to its children
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x28a66ff3EE907f01760c43f52D19Daf89a2e8b55"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = window.innerWidth > 640 ? useMetamask() : useWalletConnect();
  // useMetamask() && window.innerWidth < 640 connect =

  const disconnect = useDisconnect();
  //this is all that is needed to interact with our smart contract

  //now writing functions

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.songUrl,
        form.image,
      ]);

      console.log("Contract call success" + data);
    } catch (err) {
      console.error("Contract call failed" + err);
    }
  };

  //reusable code to fetch from contract and parse the received data into only required fields

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    //getting only the meaningful data from the campaigns
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()), //formattign ether
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      donations: campaign.donations,
      donators: campaign.donators,
      image: campaign.image,
      songUrl: campaign.songUrl,
      pId: i, //just the index of the campaign
    }));
    // console.log(parsedCampaigns);

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    console.log(filteredCampaigns);

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    // const donations = await contract.call('getDonators', pId);

    // console.log(pId);

    // const allCampaigns = await getCampaigns();
    // // const parsedDonations = [];
    // const filteredCampaigns = allCampaigns.filter(
    //   (campaign) => campaign.pId == pId
    // );

    // console.log(filteredCampaigns);

    // const parsedDonators = donations.map((campaign, i) => ({
    // donator: campaign.donations[0][i],
    // donation: ethers.utils.formatEther(campaign.donations[1][i].toString()),
    // target: ethers.utils.formatEther(campaign.target.toString()),
    // deadline: campaign.deadline.toNumber(),
    // amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
    // image: campaign.image,
    // pId: i //index of the campaign
    //   }));

    // const parsedCampaigns = filteredCampaigns.map((campaign) => ({
    //   donations: campaign.donations.map((donation) => ({
    //     donation: ethers.utils.formatEther(campaign.target.toString()),
    //   })),
    //   donators: campaign.donators, //only donations and donators are available
    // }));

    // console.log(parsedCampaigns.donations)

    // const numberOfDonations = donations[0].length;

    // for(let i = 0; i < numberOfDonations; i++) {
    //   parsedDonations.push({
    //     donator: donations[0][i],
    //     donation: ethers.utils.formatEther(donations[1][i].toString())
    //   })
    // }

    // return parsedDonations;

    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      if (donations[1][i]) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }
    }

    return parsedDonations;
    // return parsedCampaigns;
  };

  return (
    <StateContext.Provider
      value={{
        connect,
        address,
        disconnect,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//creatin a custom hook to use the context that we created
export const useStateContext = () => useContext(StateContext);
