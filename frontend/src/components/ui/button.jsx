export const Button = ({ children, onClick, disabled = false, size = 'default', variant = 'default', className = '' }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  const variantClasses = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    destructive: 'bg-red-600 hover:bg-red-700 text-white border border-red-600'
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  );
};
