interface TreeNode {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
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
        id: loc.id,
        name: loc.name,
        type: "location",
        children: [],
      });
    }

    const node = locationMap.get(loc.id)!;

    if (loc.parentId) {
      if (!locationMap.has(loc.parentId)) {
        locationMap.set(loc.parentId, {
          id: loc.parentId,
          name: "", // Placeholder
          type: "location",
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
        id: asset.id,
        name: asset.name,
        type: asset.sensorType ? "component" : "asset",
        children: [],
      });
    }
  });

  assets.forEach((asset) => {
    const node = assetMap.get(asset.id)!;

    if (asset.locationId) {
      if (!locationMap.has(asset.locationId)) {
        locationMap.set(asset.locationId, {
          id: asset.locationId,
          name: "", // Placeholder
          type: "location",
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
          id: asset.parentId,
          name: "", // Placeholder
          type: "asset",
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

export const filterTree = (tree: TreeNode[], query: string): TreeNode[] => {
  return tree
    .map((node) => ({
      ...node,
      children: node.children ? filterTree(node.children, query) : [],
    }))
    .filter(
      (node) =>
        node.name.toLowerCase().includes(query.toLowerCase()) ||
        node.children?.length
    );
};
