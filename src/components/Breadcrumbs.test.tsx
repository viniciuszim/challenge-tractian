import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs Component", () => {
  test("renders the title and subtitle correctly", () => {
    const title = "Dashboard";
    const subTitle = "Overview";

    render(<Breadcrumbs title={title} subTitle={subTitle} />);

    const titleElement = screen.getByText(title);
    const subTitleElement = screen.getByText(`/ ${subTitle}`);

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  test("renders children correctly", () => {
    const title = "Settings";
    const subTitle = "Profile";
    const childText = "Child Element";

    render(
      <Breadcrumbs title={title} subTitle={subTitle}>
        <span>{childText}</span>
      </Breadcrumbs>
    );

    const childElement = screen.getByText(childText);

    expect(childElement).toBeInTheDocument();
  });

  test("applies correct styles", () => {
    const title = "Projects";
    const subTitle = "New Project";

    const { container } = render(
      <Breadcrumbs title={title} subTitle={subTitle} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const breadcrumbContainer = container.firstChild;

    expect(breadcrumbContainer).toHaveClass(
      "w-full h-auto sm:h-[32px] flex justify-between flex-col sm:flex-row gap-2.5 sm:gap-0"
    );
  });
});
