import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes as unitIcon } from "@fortawesome/free-solid-svg-icons";
import { useCompany } from "../hooks/useCompanies";

const Header = () => {
  const { companies, companySelected, setCompanySelected } = useCompany();

  return (
    <header className="w-full sm:h-12 h-auto bg-primary text-white flex items-center justify-between flex-col sm:flex-row px-4 py-4 gap-2.5">
      {/* Logo */}
      <div className="text-xl font-bold">TRACTIAN</div>

      {/* Right Container */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto space-x-2 sm:space-x-4 sm:flex-row flex-col">
        {companies &&
          companies.length &&
          companies.map((company) => (
            <button
              key={`company-button-${company.id}`}
              className={`w-full sm:w-auto ${
                company.id === companySelected?.id
                  ? "button-active"
                  : "button-inactive "
              }`}
              onClick={() => setCompanySelected(company)}
            >
              <FontAwesomeIcon
                icon={unitIcon}
                className="h-[14px] w-[14px] mr-2"
              />
              {`${company.name} Unit`}
            </button>
          ))}
      </div>
    </header>
  );
};

export default Header;
