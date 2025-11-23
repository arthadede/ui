import React, { useState, useRef, useEffect, useCallback } from "react";
import { Icon } from "../Icon";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getSizeClasses, getVariantClasses, getComponentVariant, getComponentTypography, getAdaptiveVariantClasses, type ComponentSize } from "../../tokens";

export type AutocompleteProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  leftIcon?: string;
  rightIcon?: string;
  size?: ComponentSize;
  mode?: "dark" | "light" | "auto";
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  onInputChange?: (value: string) => void;
  onOptionSelect?: (option: { value: string; label: string }) => void;
  filterOptions?: boolean;
  showNoResults?: boolean;
  noResultsText?: string;
  loading?: boolean;
};

export default function Autocomplete({
  leftIcon,
  rightIcon,
  size = "md",
  mode = "auto",
  className = "",
  disabled,
  options = [],
  onInputChange,
  onOptionSelect,
  filterOptions = true,
  showNoResults = true,
  noResultsText = "No results found",
  loading = false,
  value,
  ...rest
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const baseClasses = "flex items-center rounded transition-colors focus-within:outline-none relative";

  const inputTypography = getComponentTypography("input-text");

  const sizeClasses = getSizeClasses(size);

  let variantClasses: string;
  let variantTokens: any;
  let placeholderColor: string;

  if (mode === "auto") {
    variantTokens = getAdaptiveVariantClasses('input');
    variantClasses = [
      variantTokens.background,
      variantTokens.border,
      variantTokens.hover,
      variantTokens.focus,
      variantTokens.disabled,
    ].filter(Boolean).join(" ");
    placeholderColor = "placeholder:text-gray-400 dark:placeholder:text-gray-500";
  } else {
    const inputVariant = mode === "dark" ? "input-dark" : "input-light";
    variantClasses = getVariantClasses(inputVariant);
    variantTokens = getComponentVariant(inputVariant);
    placeholderColor = mode === "dark" ? "placeholder:text-gray-400" : "placeholder:text-gray-500";
  }

  const inputClasses = [
    "flex-1",
    "bg-transparent",
    "border-none",
    "outline-none",
    inputTypography.className,
    mode === "auto" ? "text-black dark:text-white" : variantTokens.text,
    placeholderColor,
  ].join(" ");

  // Filter options based on input value
  const filterOptionsList = useCallback((searchValue: string) => {
    if (!filterOptions || !searchValue.trim()) {
      return options;
    }
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, filterOptions]);

  // Update filtered options when input or options change
  useEffect(() => {
    setFilteredOptions(filterOptionsList(String(inputValue)));
  }, [inputValue, options, filterOptionsList]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    onInputChange?.(newValue);
  };

  // Handle option selection
  const handleOptionSelect = (option: { value: string; label: string }) => {
    setInputValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onOptionSelect?.(option);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    }
  };

  // Handle focus and blur
  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay closing to allow option clicks
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, 150);
    rest.onBlur?.(e);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const renderIcon = (iconName: string) => {
    if (!iconName) return null;

    return (
      <span className="relative shrink-0">
        <Icon name={iconName} size={sizeClasses.iconSize} mode={mode} />
      </span>
    );
  };

  // Dropdown styling
  let dropdownVariantClasses: string;
  let dropdownTextClass: string;

  if (mode === "auto") {
    const cardTokens = getAdaptiveVariantClasses('card');
    dropdownVariantClasses = [
      cardTokens.background,
      cardTokens.border,
    ].filter(Boolean).join(" ");
    dropdownTextClass = "text-black dark:text-white";
  } else {
    const dropdownVariant = mode === "dark" ? "surface-dark" : "surface-light";
    dropdownVariantClasses = getVariantClasses(dropdownVariant);
    dropdownTextClass = mode === "dark" ? "text-white" : "text-black";
  }

  const dropdownClasses = [
    "absolute z-50 w-full mt-1 rounded shadow-lg border max-h-60 overflow-auto",
    dropdownVariantClasses,
    dropdownTextClass,
  ].join(" ");

  return (
    <div className={`relative ${className}`}>
      <div
        className={[
          baseClasses,
          sizeClasses.container,
          variantClasses,
          disabled && "opacity-50",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {leftIcon && renderIcon(leftIcon)}
        <input
          ref={inputRef}
          className={inputClasses}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          data-mode={mode}
          autoComplete="off"
          {...rest}
        />
        {loading && (
          <span className="relative shrink-0">
            <LoadingSpinner size={size} mode={mode} />
          </span>
        )}
        {!loading && rightIcon && renderIcon(rightIcon)}
      </div>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className={dropdownClasses}
          role="listbox"
          aria-label="Options"
        >
          {filteredOptions.length === 0 ? (
            showNoResults && (
              <li
                className={`px-3 py-2 cursor-default ${inputTypography.className} ${
                  mode === "auto" ? "text-gray-500 dark:text-gray-400" : "text-gray-500"
                }`}
                role="option"
                aria-disabled="true"
              >
                {noResultsText}
              </li>
            )
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                className={`px-3 py-2 cursor-pointer ${inputTypography.className} ${
                  highlightedIndex === index
                    ? mode === "auto"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : mode === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : mode === "auto"
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700"
                    : mode === "dark"
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                } ${
                  option.disabled
                    ? mode === "auto"
                      ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => !option.disabled && handleOptionSelect(option)}
                role="option"
                aria-selected={highlightedIndex === index}
                aria-disabled={option.disabled}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}