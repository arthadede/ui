/**
 * Token Usage Examples
 *
 * This file demonstrates correct usage patterns for the sizing token system.
 * Use these examples as templates when creating new components.
 */

import React from "react";
import { getSizeClasses, getComponentSize, type ComponentSize } from "../src/tokens";
import Icon from "../src/components/Icon/Icon";

// ============================================================================
// Example 1: Basic Button-like Component
// ============================================================================
// Use this pattern for components with text, icons, and flexible content

type BasicButtonProps = {
  size?: ComponentSize;
  leftIcon?: string;
  children: React.ReactNode;
};

function BasicButton({ size = "md", leftIcon, children }: BasicButtonProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded
        ${sizeClasses.container}
        ${sizeClasses.text}
        ${sizeClasses.minWidth}
        bg-blue-500 text-white
      `}
    >
      {leftIcon && <Icon name={leftIcon} size={sizeClasses.iconSize} />}
      <span>{children}</span>
    </button>
  );
}

// Usage:
// <BasicButton size="sm" leftIcon="search">Search</BasicButton>
// <BasicButton size="md">Default</BasicButton>
// <BasicButton size="lg" leftIcon="upload">Upload File</BasicButton>

// ============================================================================
// Example 2: Icon-only Button
// ============================================================================
// Use this pattern for square icon buttons

type IconOnlyButtonProps = {
  iconName: string;
  size?: ComponentSize;
  "aria-label": string;
};

function IconOnlyButton({ iconName, size = "md", "aria-label": ariaLabel }: IconOnlyButtonProps) {
  const sizeClasses = getSizeClasses(size);

  const sizeMap: Record<ComponentSize, string> = {
    sm: "size-9",
    md: "size-10",
    lg: "size-12",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded
        ${sizeMap[size]}
        ${sizeClasses.padding}
        bg-gray-100
      `}
      aria-label={ariaLabel}
    >
      <Icon name={iconName} size={sizeClasses.iconSize} />
    </button>
  );
}

// Usage:
// <IconOnlyButton iconName="close" size="sm" aria-label="Close" />
// <IconOnlyButton iconName="search" size="md" aria-label="Search" />
// <IconOnlyButton iconName="notification" size="lg" aria-label="Notifications" />

// ============================================================================
// Example 3: Input Field with Icon
// ============================================================================
// Use this pattern for form inputs with decorative icons

type InputWithIconProps = {
  leftIcon?: string;
  size?: ComponentSize;
  placeholder?: string;
};

function InputWithIcon({ leftIcon, size = "md", placeholder }: InputWithIconProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div
      className={`
        inline-flex items-center border border-gray-300 rounded
        ${sizeClasses.padding}
        ${sizeClasses.gap}
      `}
    >
      {leftIcon && <Icon name={leftIcon} size={sizeClasses.iconSize} />}
      <input
        type="text"
        placeholder={placeholder}
        className={`
          ${sizeClasses.text}
          border-none outline-none bg-transparent
        `}
      />
    </div>
  );
}

// Usage:
// <InputWithIcon leftIcon="search" size="sm" placeholder="Search..." />
// <InputWithIcon leftIcon="search" size="md" placeholder="Search..." />
// <InputWithIcon size="lg" placeholder="Enter text..." />

// ============================================================================
// Example 4: Badge Component with Custom Token Usage
// ============================================================================
// Use this pattern when you need individual token values rather than combined classes

type BadgeProps = {
  children: React.ReactNode;
  size?: ComponentSize;
  icon?: string;
};

function Badge({ children, size = "sm", icon }: BadgeProps) {
  // Use getComponentSize() for raw token access
  const tokens = getComponentSize(size);

  return (
    <span
      className={`
        inline-flex items-center rounded-full
        px-2 py-1
        ${tokens.gap}
        ${tokens.fontSize}
        ${tokens.lineHeight}
        ${tokens.fontWeight}
        bg-blue-100 text-blue-800
      `}
    >
      {icon && <Icon name={icon} size={tokens.iconSize} />}
      {children}
    </span>
  );
}

// Usage:
// <Badge size="sm" icon="circle-success">Active</Badge>
// <Badge size="md" icon="circle-info">Info</Badge>
// <Badge size="lg">Status</Badge>

// ============================================================================
// Example 5: Card Component with Multiple Token Applications
// ============================================================================
// Use this pattern for complex components that need tokens in multiple places

type CardProps = {
  title: string;
  content: string;
  icon?: string;
  size?: ComponentSize;
};

function Card({ title, content, icon, size = "md" }: CardProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header with icon and title */}
      <div
        className={`
          flex items-center border-b border-gray-200
          ${sizeClasses.padding}
          ${sizeClasses.gap}
          bg-gray-50
        `}
      >
        {icon && <Icon name={icon} size={sizeClasses.iconSize} />}
        <h3 className={sizeClasses.text}>{title}</h3>
      </div>

      {/* Content area */}
      <div className={sizeClasses.padding}>
        <p className={sizeClasses.text}>{content}</p>
      </div>
    </div>
  );
}

// Usage:
// <Card size="sm" icon="circle-info" title="Small Card" content="Compact information" />
// <Card size="md" icon="notification" title="Medium Card" content="Standard content" />
// <Card size="lg" icon="warning" title="Large Card" content="Important information" />

// ============================================================================
// Example 6: List Item with Interactive States
// ============================================================================
// Use this pattern for list items, menu items, or navigation elements

type ListItemProps = {
  label: string;
  leftIcon?: string;
  rightIcon?: string;
  size?: ComponentSize;
  onClick?: () => void;
};

function ListItem({ label, leftIcon, rightIcon, size = "md", onClick }: ListItemProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        ${sizeClasses.padding}
        ${sizeClasses.gap}
        ${sizeClasses.text}
        hover:bg-gray-100 transition-colors
        text-left
      `}
    >
      <div className={`flex items-center ${sizeClasses.gap}`}>
        {leftIcon && <Icon name={leftIcon} size={sizeClasses.iconSize} />}
        <span>{label}</span>
      </div>
      {rightIcon && <Icon name={rightIcon} size={sizeClasses.iconSize} />}
    </button>
  );
}

// Usage:
// <ListItem size="sm" leftIcon="search" label="Search" />
// <ListItem size="md" leftIcon="notification" rightIcon="circle-info" label="Notifications" />
// <ListItem size="lg" leftIcon="upload" label="Upload File" onClick={() => {}} />

// ============================================================================
// Example 7: Accessing Raw Token Values
// ============================================================================
// Use this when you need to programmatically work with token values

function TokenInspector({ size = "md" }: { size?: ComponentSize }) {
  const sizeClasses = getSizeClasses(size);
  const rawTokens = getComponentSize(size);

  return (
    <div className="font-mono text-sm">
      <h4>getSizeClasses() output:</h4>
      <pre>{JSON.stringify(sizeClasses, null, 2)}</pre>

      <h4 className="mt-4">getComponentSize() output:</h4>
      <pre>{JSON.stringify(rawTokens, null, 2)}</pre>
    </div>
  );
}

// Usage:
// <TokenInspector size="sm" />
// <TokenInspector size="md" />
// <TokenInspector size="lg" />

// ============================================================================
// Example 8: Dynamic Size Prop with Default
// ============================================================================
// Use this pattern to properly type and default the size prop

type FlexibleComponentProps = {
  children: React.ReactNode;
  size?: ComponentSize;
  variant?: "primary" | "secondary";
};

function FlexibleComponent({ children, size = "md", variant = "primary" }: FlexibleComponentProps) {
  const sizeClasses = getSizeClasses(size);

  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-900",
  };

  return (
    <div
      className={`
        inline-flex items-center justify-center rounded
        ${sizeClasses.container}
        ${sizeClasses.text}
        ${variantClasses[variant]}
      `}
    >
      {children}
    </div>
  );
}

// Usage with TypeScript autocompletion:
// <FlexibleComponent size="sm">Small</FlexibleComponent>
// <FlexibleComponent size="md" variant="secondary">Medium</FlexibleComponent>
// <FlexibleComponent size="lg" variant="primary">Large</FlexibleComponent>

// ============================================================================
// Anti-Patterns (DON'T DO THIS)
// ============================================================================

// ❌ BAD: Hard-coding sizes
function BadButton1({ size = "md" }: { size?: ComponentSize }) {
  const iconSize = size === "sm" ? 20 : size === "md" ? 24 : 28;
  return <Icon name="search" size={iconSize} />;
}

// ❌ BAD: Creating local size configs
function BadButton2({ size = "md" }: { size?: ComponentSize }) {
  const sizeConfig = {
    sm: { padding: "p-2", iconSize: 20 },
    md: { padding: "p-2", iconSize: 24 },
    lg: { padding: "p-3", iconSize: 28 },
  };
  return <Icon name="search" size={sizeConfig[size].iconSize} />;
}

// ❌ BAD: Not using ComponentSize type
function BadButton3({ size = "md" }: { size?: string }) {
  // Type safety is lost!
  return <div>{size}</div>;
}

// ✅ GOOD: Use the token system
function GoodButton({ size = "md" }: { size?: ComponentSize }) {
  const sizeClasses = getSizeClasses(size);
  return <Icon name="search" size={sizeClasses.iconSize} />;
}

// ============================================================================
// Export examples for demonstration
// ============================================================================

export {
  BasicButton,
  IconOnlyButton,
  InputWithIcon,
  Badge,
  Card,
  ListItem,
  TokenInspector,
  FlexibleComponent,
};
