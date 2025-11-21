"use client";

import React from "react";
import { getComponentSize, getComponentVariant, type ComponentSize } from "../../tokens";
import CircleSvg from "./svgs/circle";
import RectangleSvg from "./svgs/rectangle";
import RectangleOutlineSvg from "./svgs/rectangle-outline";
import GoogleSvg from "./svgs/google";
import SearchSvg from "./svgs/search";
import VisibleSvg from "./svgs/visible";
import CircleSuccessSvg from "./svgs/circle-success";
import CircleErrorSvg from "./svgs/circle-error";
import WarningSvg from "./svgs/warning";
import CircleInfoSvg from "./svgs/circle-info";
import LogoSvg from "./svgs/logo";
import CloseSvg from "./svgs/close";
import NotificationSvg from "./svgs/notification";
import ProgressSvg from "./svgs/progress";
import UploadSvg from "./svgs/upload";

type TokenSize = ComponentSize;
type NumericSize = number;
type IconSize = TokenSize | NumericSize;

type IconProps = {
  name: string;
  size?: IconSize;
  variant?: "dark" | "light";
};

// Helper to determine if size is a token
const isTokenSize = (size: IconSize): size is TokenSize => {
  return typeof size === "string" && ["sm", "md", "lg", "xl"].includes(size);
};

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "logo": LogoSvg,
  "circle": CircleSvg,
  "rectangle": RectangleSvg,
  "rectangle-outline": RectangleOutlineSvg,
  "google": GoogleSvg,
  "search": SearchSvg,
  "visible": VisibleSvg,
  "circle-success": CircleSuccessSvg,
  "circle-error": CircleErrorSvg,
  "warning": WarningSvg,
  "circle-info": CircleInfoSvg,
  "close": CloseSvg,
  "notification": NotificationSvg,
  "progress": ProgressSvg,
  "upload": UploadSvg,
};

export default function Icon({
  name,
  size = "md",
  variant = "light",
}: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  const iconSize = isTokenSize(size)
    ? getComponentSize(size).iconSize
    : size;

  const variantToken = getComponentVariant(variant);
  const iconColorClass = variantToken.text;

  return (
    <IconComponent
      width={iconSize}
      height={iconSize}
      className={[iconColorClass].filter(Boolean).join(" ")}
    />
  );
}

export type { IconProps };
