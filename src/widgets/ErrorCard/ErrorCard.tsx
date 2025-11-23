
import Card from '../../components/Card/Card';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import { getAdaptiveVariantClassesString } from '../../tokens/color';

export interface ErrorCardProps {
  mode?: 'dark' | 'light' | 'auto';
  onGoHome?: () => void;
  title?: string;
  description?: string;
  homeButtonText?: string;
  className?: string;
}

const ErrorCard = ({
  mode = 'auto',
  onGoHome,
  title = 'Page not found',
  description = "The page you're looking for doesn't exist.",
  homeButtonText = 'Back to Home',
  className = '',
}: ErrorCardProps) => {
  // Determine if we should use adaptive mode
  const isAdaptive = mode === 'auto';
  const effectiveVariant = mode === 'auto' ? undefined : mode;
  const defaultGoHome = () => {
    window.location.href = '/';
  };

  const handleGoHome = onGoHome || defaultGoHome;

  return (
    <div className={`
      min-h-screen flex items-center justify-center ${isAdaptive ? 'bg-white dark:bg-gray-950' : (effectiveVariant === 'dark' ? 'bg-gray-950' : 'bg-white')}
      ${className}
    `}>
      <Card
        mode={effectiveVariant}
        padding="lg"
        shadow="lg"
        className="max-w-md w-full mx-4"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {/* 404 Display */}
          <span className={`text-8xl font-bold ${isAdaptive ? getAdaptiveVariantClassesString('card') : (effectiveVariant === 'dark' ? 'text-white' : 'text-black')}`}>
            404
          </span>

          {/* Title */}
          <Text
            variant="heading-3"
            className={isAdaptive ? getAdaptiveVariantClassesString('card') : (effectiveVariant === 'dark' ? 'text-gray-100' : 'text-gray-900')}
            align="center"
          >
            {title}
          </Text>

          {/* Description */}
          <Text
            variant="body"
            className={isAdaptive ? 'text-gray-600 dark:text-gray-400' : (effectiveVariant === 'dark' ? 'text-gray-400' : 'text-gray-600')}
            align="center"
          >
            {description}
          </Text>

          {/* Action Button */}
          <Button
            onClick={handleGoHome}
            mode={effectiveVariant}
            size="sm"
          >
            {homeButtonText}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ErrorCard;