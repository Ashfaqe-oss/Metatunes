import React from 'react';

const Icon = ({styles, name, imgUrl, isActive, disabled, handleClick}) => {
    const Icon = ({styles, name, imgUrl, isActive, disabled, handleClick}) => (
        //use () instead of {} to instant return JSX
        <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive===name && 'bg-[#2c2f32]'} hover:bg-[#2c2f32] flex justify-center items-center cursor-pointer ${disabled && 'cursor-not-allowed'} ${styles}`} onClick={handleClick}>
          {!isActive ? (
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
          ) : (
            <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'greyscale'}`} />
          )}
        </div>
      );
    return <Icon />;
}

export default Icon;
