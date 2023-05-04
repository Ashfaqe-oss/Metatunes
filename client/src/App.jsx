import React from "react";
import { Route, Routes } from "react-router-dom";
import CrowdFunding from "./CrowdFunding";
import SongPlayer from "./SongPlayer";
import { NotFound, Landing } from "./pages";

const App = () => {
  return (
    <div className="relative md:p-4 bg-[#13131a] min-h-screen">
      <Routes>
        {/* LandingPage */}
        <Route path="/" element={<Landing />} />
        {/*musicPlayer*/}
        <Route path="/mp/*" element={<SongPlayer />} />
        {/* CrowdFunding */}
        <Route path="/cf/*" element={<CrowdFunding />} />
        {/* 404 */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
    // Damn done routes !!!!!!!!!
  );
};

export default App;
