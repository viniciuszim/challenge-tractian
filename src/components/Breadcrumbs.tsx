import React from "react";

interface BreadcrumbsProps {
  title: string;
  subTitle: string;
  children?: any;
}
const Breadcrumbs = ({ title, subTitle, children }: BreadcrumbsProps) => {
  return (
    <div className="w-full h-[32px] flex justify-between">
      <div className="gap-[7px] flex items-center">
        <h1 className="typography-heading-xl text-left">{title}</h1>
        <p className="typography-body-sm text-center">/ {subTitle}</p>
      </div>

      <div className="gap-[8px] flex items-center">{children}</div>
    </div>
  );
};

export default Breadcrumbs;
