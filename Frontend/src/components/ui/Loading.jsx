const Loading = ({
  message = "Loading...",
  fullScreen = true,
  size = "md",
  variant = "spinner",
}) => {
  // Size classes
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  // Spinner variant - FIXED: Added curly braces {}
  const SpinnerVariant = () => (
    <div
      className={`animate-spin rounded-full border-b-2 border-gray-900 ${sizeClasses[size]}`}
    ></div>
  );

  // Dots variant
  const DotsVariant = () => (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-gray-900 rounded-full animate-bounce"></div>
      <div
        className="w-3 h-3 bg-gray-900 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-gray-900 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  );

  // Pulse variant - FIXED: Added curly braces {}
  const PulseVariant = () => (
    <div
      className={`bg-gray-900 rounded-full animate-pulse ${sizeClasses[size]}`}
    ></div>
  );

  // Bars variant
  const BarsVariant = () => (
    <div className="flex space-x-1 items-end">
      <div
        className="w-2 h-8 bg-gray-900 animate-pulse"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-2 h-12 bg-gray-900 animate-pulse"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-2 h-8 bg-gray-900 animate-pulse"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-12 bg-gray-900 animate-pulse"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="w-2 h-8 bg-gray-900 animate-pulse"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );

  const variants = {
    spinner: <SpinnerVariant />,
    dots: <DotsVariant />,
    pulse: <PulseVariant />,
    bars: <BarsVariant />,
  };

  const content = (
    <div className="text-center">
      <div className="flex justify-center mb-4">{variants[variant]}</div>
      {message && <p className="text-gray-600 font-medium">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
};

export default Loading;
