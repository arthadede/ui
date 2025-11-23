
import { getComponentVariant } from '../../tokens';
import { getAdaptiveVariantClassesString } from '../../tokens/color';

export interface DividerProps {
  text?: string;
  mode?: 'dark' | 'light' | 'auto';
  className?: string;
}

const Divider = ({
  text = 'OR',
  mode = 'auto',
  className = ''
}: DividerProps) => {
  // Determine if we should use adaptive mode
  const isAdaptive = mode === 'auto';
  const effectiveVariant = mode === 'auto' ? undefined : mode;

  const surfaceVariant = effectiveVariant === 'dark' ? 'surface-dark' : 'surface-light';
  const variantTokens = getComponentVariant(surfaceVariant);

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
      <div className="relative flex justify-center text-sm">
        <span className={`
          px-4
          ${isAdaptive ? getAdaptiveVariantClassesString('card') : `${variantTokens.background} ${variantTokens.text}`}
        `}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default Divider;