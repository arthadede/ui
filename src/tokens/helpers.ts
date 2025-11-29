/**
 * Token Helper Functions
 *
 * This file provides convenient helper functions for consistent token usage
 * across components, reducing boilerplate and ensuring standardized styling.
 */

import {
  getAdaptiveVariantClassesString,
  getVariantClasses,
  getComponentVariant
} from './color';
import { getTypographyToken, getTypographyForSize } from './typography';
import { getPaddingClasses } from './spacing';
import { getSpacingClasses } from './spacing';
import { getSizeClasses } from './size';
import { getBorderRadiusClasses } from './border';
import { getShadowClasses } from './border';
import { getOpacityClass } from './opacity';
import { getTransitionClasses } from './animation';
import { getZIndexClass } from './zIndex';
import type { ComponentSize } from './size';
import type { BorderRadiusSize, ShadowLevel } from './border';
import type { SpacingType } from './spacing';

/**
 * Combined styling helpers for components with consistent token usage
 */
export const componentHelpers = {
  /**
   * Get complete variant classes for a component with adaptive mode support
   */
  getVariantClasses: (variant?: 'dark' | 'light' | 'auto', componentType?: string) => {
    if (variant === 'auto' || !variant) {
      return getAdaptiveVariantClassesString(componentType || 'card');
    }
    return getVariantClasses(variant === 'dark' ? 'surface-dark' : 'surface-light');
  },

  /**
   * Get complete typography classes with consistent token usage
   */
  getTypographyClasses: (
    type: 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6' | 'body' | 'label' | 'caption' | 'code'
  ) => {
    const token = getTypographyToken(type);
    return {
      className: token.className,
      fontSize: token.fontSize,
      fontWeight: token.fontWeight,
      lineHeight: token.lineHeight,
      letterSpacing: token.letterSpacing,
    };
  },

  /**
   * Get typography classes by size
   */
  getTypographyClassesBySize: (size: ComponentSize) => {
    const typography = getTypographyForSize(size);
    return {
      className: typography.className,
      size,
    };
  },

  /**
   * Get complete spacing classes with consistent token usage
   */
  getSpacingClasses: (type: SpacingType = 'normal') => {
    return getSpacingClasses(type);
  },

  /**
   * Get complete padding classes with consistent token usage
   */
  getPaddingClasses: (size: 'sm' | 'md' | 'lg' | 'none' | 'xs' | 'compact' | 'normal' | 'relaxed' | 'xl' | '2xl' | '3xl' = 'md') => {
    return getPaddingClasses(size);
  },

  /**
   * Get complete size classes with consistent token usage
   */
  getSizeClasses: (size: ComponentSize) => {
    return getSizeClasses(size);
  },

  /**
   * Get complete border radius classes with consistent token usage
   */
  getBorderRadiusClasses: (size: BorderRadiusSize = 'lg') => {
    return getBorderRadiusClasses(size);
  },

  /**
   * Get complete shadow classes with consistent token usage
   */
  getShadowClasses: (level: ShadowLevel = 'sm') => {
    return getShadowClasses(level);
  },

  /**
   * Get opacity class with consistent token usage
   */
  getOpacityClass: (level: '0' | '25' | '50' | '75' | '100' | 'disabled' | 'faded' | 'subtle' | 'medium' | 'strong') => {
    return getOpacityClass(level);
  },

  /**
   * Get transition classes with consistent token usage
   */
  getTransitionClasses: (
    duration: 'fast' | 'normal' | 'slow',
    timing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'custom',
    type: 'colors' | 'opacity' | 'transform' | 'all'
  ) => {
    return getTransitionClasses(duration, timing, type);
  },

  /**
   * Get z-index class with consistent token usage
   */
  getZIndexClass: (level: 'base' | 'dropdown' | 'sticky' | 'fixed' | 'modal-backdrop' | 'modal') => {
    return getZIndexClass(level);
  },

  /**
   * Get component variant tokens for direct styling access
   */
  getComponentVariantTokens: (variant: 'dark' | 'light') => {
    return getComponentVariant(variant === 'dark' ? 'surface-dark' : 'surface-light');
  },

  /**
   * Create a complete button styling object
   */
  createButtonClasses: (props: {
    size?: ComponentSize;
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
    mode?: 'dark' | 'light' | 'auto';
    disabled?: boolean;
    fullWidth?: boolean;
  }) => {
    const {
      size = 'md',
      variant = 'primary',
      mode = 'auto',
      disabled = false,
      fullWidth = false
    } = props;

    const sizeClasses = getSizeClasses(size);
    const variantClasses = componentHelpers.getVariantClasses(mode);
    const opacityClass = disabled ? getOpacityClass('disabled') : getOpacityClass('100');

    const baseClasses = [
      'inline-flex items-center justify-center',
      'font-medium rounded-md transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      fullWidth ? 'w-full' : '',
      sizeClasses.size,
      opacityClass,
    ].filter(Boolean).join(' ');

    const variantStyles = {
      primary: variantClasses.text,
      secondary: variantClasses.text,
      success: 'text-emerald-600 dark:text-emerald-400',
      error: 'text-red-600 dark:text-red-400',
      warning: 'text-amber-600 dark:text-amber-400',
      info: 'text-cyan-600 dark:text-cyan-400',
      ghost: variantClasses.text,
    };

    return {
      base: baseClasses,
      variant: variantStyles[variant],
      full: variantClasses,
    };
  },

  /**
   * Create a complete card styling object
   */
  createCardClasses: (props: {
    mode?: 'dark' | 'light' | 'auto';
    padding?: 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  }) => {
    const {
      mode = 'auto',
      padding = 'md',
      shadow = 'sm',
      borderRadius = 'lg'
    } = props;

    const variantClasses = componentHelpers.getVariantClasses(mode);
    const borderRadiusClasses = componentHelpers.getBorderRadiusClasses(borderRadius);
    const shadowClasses = componentHelpers.getShadowClasses(shadow);
    const paddingClasses = componentHelpers.getPaddingClasses(padding);

    return [
      variantClasses,
      borderRadiusClasses,
      shadowClasses,
      paddingClasses,
    ].filter(Boolean).join(' ');
  },

  /**
   * Create a complete input styling object
   */
  createInputClasses: (props: {
    size?: ComponentSize;
    mode?: 'dark' | 'light' | 'auto';
    disabled?: boolean;
    error?: boolean;
  }) => {
    const {
      size = 'md',
      mode = 'auto',
      disabled = false,
      error = false
    } = props;

    const sizeClasses = getSizeClasses(size);
    const variantClasses = componentHelpers.getVariantClasses(mode);
    const opacityClass = disabled ? getOpacityClass('disabled') : getOpacityClass('100');

    const baseClasses = [
      'block w-full rounded-md border',
      'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      sizeClasses.size,
      variantClasses.border,
      variantClasses.background,
      opacityClass,
    ].filter(Boolean).join(' ');

    const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
    const textClasses = variantClasses.text;

    return {
      base: baseClasses,
      error: errorClasses,
      text: textClasses,
    };
  },

  /**
   * Create a complete icon styling object
   */
  createIconClasses: (props: {
    size?: ComponentSize;
    mode?: 'dark' | 'light' | 'auto';
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  }) => {
    const {
      size = 'md',
      mode = 'auto',
      variant = 'primary'
    } = props;

    const sizeClasses = getSizeClasses(size);
    const variantClasses = componentHelpers.getVariantClasses(mode, 'icon');

    const variantColors = {
      primary: variantClasses.text,
      secondary: mode === 'dark' ? 'text-gray-400' : 'text-gray-600',
      success: 'text-emerald-400',
      error: 'text-red-400',
      warning: 'text-amber-400',
      info: 'text-cyan-400',
    };

    return [
      sizeClasses.size,
      variantColors[variant],
      variantClasses,
    ].filter(Boolean).join(' ');
  },
};

/**
 * Convenience hooks for token usage in React components
 */
export const useTokenHelpers = () => {
  return {
    getVariantClasses: componentHelpers.getVariantClasses,
    getTypographyClasses: componentHelpers.getTypographyClasses,
    getTypographyClassesBySize: componentHelpers.getTypographyClassesBySize,
    getSpacingClasses: componentHelpers.getSpacingClasses,
    getPaddingClasses: componentHelpers.getPaddingClasses,
    getSizeClasses: componentHelpers.getSizeClasses,
    getBorderRadiusClasses: componentHelpers.getBorderRadiusClasses,
    getShadowClasses: componentHelpers.getShadowClasses,
    getOpacityClass: componentHelpers.getOpacityClass,
    getTransitionClasses: componentHelpers.getTransitionClasses,
    getZIndexClass: componentHelpers.getZIndexClass,
    getComponentVariantTokens: componentHelpers.getComponentVariantTokens,
    createButtonClasses: componentHelpers.createButtonClasses,
    createCardClasses: componentHelpers.createCardClasses,
    createInputClasses: componentHelpers.createInputClasses,
    createIconClasses: componentHelpers.createIconClasses,
  };
};

/**
 * Pre-configured token presets for common use cases
 */
export const tokenPresets = {
  // Common spacing presets
  spacing: {
    tight: getSpacingClasses('compact'),
    normal: getSpacingClasses('normal'),
    relaxed: getSpacingClasses('relaxed'),
    loose: getSpacingClasses('xl'),
  },

  // Common typography presets
  typography: {
    heading: componentHelpers.getTypographyClasses('heading-3'),
    body: componentHelpers.getTypographyClasses('body'),
    label: componentHelpers.getTypographyClasses('label'),
    caption: componentHelpers.getTypographyClasses('caption'),
    code: componentHelpers.getTypographyClasses('code'),
  },

  // Common animation presets
  animations: {
    fastColorTransition: componentHelpers.getTransitionClasses('fast', 'custom', 'colors'),
    normalColorTransition: componentHelpers.getTransitionClasses('normal', 'custom', 'colors'),
    slowColorTransition: componentHelpers.getTransitionClasses('slow', 'custom', 'colors'),
    fastOpacityTransition: componentHelpers.getTransitionClasses('fast', 'custom', 'opacity'),
    normalOpacityTransition: componentHelpers.getTransitionClasses('normal', 'custom', 'opacity'),
    slowOpacityTransition: componentHelpers.getTransitionClasses('slow', 'custom', 'opacity'),
  },

  // Common shadow presets
  shadows: {
    none: componentHelpers.getShadowClasses('none'),
    sm: componentHelpers.getShadowClasses('sm'),
    md: componentHelpers.getShadowClasses('md'),
    lg: componentHelpers.getShadowClasses('lg'),
    xl: componentHelpers.getShadowClasses('xl'),
  },

  // Common border radius presets
  borders: {
    none: componentHelpers.getBorderRadiusClasses('none'),
    sm: componentHelpers.getBorderRadiusClasses('sm'),
    md: componentHelpers.getBorderRadiusClasses('md'),
    lg: componentHelpers.getBorderRadiusClasses('lg'),
    xl: componentHelpers.getBorderRadiusClasses('xl'),
    full: componentHelpers.getBorderRadiusClasses('full'),
  },

  // Common z-index presets
  zIndex: {
    base: componentHelpers.getZIndexClass('base'),
    dropdown: componentHelpers.getZIndexClass('dropdown'),
    sticky: componentHelpers.getZIndexClass('sticky'),
    fixed: componentHelpers.getZIndexClass('fixed'),
    modalBackdrop: componentHelpers.getZIndexClass('modal-backdrop'),
    modal: componentHelpers.getZIndexClass('modal'),
  },
};

export default componentHelpers;