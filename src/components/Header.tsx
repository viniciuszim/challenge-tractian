import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes as unitIcon } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="w-full h-12 px-4 flex items-center justify-between bg-primary text-white">
      {/* Logo */}
      <div className="text-xl font-bold">TRACTIAN</div>

      {/* Right Container */}
      <div className="flex items-center gap-2.5 w-auto h-6">
        <button className="button-active">
          <FontAwesomeIcon icon={unitIcon} className="h-[14px] w-[14px] mr-2" />{" "}
          Apex Unit
        </button>

        <button className="button-inactive">
          <FontAwesomeIcon icon={unitIcon} className="h-[14px] w-[14px] mr-2" />{" "}
          Tobias Unit
        </button>
        <button className="button-inactive">
          <FontAwesomeIcon icon={unitIcon} className="h-[14px] w-[14px] mr-2" />{" "}
          Jaguar Unit
        </button>
      </div>
    </header>
  );
};

export default Header;
