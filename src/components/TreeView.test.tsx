/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import { TreeView } from "./TreeView";
import { buildTree, filterTree, TreeNode } from "../utils/treeUtils";
import { assets, locations } from "../utils/treeMock";

const mockOnClickAction = jest.fn();

const selected = assets[4];

describe("TreeView Component", () => {
  let mockNodes: TreeNode[];

  beforeAll(() => {
    const tree = buildTree(locations || [], assets || []);
    mockNodes = filterTree(tree, "", null);
  });

  it("renders the tree nodes correctly", () => {
    render(
      <TreeView
        nodes={mockNodes}
        selected={selected.id}
        onClickAction={mockOnClickAction}
      />
    );

    // Check if root node is rendered
    expect(screen.getByText(locations[1].name)).toBeInTheDocument();
    expect(screen.getByText(locations[2].name)).toBeInTheDocument();
    expect(screen.getByText(locations[3].name)).toBeInTheDocument();
    expect(screen.getByText(assets[1].name)).toBeInTheDocument();
    expect(screen.getByText(selected.name)).toBeInTheDocument();
    expect(screen.getByText(assets[5].name)).toBeInTheDocument();
    expect(screen.getByText(assets[6].name)).toBeInTheDocument();
    expect(screen.getByText(assets[7].name)).toBeInTheDocument();

    // Check if child nodes are not initially rendered (collapsed by default)
    expect(screen.queryByText(locations[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(assets[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(assets[2].name)).not.toBeInTheDocument();
    expect(screen.queryByText(assets[3].name)).not.toBeInTheDocument();
  });

  it("expands and collapses nodes on button click", () => {
    render(
      <TreeView
        nodes={mockNodes}
        selected={undefined}
        onClickAction={mockOnClickAction}
      />
    );

    const locationNode = screen.getByText("PRODUCTION AREA - RAW MATERIAL");
    const toggleButton = within(locationNode.parentElement!).getByRole(
      "button"
    );

    // Expand node by clicking the toggle button
    fireEvent.click(toggleButton);

    const locationNode2 = screen.getByText("CHARCOAL STORAGE SECTOR");
    expect(locationNode2).toBeInTheDocument();

    const toggleButton2 = within(locationNode2.parentElement!).getByRole(
      "button"
    );

    // Expand node by clicking the toggle button
    fireEvent.click(toggleButton2);

    expect(screen.getByText("CONVEYOR BELT ASSEMBLY")).toBeInTheDocument();

    // Collapse node by clicking the toggle button again
    fireEvent.click(toggleButton2);

    expect(
      screen.queryByText("CONVEYOR BELT ASSEMBLY")
    ).not.toBeInTheDocument();

    // Collapse node by clicking the toggle button again
    fireEvent.click(toggleButton);
    expect(
      screen.queryByText("CHARCOAL STORAGE SECTOR")
    ).not.toBeInTheDocument();
  });

  it("executes onClickAction when a component node is clicked", () => {
    render(
      <TreeView
        nodes={mockNodes}
        selected={selected.id}
        onClickAction={mockOnClickAction}
      />
    );
    const locationNode = screen.getByText(selected.name);
    fireEvent.click(locationNode);

    expect(mockOnClickAction).toHaveBeenCalledWith({
      ...selected,
      children: [],
      type: "component",
    });
  });

  it("automatically expands the path to a pre-selected node", () => {
    render(
      <TreeView
        nodes={mockNodes}
        selected={selected.id}
        onClickAction={mockOnClickAction}
      />
    );

    // Initially expanded to show the selected node
    expect(screen.getByText("Motors H12D")).toBeInTheDocument();
    expect(screen.getByText(selected.name)).toBeInTheDocument();
  });
});
