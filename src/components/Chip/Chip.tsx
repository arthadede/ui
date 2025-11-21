import { getVariantClasses } from "../../tokens/color";
import { getComponentTypography } from "../../tokens";

export type ChipState = "processing" | "success" | "error" | "info" | "default";

export type ChipProps = {
  label?: string;
  state?: ChipState;
  className?: string;
};

export default function Chip({
  label = "TEXT CHIP",
  state = "processing",
  className = "",
}: ChipProps) {
  // Map ChipState to ComponentVariant for token system compatibility
  const stateToVariantMap: Record<ChipState, "warning" | "success" | "error" | "info" | "secondary"> = {
    processing: "warning",
    success: "success",
    error: "error",
    info: "info",
    default: "secondary",
  };

  const variant = stateToVariantMap[state];
  const variantClasses = getVariantClasses(variant);

  // Get typography token for chip text
  const chipTypography = getComponentTypography("chip-text");

  // Base classes - shared structure and layout
  const baseClasses = "inline-flex items-center justify-center rounded border border-solid gap-2.5 px-2 py-1";

  return (
    <div className={[baseClasses, variantClasses, className].filter(Boolean).join(" ")}>
      <p className={`${chipTypography.className} text-white/80`}>{label}</p>
    </div>
  );
}