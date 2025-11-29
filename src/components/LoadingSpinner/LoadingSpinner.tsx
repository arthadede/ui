
import { getSizeClasses, getAdaptiveVariantClassesString } from '../../tokens';
import { getOpacityClass } from '../../tokens';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mode?: 'dark' | 'light' | 'auto';
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const LoadingSpinner = ({
  size = 'md',
  mode = 'auto',
  className = '',
  variant = 'primary'
}: LoadingSpinnerProps) => {
  const sizeClasses = getSizeClasses(size);

  // Get adaptive color tokens for spinner
  const colorTokens = mode === 'auto'
    ? getAdaptiveVariantClassesString('icon')
    : {
        background: "",
        text: mode === 'dark' ? 'text-white' : 'text-black',
        hover: "",
        focus: "",
        disabled: "",
        border: "",
      };

  // Variant color mappings
  const variantColors = {
    primary: colorTokens.text,
    secondary: mode === 'dark' ? 'text-gray-400' : 'text-gray-600',
    success: 'text-emerald-400',
    error: 'text-red-400',
    warning: 'text-amber-400',
    info: 'text-cyan-400',
  };

  const colorClass = variantColors[variant];

  return (
    <div
      className={`
        animate-spin
        ${sizeClasses.size}
        ${colorClass}
        ${getOpacityClass('100')}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className={getOpacityClass('25')}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className={getOpacityClass('75')}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;