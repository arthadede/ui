

import { getTypographyToken, getAdaptiveVariantClassesString } from '../../tokens';
import { getOpacityClass } from '../../tokens';

export interface InlineErrorProps {
  children: React.ReactNode;
  mode?: 'dark' | 'light' | 'auto';
  className?: string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg';
  variant?: 'error' | 'warning' | 'info' | 'success';
}

const InlineError = ({
  children,
  mode = 'auto',
  className = '',
  fontSize = 'sm',
  variant = 'error'
}: InlineErrorProps) => {
  // Get typography tokens for consistent text styling
  const typographyToken = getTypographyToken('body');

  // Color variants for different error types
  const variantColors = {
    error: mode === 'auto'
      ? 'text-red-600 dark:text-red-400'
      : mode === 'dark' ? 'text-red-400' : 'text-red-600',
    warning: mode === 'auto'
      ? 'text-amber-600 dark:text-amber-400'
      : mode === 'dark' ? 'text-amber-400' : 'text-amber-600',
    info: mode === 'auto'
      ? 'text-cyan-600 dark:text-cyan-400'
      : mode === 'dark' ? 'text-cyan-400' : 'text-cyan-600',
    success: mode === 'auto'
      ? 'text-emerald-600 dark:text-emerald-400'
      : mode === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
  };

  // Override font size if specified
  const fontSizeClass = fontSize !== 'sm'
    ? getTypographyToken(fontSize === 'xs' ? 'caption' : fontSize === 'base' ? 'body' : 'label').className
    : typographyToken.className;

  return (
    <div
      className={`
        ${fontSizeClass}
        ${variantColors[variant]}
        ${getOpacityClass('100')}
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      {children}
    </div>
  );
};

export default InlineError;