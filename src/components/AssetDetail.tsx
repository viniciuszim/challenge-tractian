import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as successStatus } from "@fortawesome/free-solid-svg-icons";
import { Asset, StatusType } from "../services/api";

import sensorIcon from "../assets/Sensor.svg";
import routerIcon from "../assets/MdOutlineRouter.svg";

interface ContentItemProps {
  label: string;
  text?: string;
  avatar?: boolean;
  icon?: string;
}

const AssetDetail = ({
  description,
  gatewayId,
  image,
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
      <p className="typography-body-md text-Neutral-Colors-Gray-500 flex items-center">
        {avatar && (
          <div className="w-6 h-6 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold mr-2">
            {text?.substring(0, 1)}
          </div>
        )}
        {icon && (
          <img src={icon} alt="custom icon" width={20} className="mr-2" />
        )}
        {text}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="pt-3 pr-4 pb-3 pl-4 gap-2 border-b-[1px] border-solid border-Shape-Border-card flex flew-row items-center">
        <h1 className="typography-heading-lg">{name}</h1>
        <FontAwesomeIcon
          icon={successStatus}
          className={
            status === StatusType.Operating ? "text-success" : "text-error"
          }
          style={{ fontSize: "8px" }}
        />
      </div>
      <div className="flex p-6 gap-6 flex-col">
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img src={image} alt="asset" className="w-full" />
          </div>
          <div className="flex gap-6 flex-col w-full md:w-1/2">
            <ContentItem label="Tipo de Equipamento" text={description} />
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
