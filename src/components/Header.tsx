import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes as unitIcon } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="w-full sm:h-12 h-auto bg-primary text-white flex items-center justify-between flex-col sm:flex-row px-4 py-4 gap-2.5">
      {/* Logo */}
      <div className="text-xl font-bold">TRACTIAN</div>

      {/* Right Container */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto space-x-2 sm:space-x-4 sm:flex-row flex-col">
        <button className="button-active w-full sm:w-auto">
          <FontAwesomeIcon icon={unitIcon} className="h-[14px] w-[14px] mr-2" />{" "}
          Apex Unit
        </button>

        <button className="button-inactive w-full sm:w-auto">
          <FontAwesomeIcon icon={unitIcon} className="h-[14px] w-[14px] mr-2" />{" "}
          Tobias Unit
        </button>
        <button className="button-inactive w-full sm:w-auto">
          <FontAwesomeIcon icon={unitIcon} className="h-[14px] w-[14px] mr-2" />{" "}
          Jaguar Unit
        </button>
      </div>
    </header>
  );
};

export default Header;
