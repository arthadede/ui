
import { getComponentVariant } from '../../tokens';

export interface DividerProps {
  text?: string;
  variant?: 'dark' | 'light';
  className?: string;
}

const Divider = ({
  text = 'OR',
  variant = 'light',
  className = ''
}: DividerProps) => {
  const surfaceVariant = variant === 'dark' ? 'surface-dark' : 'surface-light';
  const variantTokens = getComponentVariant(surfaceVariant);

  if (!text) {
    return (
      <div className={`
        border-t
        ${variantTokens.border}
        ${className}
      `} />
    );
  }

  return (
    <div className={`
      relative
      ${className}
    `}>
      <div className={`
        absolute inset-0 flex items-center
        ${variantTokens.border}
      `}>
        <div className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className={`
          px-4
          ${variantTokens.background}
          ${variantTokens.text}
        `}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default Divider;