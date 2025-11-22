
import Card from '../../components/Card/Card';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';

export interface ErrorPageProps {
  variant?: 'dark' | 'light';
  onGoHome?: () => void;
  title?: string;
  description?: string;
  homeButtonText?: string;
  className?: string;
}

const ErrorPage = ({
  variant = 'light',
  onGoHome,
  title = 'Page not found',
  description = "The page you're looking for doesn't exist.",
  homeButtonText = 'Back to Home',
  className = '',
}: NotFoundPageProps) => {
  const defaultGoHome = () => {
    window.location.href = '/';
  };

  const handleGoHome = onGoHome || defaultGoHome;

  return (
    <div className={`
      min-h-screen flex items-center justify-center ${variant === 'dark' ? 'bg-gray-950' : 'bg-white'}
      ${className}
    `}>
      <Card
        variant={variant}
        padding="lg"
        shadow="lg"
        className="max-w-md w-full mx-4"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {/* 404 Display */}
          <span className={`text-8xl font-bold ${variant === 'dark' ? 'text-white' : 'text-black'}`}>
            404
          </span>

          {/* Title */}
          <Text
            variant="heading-3"
            className={variant === 'dark' ? 'text-gray-100' : 'text-gray-900'}
            align="center"
          >
            {title}
          </Text>

          {/* Description */}
          <Text
            variant="body"
            className={variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            align="center"
          >
            {description}
          </Text>

          {/* Action Button */}
          <Button
            onClick={handleGoHome}
            variant={variant}
            size="sm"
          >
            {homeButtonText}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ErrorPage;