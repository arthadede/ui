
import { getComponentVariant, getAdaptiveVariantClassesString, getTypographyToken } from '../../tokens';
import { getPaddingClasses } from '../../tokens';

export interface DividerProps {
  text?: string;
  mode?: 'dark' | 'light' | 'auto';
  className?: string;
  spacing?: 'sm' | 'compact' | 'normal' | 'relaxed';
}

const Divider = ({
  text = 'OR',
  mode = 'auto',
  className = '',
  spacing = 'normal'
}: DividerProps) => {
  // Get typography tokens for consistent text styling
  const typographyToken = getTypographyToken('label');

  // Determine if we should use adaptive mode
  const isAdaptive = mode === 'auto';
  const effectiveVariant = mode === 'auto' ? undefined : mode;

  const surfaceVariant = effectiveVariant === 'dark' ? 'surface-dark' : 'surface-light';
  const variantTokens = getComponentVariant(surfaceVariant);

  const paddingClasses = getPaddingClasses(spacing as 'none' | 'xs' | 'sm' | 'compact' | 'normal' | 'relaxed' | 'xl' | '2xl' | '3xl');

  if (!text) {
    return (
      <div className={`
        border-t
        ${isAdaptive ? 'border-gray-200 dark:border-gray-800' : variantTokens.border}
        ${className}
      `} />
    );
  }

  return (
    <div className={`
      relative
      ${className}
    `}>
      <div className="absolute inset-0 flex items-center">
        <div className={`w-full border-t ${isAdaptive ? 'border-gray-200 dark:border-gray-800' : variantTokens.border}`} />
      </div>
      <div className="relative flex justify-center">
        <span className={`
          ${paddingClasses}
          ${typographyToken.className}
          ${isAdaptive ? getAdaptiveVariantClassesString('card') : `${variantTokens.background} ${variantTokens.text}`}
        `}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default Divider;