import React from 'react';
import { DotWave } from "@uiball/loaders";


const Loader = () => {
    return (
        <div className='fixed inset-0 h-screen z-10 bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col' >
            <DotWave size={47} speed={1} color="#4acd8d" />
            <p className="mt-[20px] font-epilogue font-bold text-[20px] text-[#ffffffe3] text-center"> Processing <br /> Please wait...</p>
        </div>
    );
}

export default Loader;
