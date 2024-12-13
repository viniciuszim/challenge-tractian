import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning as energyIcon } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation as criticalIcon } from "@fortawesome/free-solid-svg-icons";
import { faSearch as searchIcon } from "@fortawesome/free-solid-svg-icons";

import { TreeView } from "../components/TreeView";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  Asset,
  fetchAssets,
  fetchCompanies,
  fetchLocations,
  Location,
  StatusType,
} from "../services/api";
import { buildTree, filterTree } from "../utils/treeUtils";
import AssetDetail from "../components/AssetDetail";
import assetImage from "../assets/image223.png";

export const HomePage: React.FC = () => {
  const companyId = "662fd0ee639069143a8fc387";
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [assets, setAssets] = useState<Asset[] | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const data = await fetchLocations(companyId);
      console.log("=== fetchLocations: ", data);
      setLocations(data);
    };

    const fetchAssetData = async () => {
      const data = await fetchAssets(companyId);
      console.log("=== fetchAssetData: ", data);
      setAssets(data);
    };

    fetchLocationData();
    fetchAssetData();
  }, [companyId]);

  const tree = buildTree(locations || [], assets || []);
  const filteredTree = filterTree(tree, searchQuery);

  const assetMOCK: Asset = {
    id: "id",
    name: "MOTOR RT COAL AF01",
    description: "Motor Elétrico (Trifásico)",
    sensorId: "HIO4510",
    sensorType: "Elétrica",
    status: StatusType.Operating,
    gatewayId: "EUH4R27",
    image: assetImage,
  };

  return (
    <div className="flex flex-col p-[16px] gap-[12px] rounded-[4px] border-[1px] border-solid border-Shape-Border-card bg-white">
      <Breadcrumbs title="Ativos" subTitle="Apex Unit">
        <button className="button-tertiary h-[32px]">
          <FontAwesomeIcon
            icon={energyIcon}
            className="h-[14px] w-[14px] mr-2 text-blue-500"
          />
          Sensor de Energia
        </button>

        <button className="button-tertiary h-[32px]">
          <FontAwesomeIcon
            icon={criticalIcon}
            className="h-[14px] w-[14px] mr-2 text-blue-500"
          />
          Crítico
        </button>
      </Breadcrumbs>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-[8px]">
        {/* Left Container */}
        <div className="w-full lg:w-[479px] rounded-[2px] border-[1px] border-solid border-Shape-Border-card bg-white">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar Ativo ou Local"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[45px] px-3 py-[1px] rounded-[2px] border border-Shape-Border-card bg-white"
            />
            <FontAwesomeIcon
              icon={searchIcon}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              style={{ fontSize: "16px" }}
            />
          </div>
          <div className="pt-2 pr-1 pb-2 pl-1 gap-1">
            <TreeView nodes={filteredTree} />
          </div>
        </div>

        {/* Right Container */}
        <div className="flex-1 rounded-[2px] border-[1px] border-solid border-Shape-Border-card bg-white">
          <AssetDetail {...assetMOCK} />
        </div>
      </div>
    </div>
  );
};
