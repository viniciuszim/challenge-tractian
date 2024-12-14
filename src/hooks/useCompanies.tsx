import React, {
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Company, fetchCompanies } from "../services/api";

interface CompanyContextType {
  companySelected: Company | null;
  companies: Company[];
  setCompanySelected: React.Dispatch<React.SetStateAction<Company | null>>;
}

export const CompanyContext = createContext<CompanyContextType | null>(null);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [companySelected, setCompanySelected] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  const refreshCompanies = useCallback(async () => {
    const data = await fetchCompanies();

    // Sort the data by the name property in ascending order
    const sortedData = data.sort((a: Company, b: Company) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    setCompanies(sortedData);

    if (data && companySelected === null) {
      setCompanySelected(data[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refreshCompanies();
  }, [refreshCompanies]);

  const value = useMemo(
    () => ({
      companySelected,
      companies,
      setCompanySelected,
    }),
    [companySelected, companies]
  );

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};

// Custom hook to use the CompanyContext
export const useCompany = () => {
  const context = React.useContext(CompanyContext);

  if (!context) {
    throw new Error("This hook must be used within a CompanyProvider");
  }

  return context;
};
