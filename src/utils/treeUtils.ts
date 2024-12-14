import { Asset, AssetType, SensorType } from "../services/api";

export interface TreeNode extends Asset {
  type: AssetType;
  children: TreeNode[];
}

export const buildTree = (locations: any[], assets: any[]): TreeNode[] => {
  const locationMap = new Map<string, TreeNode>();
  const assetMap = new Map<string, TreeNode>();
  const tree: TreeNode[] = [];

  locations.forEach((loc) => {
    if (locationMap.has(loc.id)) {
      const existingNode = locationMap.get(loc.id)!;
      existingNode.name = loc.name;
    } else {
      locationMap.set(loc.id, {
        ...loc,
        type: AssetType.Location,
        children: [],
      });
    }

    const node = locationMap.get(loc.id)!;

    if (loc.parentId) {
      if (!locationMap.has(loc.parentId)) {
        locationMap.set(loc.parentId, {
          ...loc,
          name: "", // Placeholder
          type: AssetType.Location,
          children: [],
        });
      }
      const parent = locationMap.get(loc.parentId);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      tree.push(node);
    }
  });

  assets.forEach((asset) => {
    if (!assetMap.has(asset.id)) {
      assetMap.set(asset.id, {
        ...asset,
        type: asset.sensorType ? AssetType.Component : AssetType.Asset,
        children: [],
      });
    }
  });

  assets.forEach((asset) => {
    const node = assetMap.get(asset.id)!;

    if (asset.locationId) {
      if (!locationMap.has(asset.locationId)) {
        locationMap.set(asset.locationId, {
          ...asset,
          id: asset.locationId,
          name: "", // Placeholder
          type: AssetType.Location,
          children: [],
        });
      }
      const location = locationMap.get(asset.locationId);
      if (location) {
        location.children.push(node);
      }
    } else if (asset.parentId) {
      if (!assetMap.has(asset.parentId)) {
        assetMap.set(asset.parentId, {
          ...asset,
          id: asset.parentId,
          name: "", // Placeholder
          type: AssetType.Asset,
          children: [],
        });
      }
      const parent = assetMap.get(asset.parentId);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      tree.push(node);
    }
  });

  return tree;
};

export const filterTree = (
  tree: TreeNode[],
  query: string,
  sensorType: SensorType | null
): TreeNode[] => {
  return tree
    .map((node) => ({
      ...node,
      children: node.children
        ? filterTree(node.children, query, sensorType)
        : [],
    }))
    .filter((node) => {
      const matchesQuery = node.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesSensorType = !sensorType || node.sensorType === sensorType;
      const hasChildren = node.children?.length > 0;

      return (matchesQuery && matchesSensorType) || hasChildren;
    });
};

export const findFirstComponent = (tree: TreeNode[]): TreeNode | null => {
  for (const node of tree) {
    if (node.type === AssetType.Component) {
      return node;
    }

    if (node.children) {
      const found = findFirstComponent(node.children);
      if (found) {
        return found;
      }
    }
  }

  return null;
};
