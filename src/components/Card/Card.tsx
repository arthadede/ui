
import React from 'react';
import { getVariantClasses, getShadowClasses, getAdaptiveVariantClassesString, getBorderRadiusClasses } from '../../tokens';
import { getPaddingClasses } from '../../tokens';

export interface CardProps {
  children: React.ReactNode;
  mode?: 'dark' | 'light' | 'auto';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Card = ({
  children,
  mode = 'auto',
  padding = 'md',
  className = '',
  shadow = 'sm',
  borderRadius = 'lg'
}: CardProps) => {
  const variantClasses = mode === 'auto'
    ? getAdaptiveVariantClassesString('card')
    : getVariantClasses(mode === 'dark' ? 'surface-dark' : 'surface-light');
  const borderRadiusClasses = getBorderRadiusClasses(borderRadius);
  const shadowClasses = getShadowClasses(shadow);
  const paddingClasses = getPaddingClasses(padding as 'none' | 'xs' | 'sm' | 'compact' | 'normal' | 'relaxed' | 'xl' | '2xl' | '3xl');

  return (
    <div className={`
      ${variantClasses}
      ${borderRadiusClasses}
      ${shadowClasses}
      ${paddingClasses}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;