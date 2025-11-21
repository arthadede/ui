
import React from 'react';
import { getVariantClasses, getShadowClasses } from '../../tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card = ({
  children,
  variant = 'light',
  padding = 'md',
  className = '',
  shadow = 'sm'
}: CardProps) => {
  const surfaceVariant = variant === 'dark' ? 'surface-dark' : 'surface-light';
  const variantClasses = getVariantClasses(surfaceVariant);
  const borderRadiusClasses = 'rounded-lg'; // Static border radius
  const shadowClasses = getShadowClasses(shadow);

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`
      ${variantClasses}
      ${borderRadiusClasses}
      ${shadowClasses}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;