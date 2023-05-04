import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { createCampaign, money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";
import { DotWave } from "@uiball/loaders";
import { useStateContext } from "../context";

function CreateCampaign() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  // const minDate = new Date;
  // console.log(minDate.toDateString())

  const { createCampaign } = useStateContext();
  const [form, setform] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    songUrl: "",
  }); //useState can also have an object

  const handleSubmit = async (e) => {
    //onSubmit of form
    e.preventDefault();

    checkIfImage(form.image, form.songurl, async (exists) => {
      if (await exists) {
        setisLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setisLoading(false);
        navigate("/");
        alert("Campaign created successfully !");
      } else {
        alert("Provide valid image url and/or songUrl");
        setform({...form, image: '', songUrl:''}); //coool
      }
    });

    console.log(form);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-xl sm:p-10 ">
      {isLoading && <DotWave size={47} speed={1} color="#4acd8d" />}

      <div className="flex justify-center items-center p-4 sm:min-w-[280px] bg-[#3a3a43] rounded-xl ">
        <h1
          id="start"
          className="font-epilogue font-bold sm:text-2xl text-lg leading-[38px]"
        >
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.name}
            handleChange={(e) => setform({ ...form, name: e.target.value })}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="give a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => setform({ ...form, title: e.target.value })}
          />
        </div>

        <FormField
          labelName="Song Description *"
          placeholder="All about the tune !"
          inputType="text"
          isTextArea={true}
          value={form.description}
          handleChange={(e) =>
            setform({ ...form, description: e.target.value })
          }
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money icon"
            className="w-[40px] h-[40px] object-contain"
          />

          <h4 className="font-epilogue font-bold text-[25px] text-white ml-5">
            You get 100% of the eth raised
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          {/* <FormField
            labelName="Goal amt *"
            placeholder="max 2 eth"
            inputType="text"
            step="0.01"
            max="2"
            value={form.target}
            handleChange={(e) => setform({ ...form, target: e.target.value })}
          /> */}
          <label className="flex-1 w-full flex flex-col m-1">
            <span className="font-epilogue font-medium text-sm leading-[22px] text-[#808191] mb-2">
              Goal amt *{" "}
            </span>

            <input
              required
              value={form.target}
              onChange={(e) => setform({ ...form, target: e.target.value })}
              type="number"
              step="0.01"
              max="2"
              placeholder="max 2 eth"
              className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] font-epilogue font-medium text-sm leading-[22px] placeholder:text-[#4b5264] text-[#808191] bg-transparent rounded-xl sm:min-w-[360px]"
            />
          </label>
          {/* <FormField
            labelName="End Date *"
            placeholder="End date of your Campaign"
            inputType="date"
            max="2027-12-30"
            // min=
            value={form.deadline}
            handleChange={(e) => setform({ ...form, deadline: e.target.value })}
          /> */}

          <label className="flex-1 w-full flex flex-col m-1">
            <span className="font-epilogue font-medium text-sm leading-[22px] text-[#808191] mb-2">
              End Date *{" "}
            </span>

            <input
              required
              value={form.deadline}
              onChange={(e) => setform({ ...form, deadline: e.target.value })}
              type="date"
              max="2027-12-30"
              min="2023-1-1"
              placeholder="End date of your Campaign"
              className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] font-epilogue font-medium text-sm leading-[22px] placeholder:text-[#4b5264] text-[#808191] bg-transparent rounded-xl sm:min-w-[360px]"
            />
          </label>
        </div>

        <FormField
          labelName="Image *"
          placeholder="Place image url for your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => setform({ ...form, image: e.target.value })}
        />
        <FormField
          labelName="Song url *"
          placeholder="Your campaign song "
          inputType="url"
          value={form.songUrl}
          handleChange={(e) => setform({ ...form, songUrl: e.target.value })}
        />

        <div className="flex justify-center items-center mt-">
          <CustomButton
            btnType="submit"
            title="Submit campaign"
            handleClick={() => {}}
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
