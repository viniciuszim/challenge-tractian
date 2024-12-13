import React, { useEffect, useState } from "react";
import {
  Asset,
  fetchAssets,
  fetchCompanies,
  fetchLocations,
  Location,
} from "../services/api";
import { buildTree, filterTree } from "../utils/treeUtils";
import { TreeView } from "../components/TreeView";

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
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TreeView nodes={filteredTree} />
    </div>
  );
};
