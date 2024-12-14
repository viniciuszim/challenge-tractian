import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning as energyIcon } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation as criticalIcon } from "@fortawesome/free-solid-svg-icons";
import { faSearch as searchIcon } from "@fortawesome/free-solid-svg-icons";

import { TreeView } from "../components/TreeView";
import Breadcrumbs from "../components/Breadcrumbs";
import { Asset, fetchAssets, fetchLocations, Location } from "../services/api";
import { buildTree, filterTree, findFirstComponent } from "../utils/treeUtils";
import AssetDetail from "../components/AssetDetail";
import { useCompany } from "../hooks/useCompanies";

export const HomePage: React.FC = () => {
  const { companySelected } = useCompany();

  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [assets, setAssets] = useState<Asset[] | null>(null);

  const [assetSelected, setAssetSelected] = useState<Asset | null>(null);

  const tree = buildTree(locations || [], assets || []);
  const filteredTree = filterTree(tree, searchQuery);

  useEffect(() => {
    const fetchLocationData = async (companyId: string) => {
      const data = await fetchLocations(companyId);
      setLocations(data);
    };

    const fetchAssetData = async (companyId: string) => {
      const data = await fetchAssets(companyId);
      setAssets(data);

      setAssetSelected(null);
    };

    if (companySelected) {
      fetchLocationData(companySelected.id);
      fetchAssetData(companySelected.id);
    }
  }, [companySelected]);

  useEffect(() => {
    if (!assetSelected) {
      const firstComponent = findFirstComponent(tree);
      setAssetSelected(firstComponent);
    }
  }, [assetSelected, tree]);

  const handleAssetClick = (node: Asset) => {
    setAssetSelected(node);
  };

  return (
    <div className="flex flex-col p-[16px] gap-[12px] rounded-[4px] border-[1px] border-solid border-Shape-Border-card bg-white">
      <Breadcrumbs title="Ativos" subTitle={`${companySelected?.name} Unit`}>
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
            <TreeView
              nodes={filteredTree}
              selected={assetSelected?.id}
              onClickAction={handleAssetClick}
            />
          </div>
        </div>

        {/* Right Container */}
        <div className="flex-1 rounded-[2px] border-[1px] border-solid border-Shape-Border-card bg-white">
          {assetSelected && <AssetDetail {...assetSelected} />}
          {!assetSelected && (
            <div className="flex h-full items-center text-center">
              <h1 className="w-full">Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
