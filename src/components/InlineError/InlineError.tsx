

export interface InlineErrorProps {
  children: React.ReactNode;
  mode?: 'dark' | 'light' | 'auto';
  className?: string;
}

const InlineError = ({
  children,
  mode = 'auto',
  className = ''
}: InlineErrorProps) => {
  // Determine if we should use adaptive mode
  const isAdaptive = mode === 'auto';
  const effectiveVariant = mode === 'auto' ? undefined : mode;

  const variantClasses = {
    dark: 'text-red-400',
    light: 'text-red-600',
  };

  return (
    <div
      className={`
        text-sm leading-5
        ${isAdaptive ? 'text-red-600 dark:text-red-400' : variantClasses[effectiveVariant!]}
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