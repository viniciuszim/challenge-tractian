import React from "react";
import { Asset, AssetType } from "../services/api";

import assetImage from "../assets/image223.png";
import sensorIcon from "../assets/Sensor.svg";
import routerIcon from "../assets/MdOutlineRouter.svg";
import AssetStatusIcon from "./AssetStatusIcon";
interface ContentItemProps {
  label: string;
  text?: string;
  avatar?: boolean;
  icon?: string;
}

const AssetDetail = ({
  gatewayId,
  name,
  sensorId,
  sensorType,
  status,
}: Asset) => {
  const ContentItem = ({ label, text, avatar, icon }: ContentItemProps) => (
    <div className="flex gap-6 flex-col">
      <p className="typography-body-bold-sm text-Neutral-Colors-Gray-950">
        {label}
      </p>
      <div className="flex flex-row">
        {avatar && (
          <div
            data-testid="asset-detail-avatar"
            className="w-6 h-6 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold mr-2"
          >
            {text?.substring(0, 1).toUpperCase()}
          </div>
        )}
        {icon && (
          <img src={icon} alt="custom icon" width={20} className="mr-2" />
        )}
        <p className="typography-body-md text-Neutral-Colors-Gray-500 flex items-center">
          {text}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="pt-3 pr-4 pb-3 pl-4 gap-2 border-b-[1px] border-solid border-Shape-Border-card flex flew-row items-center">
        <h1 className="typography-heading-lg">{name}</h1>
        <AssetStatusIcon
          type={AssetType.Component}
          sensorType={sensorType}
          status={status}
        />
      </div>
      <div className="flex p-6 gap-6 flex-col">
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            {/* TODO There is no image in the API response */}
            <img src={assetImage} alt="asset" className="w-full" />
          </div>
          <div className="flex gap-6 flex-col w-full md:w-1/2">
            {/* TODO There is no description in the API response */}
            <ContentItem
              label="Tipo de Equipamento"
              text={"Motor Elétrico (Trifásico)"}
            />
            <div className="w-full border-t border-Neutral-Colors-Gray-150"></div>
            <ContentItem label="Responsáveis" text={sensorType} avatar />
          </div>
        </div>
        <div className="w-full border-t border-Neutral-Colors-Gray-150"></div>
        <div className="flex gap-6">
          <div className="w-full md:w-1/2">
            <ContentItem label="Sensor" text={sensorId} icon={sensorIcon} />
          </div>
          <div className="w-full md:w-1/2">
            <ContentItem label="Receptor" text={gatewayId} icon={routerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
