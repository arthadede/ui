import React from 'react';
import { Input } from '../../components/Input';
import { type ComponentSize, getSizeClasses } from '../../tokens';

export type InputPinProps = {
  onChange: (values: string[]) => void;
  length?: number;
  size?: ComponentSize;
  variant?: "dark" | "light";
  className?: string;
  disabled?: boolean;
};

const InputPin: React.FC<InputPinProps> = ({
  onChange,
  length = 4,
  size = "md",
  variant = "dark",
  className = "",
  disabled = false
}) => {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const sizeClasses = getSizeClasses(size);

  const [values, setValues] = React.useState<string[]>(() => {
    return Array(length).fill('');
  });

  React.useEffect(() => {
    if (inputsRef.current.length !== length) {
      inputsRef.current = Array(length).fill(null);
    }
  }, [length]);

  React.useEffect(() => {
    if (values.length !== length) {
      setValues(Array(length).fill(""));
    }
  }, [length, values.length]);

  const setRef = (containerEl: HTMLDivElement | null, idx: number) => {
    if (containerEl) {
      const input = containerEl.querySelector('input');
      inputsRef.current[idx] = input;
    }
  };

  const handleChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Only allow numbers
    const val = e.target.value.replace(/\D/g, "");
    const next = [...values];

    if (!val) {
      next[idx] = "";
      setValues(next);
      onChange(next);
      return;
    }

    // Handle multiple digits - fill consecutive inputs (auto-advance)
    let focusIndex = idx;
    for (let i = 0; i < val.length && idx + i < length; i++) {
      next[idx + i] = val[i];
      focusIndex = idx + i;
    }

    setValues(next);
    onChange(next);

    // Clear the current input field to prevent value duplication
    e.target.value = "";

    // Auto-focus next empty input after the last filled one (left-to-right progression)
    const nextFocusIdx = focusIndex + 1;
    if (nextFocusIdx < length) {
      setTimeout(() => {
        inputsRef.current[nextFocusIdx]?.focus();
        inputsRef.current[nextFocusIdx]?.select();
      }, 0);
    }
  };

  const handleKeyDown = (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Backspace: delete current value and move to previous input
    if (e.key === "Backspace") {
      if (values[idx]) {
        // If current field has value, clear it
        const next = [...values];
        next[idx] = "";
        setValues(next);
        onChange(next);
      } else if (idx > 0) {
        // If current field is empty, move to previous field
        inputsRef.current[idx - 1]?.focus();
      }
    }

    // Arrow Left: move to previous input
    if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
    }

    // Arrow Right: move to next input
    if (e.key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    // Only allow numbers
    const txt = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!txt) return;

    const next = [...values];
    for (let i = 0; i < length && i < txt.length; i++) {
      next[i] = txt[i];
    }
    setValues(next);
    onChange(next);

    const nextIdx = Math.min(txt.length, length - 1);
    inputsRef.current[nextIdx]?.focus();
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`${sizeClasses.size} shrink-0`}
          ref={(el) => setRef(el, i)}
        >
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            size={size}
            variant={variant}
            value={values[i] || ""}
            onChange={handleChange(i)}
            onKeyDown={handleKeyDown(i)}
            onPaste={handlePaste}
            disabled={disabled}
            className="w-full [&_input]:text-center [&_input]:min-w-0"
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-describedby={`pin-input-${length}-description`}
          />
        </div>
      ))}
    </div>
  );
};

InputPin.displayName = "InputPin";
export default InputPin;