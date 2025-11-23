"use client";

import React from "react";
import { getComponentSize, getComponentVariant, getAdaptiveVariantClasses, type ComponentSize } from "../../tokens";
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
import CloudUploadSvg from "./svgs/cloud-upload";
import EmailSvg from "./svgs/email";
import LockSvg from "./svgs/lock";
import SpinnerSvg from "./svgs/spinner";
import ChevronRightSvg from "./svgs/chevron-right";
import ChevronDownSvg from "./svgs/chevron-down";

type TokenSize = ComponentSize;
type NumericSize = number;
type IconSize = TokenSize | NumericSize;

type IconProps = {
  name: string;
  size?: IconSize;
  mode?: "dark" | "light" | "auto";
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
  "cloud-upload": CloudUploadSvg,
  "email": EmailSvg,
  "lock": LockSvg,
  "spinner": SpinnerSvg,
  "chevron-right": ChevronRightSvg,
  "chevron-down": ChevronDownSvg,
};

export default function Icon({
  name,
  size = "md",
  mode = "auto",
}: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  const iconSize = isTokenSize(size)
    ? getComponentSize(size).iconSize
    : size;

  const iconColorClass = mode === "auto"
    ? getAdaptiveVariantClasses('icon').text
    : getComponentVariant(mode).text;

  return (
    <IconComponent
      width={iconSize}
      height={iconSize}
      className={[iconColorClass].filter(Boolean).join(" ")}
    />
  );
}

export type { IconProps };
