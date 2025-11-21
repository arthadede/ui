import { getVariantClasses } from "../../tokens/color";
import { getSizeClasses, getTypographyForSize, type ComponentSize } from "../../tokens";

export type ChipState = "processing" | "success" | "error" | "info" | "default";

export type ChipProps = {
  text?: string;
  state?: ChipState;
  size?: ComponentSize;
};

export default function Chip({
  text = "TEXT CHIP",
  state = "processing",
  size = "sm",
}: ChipProps) {
  // Map ChipState to ComponentVariant for token system compatibility
  const stateToVariantMap: Record<ChipState, "warning" | "success" | "error" | "info" | "dark"> = {
    processing: "warning",
    success: "success",
    error: "error",
    info: "info",
    default: "dark",
  };

  const variant = stateToVariantMap[state];
  const variantClasses = getVariantClasses(variant);

  // Get size and typography classes from token system
  const sizeClasses = getSizeClasses(size);
  const typographyClasses = getTypographyForSize(size);

  // Base classes - shared structure and layout
  const baseClasses = "inline-flex items-center justify-center rounded border border-solid";

  return (
    <div className={[baseClasses, sizeClasses.container, typographyClasses.className, variantClasses].filter(Boolean).join(" ")}>
      <p className="text-white/80">{text}</p>
    </div>
  );
}