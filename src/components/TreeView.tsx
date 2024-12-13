import React from "react";

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
  return (
    <div className="space-y-4">
      {nodes.map((node) => (
        <div key={node.id} className="pl-4">
          <div
            className={`flex items-center space-x-2 ${
              selected === node.id && "bg-blue-500 pl-1"
            }`}
          >
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
                cursor: node.type === AssetType.Component ? "pointer" : "auto",
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
          {node.children && (
            <div className="ml-4 border-l-2 pl-4 mt-2">
              <TreeView
                nodes={node.children}
                selected={selected}
                onClickAction={onClickAction}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
