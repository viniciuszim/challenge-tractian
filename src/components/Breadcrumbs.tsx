import React from "react";

interface BreadcrumbsProps {
  title: string;
  subTitle: string;
  children?: any;
}
const Breadcrumbs = ({ title, subTitle, children }: BreadcrumbsProps) => {
  return (
    <div className="w-full h-auto sm:h-[32px] flex justify-between flex-col sm:flex-row gap-2.5 sm:gap-0">
      <div className="gap-[7px] flex items-center">
        <h1 className="typography-heading-xl text-left">{title}</h1>
        <p className="typography-body-sm text-center">/ {subTitle}</p>
      </div>

      <div className="gap-[8px] flex items-center">{children}</div>
    </div>
  );
};

export default Breadcrumbs;
