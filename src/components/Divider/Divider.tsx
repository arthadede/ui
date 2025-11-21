
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
  const variantClasses = {
    dark: 'border-gray-700 text-gray-400',
    light: 'border-gray-300 text-gray-500',
  };

  if (!text) {
    return (
      <div className={`
        border-t
        ${variantClasses[variant]}
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
        ${variantClasses[variant].split(' ')[0]}
      `}>
        <div className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className={`
          bg-white px-4
          ${variant === 'dark' ? 'bg-gray-900' : 'bg-white'}
          ${variantClasses[variant].split(' ')[1]}
        `}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default Divider;