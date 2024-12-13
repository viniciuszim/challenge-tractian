import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-api.tractian.com",
  timeout: 5000,
});

export interface Company {
  id: number;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  parentId?: string;
}

export enum AssetType {
  Location = "location",
  Asset = "asset",
  Component = "component",
}

export enum SensorType {
  Energy = "energy",
  Vibration = "vibration",
}

export enum StatusType {
  Alert = "alert",
  Operating = "operating",
}
export interface Asset {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  sensorId?: string;
  sensorType?: SensorType;
  status?: StatusType;
  gatewayId?: string;
  locationId?: string;
  image?: string;
}

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    const response = await api.get<Company[]>("/companies");
    return response.data;
  } catch (error) {
    console.error("Error to fetch companies:", error);
    throw error;
  }
};

export const fetchLocations = async (
  companyId: string
): Promise<Location[]> => {
  try {
    const response = await api.get<Location[]>(
      `/companies/${companyId}/locations`
    );
    return response.data;
  } catch (error) {
    console.error("Error to fetch locations:", error);
    throw error;
  }
};

export const fetchAssets = async (companyId: string): Promise<Asset[]> => {
  try {
    const response = await api.get<Asset[]>(`/companies/${companyId}/assets`);
    return response.data;
  } catch (error) {
    console.error("Error to fetch assets:", error);
    throw error;
  }
};

export default api;
