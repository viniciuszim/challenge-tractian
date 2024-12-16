/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompanyProvider, useCompany } from "./useCompanies";
import { fetchCompanies } from "../services/api";

jest.mock("../services/api");

describe("CompanyProvider", () => {
  const mockCompanies = [
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
  ];

  beforeEach(() => {
    (fetchCompanies as jest.Mock).mockResolvedValue(mockCompanies);
  });

  const TestComponent: React.FC = () => {
    const { companySelected, companies, setCompanySelected } = useCompany();

    return (
      <div>
        <div>
          Selected Company: {companySelected ? companySelected.name : "None"}
        </div>
        <ul>
          {companies.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
        <button onClick={() => setCompanySelected(companies[1])}>
          Select Company B
        </button>
      </div>
    );
  };

  test("provides fetched companies and selects the first one initially", async () => {
    await act(async () => {
      render(
        <CompanyProvider>
          <TestComponent />
        </CompanyProvider>
      );
    });

    expect(fetchCompanies).toHaveBeenCalledTimes(1);

    const listItems = document.querySelectorAll("li");
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toBe("Company A");
    expect(listItems[1].textContent).toBe("Company B");

    const selectedCompanyDiv = document.querySelector("div");
    expect(selectedCompanyDiv).toHaveTextContent("Selected Company: Company A");
  });

  test("allows changing the selected company", async () => {
    await act(async () => {
      render(
        <CompanyProvider>
          <TestComponent />
        </CompanyProvider>
      );
    });

    const button = document.querySelector("button")!;
    act(() => {
      button.click();
    });

    const selectedCompanyDiv = document.querySelector("div");
    expect(selectedCompanyDiv).toHaveTextContent("Selected Company: Company B");
  });
});
