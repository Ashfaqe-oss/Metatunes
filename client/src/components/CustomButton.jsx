import React from "react";
import { motion } from "framer-motion";

//reusable button component;
const CustomButton = ({ btnType, styles, title, handleClick }) => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={(e) => {}}
        onHoverEnd={(e) => {}}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        type={btnType}
        className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
        onClick={handleClick}
      >
        {title}
      </motion.button>
    </div>
  );
};

export default CustomButton;
