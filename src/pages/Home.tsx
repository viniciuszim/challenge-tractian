import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning as energyIcon } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation as criticalIcon } from "@fortawesome/free-solid-svg-icons";

import { TreeView } from "../components/TreeView";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  Asset,
  fetchAssets,
  fetchCompanies,
  fetchLocations,
  Location,
} from "../services/api";
import { buildTree, filterTree } from "../utils/treeUtils";

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
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TreeView nodes={filteredTree} />
    </div>
  );
};
