"use client";

import React from "react";
import Icon from "../Icon/Icon";
import { getSizeClasses, getTypographyForSize, getAdaptiveVariantClassesString, type ComponentSize } from "../../tokens";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = React.HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  size?: ComponentSize;
  mode?: "dark" | "light" | "auto";
  "aria-label"?: string;
};

export default function Breadcrumbs({
  items,
  size = "md",
  mode = "auto",
  "aria-label": ariaLabel = "Breadcrumb navigation",
  className,
  ...rest
}: BreadcrumbsProps) {
  if (!items.length) {
    return null;
  }

  const sizeClasses = getSizeClasses(size);
  const typographyClasses = getTypographyForSize(size);
  const variantClasses = getAdaptiveVariantClassesString('icon');

  const baseClasses = "flex items-center overflow-x-auto";
  const itemClasses = "flex items-center whitespace-nowrap transition-colors";
  const linkClasses = "hover:opacity-70 focus:outline-none focus:opacity-80";

  return (
    <nav
      aria-label={ariaLabel}
      className={[baseClasses, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isClickable = item.href && !isLast;

          return (
            <li key={index} className="flex items-center">
              {isClickable ? (
                <a
                  href={item.href}
                  className={[
                    itemClasses,
                    typographyClasses.className,
                    variantClasses,
                    linkClasses
                  ].filter(Boolean).join(" ")}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={[
                    itemClasses,
                    typographyClasses.className,
                    variantClasses,
                    isLast ? "font-medium" : ""
                  ].filter(Boolean).join(" ")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="mx-2" aria-hidden="true">
                  <Icon
                    name="chevron-right"
                    size={sizeClasses.iconSize}
                    mode={mode}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}