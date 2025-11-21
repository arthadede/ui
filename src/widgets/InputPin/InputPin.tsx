import React from "react";

export type InputPinProps = {
  values: string[];
  onChange: (values: string[]) => void;
  length?: number;
  className?: string;
  disabled?: boolean;
};

const InputPin: React.FC<InputPinProps> = ({
  values,
  onChange,
  length = 6,
  className = "",
  disabled = false
}) => {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  React.useEffect(() => {
    if (inputsRef.current.length !== length) {
      inputsRef.current = Array(length).fill(null);
    }
  }, [length]);

  const setRef = (el: HTMLInputElement | null, idx: number) => {
    inputsRef.current[idx] = el;
  };

  const handleChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const val = e.target.value.replace(/\D/g, "");
    const next = [...values];
    if (!val) {
      next[idx] = "";
      onChange(next);
      return;
    }
    next[idx] = val[0];
    onChange(next);
    if (idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const txt = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!txt) return;
    const next = [...values];
    for (let i = 0; i < length && i < txt.length; i++) next[i] = txt[i];
    onChange(next);
    const nextIdx = Math.min(txt.length, length - 1);
    inputsRef.current[nextIdx]?.focus();
  };

  
  const baseInputClass = [
    "w-12 h-12",
    "border border-white/10 rounded",
    "bg-white/8",
    "text-white text-center placeholder:text-white/30",
    "text-base leading-6 font-medium",
    "transition-colors",
    "focus:outline-none focus:border-white focus:bg-white/12",
    disabled && "opacity-50 cursor-not-allowed",
    "select-none",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex justify-between ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => setRef(el, i)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          pattern="[0-9]*"
          className={baseInputClass}
          value={values[i] || ""}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-describedby={`pin-input-${length}-description`}
        />
      ))}
    </div>
  );
};

InputPin.displayName = "InputPin";
export default InputPin;