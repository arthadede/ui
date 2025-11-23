"use client";

import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPin } from '../../widgets/InputPin';
import Card from '../../components/Card';
import Divider from '../../components/Divider';
import InlineError from '../../components/InlineError';
import { Icon } from '../../components/Icon';
import { Text } from '../../components/Text';
import { getAdaptiveVariantClassesString } from '../../tokens/color';

export type LoginCardStep = 'email' | 'pin';

export interface LoginCardProps {
  /**
   * Current step in the authentication flow
   */
  step?: LoginCardStep;
  /**
   * Whether the form is in loading state
   */
  loading?: boolean;
  /**
   * Error message to display
   */
  error?: string | null;
  /**
   * Email value for controlled mode
   */
  emailValue?: string;
  /**
   * PIN value for controlled mode
   */
  pinValue?: string;
  /**
   * Theme mode - defaults to automatic light/dark mode detection
   */
  mode?: 'light' | 'dark' | 'auto';
  /**
   * Callback when email form is submitted
   */
  onEmailSubmit?: (email: string) => void;
  /**
   * Callback when PIN form is submitted
   */
  onPinSubmit?: (pin: string) => void;
  /**
   * Callback when Google sign-in is clicked
   */
  onGoogleSignIn?: () => void;
  /**
   * Callback when back button is clicked
   */
  onBack?: () => void;
  /**
   * Callback when email changes
   */
  onEmailChange?: (email: string) => void;
}

const LoginCard = ({
  step = 'email',
  loading = false,
  error = null,
  emailValue = '',
  mode = 'auto',
  onEmailSubmit,
  onPinSubmit,
  onGoogleSignIn,
  onBack,
  onEmailChange,
}: LoginCardProps) => {
  const [email, setEmail] = useState(emailValue);

  // Determine if we should use adaptive mode
  const isAdaptive = mode === 'auto';
  const effectiveVariant = mode === 'auto' ? undefined : mode;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    onEmailChange?.(value);
  };

  const handlePinChange = (values: string[]) => {
    const value = values.join('');

    // Auto-submit when PIN is complete
    if (value.length === 6 && onPinSubmit) {
      onPinSubmit(value);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onEmailSubmit) {
      onEmailSubmit(email);
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card mode={effectiveVariant} padding="lg" className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col items-center gap-7">
            <Icon
              name="logo"
              size={160}
              mode={isAdaptive ? 'auto' : (effectiveVariant === 'dark' ? 'light' : 'dark')}
            />
            <div className="flex flex-col items-center gap-2">
              <Text
                variant="heading-3"
                className={isAdaptive ? getAdaptiveVariantClassesString('card') : (effectiveVariant === 'dark' ? 'text-white' : 'text-gray-900')}
              >
                {step === 'email' ? 'Sign in' : 'Enter PIN'}
              </Text>
              <Text
                variant="body"
                className={isAdaptive ? 'text-gray-600 dark:text-gray-400' : (effectiveVariant === 'dark' ? 'text-gray-400' : 'text-gray-600')}
              >
                {step === 'email'
                  ? 'Enter your email to sign in to your account'
                  : `Enter the 6-digit code sent to ${email}`}
              </Text>
            </div>
          </div>

          {/* Email Form */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="w-full">
              <div className="flex flex-col gap-7">
                <div className="w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    size="lg"
                    onChange={handleEmailChange}
                    mode={effectiveVariant}
                    disabled={loading}
                    leftIcon="email"
                  />
                  {error && (
                    <InlineError mode={effectiveVariant} className="mt-2">
                      {error}
                    </InlineError>
                  )}
                </div>

                <Button
                  type="submit"
                  mode={effectiveVariant}
                  size="lg"
                  disabled={!email || !isEmailValid || loading}
                  leftIcon={loading ? 'spinner' : undefined}
                >
                  {loading ? 'Sending...' : 'Continue'}
                </Button>
              </div>
            </form>
          )}

          {/* PIN Form */}
          {step === 'pin' && (
            <div className="flex flex-col gap-7 w-full">
              <div className="w-full">
                <div className="flex justify-center">
                  <InputPin
                    length={6}
                    size="lg"
                    onChange={handlePinChange}
                    disabled={loading}
                    variant={effectiveVariant}
                  />
                </div>
                {error && (
                  <InlineError mode={effectiveVariant} className="mt-4 text-center">
                    {error}
                  </InlineError>
                )}
              </div>
            </div>
          )}

          {/* OR Divider */}
          <Divider text="OR" mode={effectiveVariant} className="w-full" />

          {/* Google Sign In */}
          <Button
            mode={effectiveVariant}
            size="lg"
            disabled={loading}
            leftIcon="google"
            onClick={onGoogleSignIn}
          >
            Continue with Google
          </Button>

          {/* Back Button (only on PIN step) */}
          {step === 'pin' && (
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className={`
                hover:opacity-70 disabled:opacity-50 cursor-pointer
                ${isAdaptive ? 'text-gray-600 dark:text-gray-400' : (effectiveVariant === 'dark' ? 'text-gray-400' : 'text-gray-600')}
              `}
            >
              <Text variant="label" decoration="none">
                ← Back
              </Text>
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LoginCard;