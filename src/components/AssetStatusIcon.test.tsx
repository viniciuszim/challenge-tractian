import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AssetStatusIcon from "./AssetStatusIcon";
import { AssetType, SensorType, StatusType } from "../services/api";

describe("AssetStatusIcon Component", () => {
  test("renders energy icon with text-success class when type is 'component', sensorType is 'energy' and status is 'operating'", () => {
    render(
      <AssetStatusIcon
        type={AssetType.Component}
        sensorType={SensorType.Energy}
        status={StatusType.Operating}
      />
    );

    const icon = screen.getByTestId("icon"); // Assuming you've added data-testid="icon" in your FontAwesomeIcon
    expect(icon).toHaveClass("text-success");
  });

  test("renders energy icon with text-error class when type is 'component', sensorType is 'energy' and status is not 'operating'", () => {
    render(
      <AssetStatusIcon
        type={AssetType.Component}
        sensorType={SensorType.Energy}
        status={StatusType.Alert}
      />
    );

    const icon = screen.getByTestId("icon"); // Assuming you've added data-testid="icon" in your FontAwesomeIcon
    expect(icon).toHaveClass("text-error");
  });

  test("renders vibration icon with text-success class when type is 'component', sensorType is 'vibration' and status is 'operating'", () => {
    render(
      <AssetStatusIcon
        type={AssetType.Component}
        sensorType={SensorType.Vibration}
        status={StatusType.Operating}
      />
    );

    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("text-success");
  });

  test("renders vibration icon with text-error class when type is 'component', sensorType is 'vibration' and status is not 'operating'", () => {
    render(
      <AssetStatusIcon
        type={AssetType.Component}
        sensorType={SensorType.Vibration}
        status={StatusType.Alert}
      />
    );

    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("text-error");
  });

  test("does not render any icon if type is not 'component'", () => {
    render(
      <AssetStatusIcon
        type={AssetType.Asset}
        sensorType={SensorType.Vibration}
        status={StatusType.Operating}
      />
    );

    const icon = screen.queryByTestId("icon");
    expect(icon).not.toBeInTheDocument();
  });
});
