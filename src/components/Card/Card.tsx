
export interface CardProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Card = ({
  children,
  variant = 'light',
  padding = 'md',
  className = ''
}: CardProps) => {
  const variantClasses = {
    dark: 'bg-gray-900 border border-gray-800',
    light: 'bg-white border border-gray-200',
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`
      rounded-lg shadow-sm
      ${variantClasses[variant]}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;