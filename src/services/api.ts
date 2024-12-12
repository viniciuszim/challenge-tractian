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

export interface Asset {
  id: string;
  name: string;
  parentId?: string;
  sensorId?: string;
  sensorType?: string;
  status?: string;
  gatewayId?: string;
  locationId?: string;
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
  companyId: number
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

export const fetchAssets = async (companyId: number): Promise<Asset[]> => {
  try {
    const response = await api.get<Asset[]>(`/companies/${companyId}/assets`);
    return response.data;
  } catch (error) {
    console.error("Error to fetch assets:", error);
    throw error;
  }
};

export default api;
