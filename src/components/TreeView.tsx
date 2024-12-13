import React from "react";
import assetIcon from "../assets/IoCubeOutline.svg";
import componentIcon from "../assets/Codepen.svg";
import locationIcon from "../assets/GoLocation.svg";

interface TreeNode {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  children?: TreeNode[];
}

interface TreeProps {
  nodes: TreeNode[];
}

export const TreeView: React.FC<TreeProps> = ({ nodes }) => {
  return (
    <div className="space-y-4">
      {nodes.map((node) => (
        <div key={node.id} className="pl-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-800 flex flex-row">
              {node.type === "location" ? (
                <img
                  src={locationIcon}
                  alt="location icon"
                  width={22}
                  className="mr-1"
                />
              ) : node.type === "asset" ? (
                <img
                  src={assetIcon}
                  alt="asset icon"
                  width={22}
                  className="mr-1"
                />
              ) : (
                <img
                  src={componentIcon}
                  alt="component icon"
                  width={22}
                  className="mr-1"
                />
              )}{" "}
              {node.name}
            </span>
          </div>
          {node.children && (
            <div className="ml-4 border-l-2 pl-4 mt-2">
              <TreeView nodes={node.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
