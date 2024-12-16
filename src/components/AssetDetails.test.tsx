import React from "react";
import { render, screen } from "@testing-library/react";
import AssetDetail from "./AssetDetail";
import { Asset, SensorType, StatusType } from "../services/api";

// Mock icons since they are SVG imports
jest.mock("../assets/Sensor.svg", () => "sensor-icon");
jest.mock("../assets/MdOutlineRouter.svg", () => "router-icon");

// Dummy data to use in tests
const mockAsset: Asset = {
  id: "asset-id",
  name: "Test Asset",
  description: "Description Asset",
  sensorId: "Sensor456",
  sensorType: SensorType.Energy,
  status: StatusType.Alert,
  gatewayId: "Gateway123",
};

describe("AssetDetail Component", () => {
  test("renders asset name", () => {
    render(<AssetDetail {...mockAsset} />);

    const assetName = screen.getByText(/Test Asset/i);
    expect(assetName).toBeInTheDocument();
  });

  test("renders equipment type label and text", () => {
    render(<AssetDetail {...mockAsset} />);
    const label = screen.getByText(/Tipo de Equipamento/i);
    const text = screen.getByText(/Motor Elétrico \(Trifásico\)/i);

    expect(label).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test("renders responsible with avatar", () => {
    render(<AssetDetail {...mockAsset} />);
    const responsibleText = screen.getByText(/energy/i);
    const avatar = screen.getByTestId("asset-detail-avatar"); // Checks for the initial

    expect(responsibleText).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  test("renders sensor icon and text", () => {
    render(<AssetDetail {...mockAsset} />);
    const sensorIcon = screen.getAllByAltText(/custom icon/i);
    const sensorText = screen.getByText(/Sensor456/i);

    expect(sensorIcon.length).toBeGreaterThan(0);
    expect(sensorText).toBeInTheDocument();
  });

  test("renders receptor icon and text", () => {
    render(<AssetDetail {...mockAsset} />);
    const routerIcon = screen.getAllByAltText(/custom icon/i)[1]; // Second icon in the document
    const gatewayText = screen.getByText(/Gateway123/i);

    expect(routerIcon).toBeInTheDocument();
    expect(gatewayText).toBeInTheDocument();
  });
});
