
export interface InlineErrorProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
}

const InlineError = ({
  children,
  variant = 'light',
  className = ''
}: InlineErrorProps) => {
  const variantClasses = {
    dark: 'text-red-400',
    light: 'text-red-600',
  };

  return (
    <div
      className={`
        text-sm leading-5
        ${variantClasses[variant]}
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