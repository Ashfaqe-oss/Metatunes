import React, { useState } from "react";
import { styles } from "../utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  textContainer,
  textVariant2,
  staggerContainer,
  slideIn,
  fadeIn,
} from "../utils";
import { exploreWorlds } from "../constants";
import { headset } from "../assets";

// Exxplore Card.jsx
export const ExploreCard = ({
  id,
  imgUrl,
  title,
  p,
  link,
  index,
  active,
  handleClick,
}) => {
    const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.8)}
      className={`relative ${
        active === id ? "lg:flex-[1.25] flex-[10]" : "lg:flex-[0.5] flex-[2]"
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
      onClick={() => handleClick(id)}
    >
      <img
        src={imgUrl}
        alt="planet-04"
        className="absolute w-full h-full object-cover rounded-[24px]"
      />
      {active !== id ? (
        <h3 className="font-bold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-[100px] lg:rotate-[-90deg] lg:origin-[0,0]">
          {title}
        </h3>
      ) : (
        <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.6)] rounded-b-[24px]">
          <div
            className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}
          >
            <img
              src={headset}
              alt="headset"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="font-normal text-[17px] leading-[20.16px] text-white">
            {p}
          </p>
          <button className="text-left" onClick={() => navigate(link)}>
            <h2 className="mt-[24px] font-bold hover:underline sm:text-[32px] text-[24px] text-white">
              {title}
            </h2>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const TypingText = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);

export const DescribeLanding = () => {
  const [active, setActive] = useState("world-3");

  return (
    <motion.div
      id="explore"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col pr-6`}
    >
      <TypingText title="The New Tunes World ..." textStyles="text-center" />
      <TitleText title={<>Choose your Explore</>} textStyles="text-center" />

      <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
        {exploreWorlds.map((world, index) => (
          <ExploreCard
            key={world.id}
            {...world}
            index={index}
            active={active}
            handleClick={setActive}
          />
        ))}
      </div>
    </motion.div>
  );
};

// export default DescribeLanding;
