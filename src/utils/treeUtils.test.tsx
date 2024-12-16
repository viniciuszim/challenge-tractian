import {
  buildTree,
  filterTree,
  findFirstComponent,
  TreeNode,
} from "./treeUtils";
import { SensorType } from "../services/api";
import { ASSET_NAME, assets, locations } from "./treeMock";

describe("Tree Functions", () => {
  let tree: TreeNode[];

  beforeAll(() => {
    tree = buildTree(locations, assets);
  });

  describe("buildTree", () => {
    it("should correctly build a nested tree structure", () => {
      expect(tree.length).toBe(3); // Three root node expected
      expect(tree[1].children.length).toBe(2); // Location 2 has two child
      expect(tree[1].children[1].children.length).toBe(3); // Assets under Location 2
    });
  });

  describe("filterTree", () => {
    it("should filter nodes based on query", () => {
      const filteredTree = filterTree(tree, "Stage 1", null);
      expect(filteredTree.length).toBe(1);
      expect(filteredTree[0].children[0].children[0].name).toBe(ASSET_NAME);
    });

    it("should filter nodes based on sensor type", () => {
      const filteredTree = filterTree(tree, "", SensorType.Vibration);
      expect(filteredTree.length).toBe(2);
      expect(filteredTree[0].children[0].children.length).toBe(3);
      expect(filteredTree[0].children[0].children[0].name).toBe(ASSET_NAME);
    });
  });

  describe("findFirstComponent", () => {
    it("should find the first component node", () => {
      const component = findFirstComponent(tree);
      expect(component).not.toBeNull();
      expect(component!.name).toBe(ASSET_NAME);
    });

    it("should return null if no components exist", () => {
      const emptyTree = buildTree(locations, []);
      const component = findFirstComponent(emptyTree);
      expect(component).toBeNull();
    });
  });
});
