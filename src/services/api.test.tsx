import MockAdapter from "axios-mock-adapter";
import {
  api,
  fetchCompanies,
  fetchLocations,
  fetchAssets,
  Company,
  Location,
  Asset,
  StatusType,
} from "./api";

let mock: MockAdapter;

describe("API Service Tests", () => {
  beforeAll(() => {
    // Initialize the mock adapter for Axios
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    // Reset mocks after each test
    mock.reset();
  });

  afterAll(() => {
    // Restore the original functionality
    mock.restore();
  });

  it("fetchCompanies successfully retrieves company data", async () => {
    const mockData: Company[] = [
      { id: "1", name: "Company A" },
      { id: "2", name: "Company B" },
    ];

    mock.onGet("/companies").reply(200, mockData);

    const companies = await fetchCompanies();

    expect(companies).toEqual(mockData);
    expect(mock.history.get.length).toBe(1);
  });

  it("fetchCompanies throws an error when request fails", async () => {
    mock.onGet("/companies").networkError();

    await expect(fetchCompanies()).rejects.toThrow("Network Error");
  });

  it("fetchLocations successfully retrieves location data", async () => {
    const companyId = "1";
    const mockData: Location[] = [
      { id: "1", name: "Location X" },
      { id: "2", name: "Location Y", parentId: "1" },
    ];

    mock.onGet(`/companies/${companyId}/locations`).reply(200, mockData);

    const locations = await fetchLocations(companyId);

    expect(locations).toEqual(mockData);
    expect(mock.history.get.length).toBe(1);
  });

  it("fetchAssets successfully retrieves asset data", async () => {
    const companyId = "1";
    const mockData: Asset[] = [
      { id: "1", name: "Asset A", description: "Test Asset A" },
      {
        id: "2",
        name: "Asset B",
        description: "Test Asset B",
        status: StatusType.Operating,
      },
    ];

    mock.onGet(`/companies/${companyId}/assets`).reply(200, mockData);

    const assets = await fetchAssets(companyId);

    expect(assets).toEqual(mockData);
    expect(mock.history.get.length).toBe(1);
  });
});
