"use client";

import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPin } from '../../widgets/InputPin';
import Card from '../../components/Card';
import Divider from '../../components/Divider';
import InlineError from '../../components/InlineError';
import { Icon } from '../../components/Icon';

export type LoginPageStep = 'email' | 'pin';

export interface LoginPageProps {
  /**
   * Current step in the authentication flow
   */
  step?: LoginPageStep;
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
   * Theme variant
   */
  variant?: 'light' | 'dark';
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

const LoginPage = ({
  step = 'email',
  loading = false,
  error = null,
  emailValue = '',
  variant = 'light',
  onEmailSubmit,
  onPinSubmit,
  onGoogleSignIn,
  onBack,
  onEmailChange,
}: LoginPageProps) => {
  const [email, setEmail] = useState(emailValue);

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
      <Card variant={variant} padding="lg" className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col items-center gap-7">
            <Icon
              name="logo"
              size={160}
              variant={variant === 'dark' ? 'light' : 'dark'}
            />
            <div className="flex flex-col items-center gap-2">
              <h1
                className={`text-2xl font-bold ${
                  variant === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {step === 'email' ? 'Sign in' : 'Enter PIN'}
              </h1>
              <p
                className={`text-sm ${
                  variant === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {step === 'email'
                  ? 'Enter your email to sign in to your account'
                  : `Enter the 6-digit code sent to ${email}`}
              </p>
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
                    variant={variant}
                    disabled={loading}
                    leftIcon="email"
                  />
                  {error && (
                    <InlineError variant={variant} className="mt-2">
                      {error}
                    </InlineError>
                  )}
                </div>

                <Button
                  type="submit"
                  variant={variant}
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
                    variant={variant}
                  />
                </div>
                {error && (
                  <InlineError variant={variant} className="mt-4 text-center">
                    {error}
                  </InlineError>
                )}
              </div>
            </div>
          )}

          {/* OR Divider */}
          <Divider text="OR" variant={variant} className="w-full" />

          {/* Google Sign In */}
          <Button
            variant={variant}
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
                text-sm font-medium hover:opacity-70 disabled:opacity-50
                ${variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              `}
            >
              ← Back
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;