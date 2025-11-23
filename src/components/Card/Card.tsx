
import React from 'react';
import { getVariantClasses, getShadowClasses, getAdaptiveVariantClassesString } from '../../tokens';

export interface CardProps {
  children: React.ReactNode;
  mode?: 'dark' | 'light' | 'auto';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card = ({
  children,
  mode = 'auto',
  padding = 'md',
  className = '',
  shadow = 'sm'
}: CardProps) => {
  const variantClasses = mode === 'auto'
    ? getAdaptiveVariantClassesString('card')
    : getVariantClasses(mode === 'dark' ? 'surface-dark' : 'surface-light');
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