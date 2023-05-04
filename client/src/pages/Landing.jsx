import React from "react";
import {
  navVariants,
  styles,
  staggerContainer,
  textVariant,
  slideIn,
} from "../utils";
import { cover, menu, search, stamp } from "../assets";
import { motion } from "framer-motion";
import { CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import { DescribeLanding } from "./DescribeLanding";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className={`${styles.xPaddings} py-8 relative`}
      >
        <div className="absolute" />
        <div
          className={`flex mx-auto ${styles.innerWidth} justify-between gap-8`}
        >
          <img
            src={search}
            alt="search icon"
            className="object-contain w-6 h-6"
          />
          <h2 className="font-extrabold text-2xl leading-[30px]">METATUNES</h2>
          <img src={menu} alt="menu icon" className="object-contain w-6 h-6" />
        </div>
      </motion.nav>
      <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
          <div className="flex flex-col items-center justify-center relative z-10">
            <motion.h1
              variants={textVariant(1.1)}
              className={styles.heroHeading}
            >
              MetaTunes
            </motion.h1>
            <motion.div
              variants={textVariant(1.2)}
              className="flex flex-row justify-center items-center"
            >
              <h1 className={styles.heroHeading}>Ma</h1>
              <div className={styles.heroDText} />
              <h1 className={styles.heroHeading}>Ness</h1>
            </motion.div>
          </div>

          <motion.div
            variants={slideIn("down", "tween", 0.2, 1)}
            className="relative w-full md:-mt-[20px] -mt-[12px]"
          >
            <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

            <img
              src={cover}
              alt="hero_cover"
              className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
            />

            <a href="#explore">
              <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
                <img
                  src={stamp}
                  alt="stamp"
                  className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain"
                />
              </div>
            </a>

            <div
              id="explore"
              className="flex flex-col md:flex-row justify-center items-center m-12"
            >
              {" "}
              <CustomButton
                btnType="submit"
                styles="bg-[#1dc071] m-6 p-6 px-11 text-xl"
                title="GO TO MUSIC PLAYER"
                handleClick={() => navigate("mp")}
              />
              <CustomButton
                btnType="submit"
                styles="bg-[#8c6dfd] m-6 p-6 px-7 text-xl"
                title="GO TO CROWD FUNDING"
                handleClick={() => navigate("cf")}
              />
            </div>
          </motion.div>
        </motion.div>

        <DescribeLanding />
      </section>
    </div>
  );
}

export default Landing;
