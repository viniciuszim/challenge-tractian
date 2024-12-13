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
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <span>
            {node.type === "location" ? (
              <img src={locationIcon} alt="location icon" width={22} />
            ) : node.type === "asset" ? (
              <img src={assetIcon} alt="asset icon" width={22} />
            ) : (
              <img src={componentIcon} alt="component icon" width={22} />
            )}{" "}
            {node.name}
          </span>
          {node.children && <TreeView nodes={node.children} />}
        </li>
      ))}
    </ul>
  );
};
