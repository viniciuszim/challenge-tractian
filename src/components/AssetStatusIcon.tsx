import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as successStatus } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning as energyIcon } from "@fortawesome/free-solid-svg-icons";
import { TreeNode } from "../utils/treeUtils";

type AssetStatusIconProps = Pick<TreeNode, "type" | "sensorType" | "status">;

const AssetStatusIcon = ({
  type,
  sensorType,
  status,
}: AssetStatusIconProps) => {
  return (
    <>
      {type === "component" && sensorType === "energy" && (
        <FontAwesomeIcon
          icon={energyIcon}
          className={`ml-1 ${
            status === "operating" ? "text-success" : "text-error"
          }`}
          style={{ fontSize: "8px" }}
        />
      )}
      {type === "component" && sensorType === "vibration" && (
        <FontAwesomeIcon
          icon={successStatus}
          className={`ml-1 ${
            status === "operating" ? "text-success" : "text-error"
          }`}
          style={{ fontSize: "8px" }}
        />
      )}
    </>
  );
};

export default AssetStatusIcon;
