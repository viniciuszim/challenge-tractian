import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown as expandedIcon,
  faChevronRight as collapsedIcon,
} from "@fortawesome/free-solid-svg-icons";

import assetIcon from "../assets/IoCubeOutline.svg";
import componentIcon from "../assets/Codepen.svg";
import componentWhiteIcon from "../assets/Codepen-white.svg";
import locationIcon from "../assets/GoLocation.svg";
import { TreeNode } from "../utils/treeUtils";
import AssetStatusIcon from "./AssetStatusIcon";
import { AssetType } from "../services/api";

interface TreeProps {
  nodes: TreeNode[];
  selected: string | undefined;
  onClickAction: (node: TreeNode) => void;
}

export const TreeView: React.FC<TreeProps> = ({
  nodes,
  selected,
  onClickAction,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Function to find the path to the selected node
  const findPathToNode = useCallback(
    (
      tree: TreeNode[],
      targetId: string,
      path: string[] = []
    ): string[] | null => {
      for (const node of tree) {
        const currentPath = [...path, node.id];
        if (node.id === targetId) {
          return currentPath; // Path found
        }
        if (node.children) {
          const result = findPathToNode(node.children, targetId, currentPath);
          if (result) return result; //Returns the path found in the children
        }
      }
      return null; // No node found on current path
    },
    []
  );

  // Effect to automatically expand the path of the selected node
  useEffect(() => {
    if (selected) {
      const pathToNode = findPathToNode(nodes, selected); // Find the path to the selected node
      if (pathToNode) {
        setExpandedNodes((prev) => {
          const newSet = new Set(prev);
          pathToNode.forEach((id) => newSet.add(id)); // Expands all nodes in the path
          return newSet;
        });
      }
    }
  }, [selected, nodes, findPathToNode]);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // Collapse node
      } else {
        newSet.add(id); // Expand node
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {nodes.map((node) => {
        const isExpanded = expandedNodes.has(node.id);

        return (
          <div key={node.id} className="pl-4">
            <div
              className={`flex items-center space-x-2 ${
                selected === node.id && "bg-blue-500 pl-1"
              }`}
            >
              {node.children && node.children.length > 0 && (
                <button
                  onClick={() => toggleNode(node.id)}
                  className="text-gray-500 hover:text-gray-800"
                  aria-label={isExpanded ? "Collapse node" : "Expand node"}
                >
                  <FontAwesomeIcon
                    icon={isExpanded ? expandedIcon : collapsedIcon}
                  />
                </button>
              )}
              <span
                onClick={() => {
                  if (node.type === AssetType.Component) {
                    onClickAction(node);
                  }
                }}
                className={`text-sm text-gray-800 flex flex-row items-center ${
                  selected === node.id && "text-white"
                }`}
                style={{
                  cursor:
                    node.type === AssetType.Component ? "pointer" : "auto",
                }}
              >
                {node.type === AssetType.Location ? (
                  <img
                    src={locationIcon}
                    alt="location icon"
                    width={22}
                    className="mr-1"
                  />
                ) : node.type === AssetType.Asset ? (
                  <img
                    src={assetIcon}
                    alt="asset icon"
                    width={22}
                    className="mr-1"
                  />
                ) : (
                  <img
                    src={
                      selected === node.id ? componentWhiteIcon : componentIcon
                    }
                    alt="component icon"
                    width={22}
                    className="mr-1"
                  />
                )}{" "}
                {node.name}
                <AssetStatusIcon {...node} />
              </span>
            </div>

            {/* Render children only if expanded */}
            {isExpanded && node.children && node.children.length > 0 && (
              <div className="ml-4 border-l-2 pl-4 mt-2">
                <TreeView
                  nodes={node.children}
                  selected={selected}
                  onClickAction={onClickAction}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
