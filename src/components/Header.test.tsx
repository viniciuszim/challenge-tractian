import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

// Mocking FontAwesomeIcon
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon, className }: any) => <svg className={className} />,
}));

// Mocking the useCompany hook
jest.mock("../hooks/useCompanies", () => ({
  useCompany: jest.fn(),
}));

describe("Header Component", () => {
  const mockSetCompanySelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (require("../hooks/useCompanies").useCompany as jest.Mock).mockReturnValue({
      companies: [
        { id: 1, name: "Company A" },
        { id: 2, name: "Company B" },
      ],
      companySelected: { id: 1, name: "Company A" },
      setCompanySelected: mockSetCompanySelected,
    });
  });

  test("renders logo correctly", () => {
    render(<Header />);
    const logoElement = screen.getByText("TRACTIAN");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders company buttons correctly", () => {
    render(<Header />);
    const companyAButton = screen.getByText("Company A Unit");
    const companyBButton = screen.getByText("Company B Unit");

    expect(companyAButton).toBeInTheDocument();
    expect(companyBButton).toBeInTheDocument();
  });

  test("correct button is active", () => {
    render(<Header />);
    const companyAButton = screen.getByText("Company A Unit");
    expect(companyAButton).toHaveClass("button-active");

    const companyBButton = screen.getByText("Company B Unit");
    expect(companyBButton).toHaveClass("button-inactive");
  });

  test("calls setCompanySelected when button is clicked", () => {
    render(<Header />);
    const companyBButton = screen.getByText("Company B Unit");

    fireEvent.click(companyBButton);

    expect(mockSetCompanySelected).toHaveBeenCalledWith({
      id: 2,
      name: "Company B",
    });
  });
});
