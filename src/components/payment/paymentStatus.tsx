import React from 'react';
import { CheckCircle, XCircle, Clock, Bike } from 'lucide-react';

interface PaymentStatusProps {
  status: string;
}

function PaymentStatus({ status }: PaymentStatusProps) {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return {
          icon: CheckCircle,
          title: 'Payment Successful!',
          message: 'Your bike rental has been confirmed. Get ready to ride!',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-500',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700',
          actionText: 'View Rental Details'
        };
      case 'failed':
        return {
          icon: XCircle,
          title: 'Payment Failed',
          message: 'We couldn\'t process your payment. Please try again or use a different payment method.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-500',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700',
          actionText: 'Try Again'
        };
      case 'pending':
        return {
          icon: Clock,
          title: 'Payment Processing',
          message: 'Your payment is being processed. We\'ll confirm your bike rental shortly.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-500',
          titleColor: 'text-yellow-800',
          messageColor: 'text-yellow-700',
          actionText: 'Check Status'
        };
      default:
        return {
          icon: Clock,
          title: 'Processing Payment',
          message: 'Please wait while we process your bike rental payment.',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-500',
          titleColor: 'text-gray-800',
          messageColor: 'text-gray-700',
          actionText: 'Please Wait'
        };
    }
  };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <div className="max-w-md mx-auto p-6">
      <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-6 text-center`}>
        {/* Status Icon */}
        <div className="flex justify-center mb-4">
          <StatusIcon className={`${config.iconColor} w-16 h-16`} />
        </div>

        {/* Title */}
        <h2 className={`${config.titleColor} text-2xl font-bold mb-3`}>
          {config.title}
        </h2>

        {/* Message */}
        <p className={`${config.messageColor} text-base mb-6 leading-relaxed`}>
          {config.message}
        </p>

        {/* Bike Icon Divider */}
        <div className="flex justify-center items-center mb-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <Bike className="mx-4 text-blue-500 w-6 h-6" />
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Action Button */}
        <button 
          className={`
            w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200
            ${status?.toLowerCase() === 'success' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : status?.toLowerCase() === 'failed'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
          onClick={() => {
            // Add your navigation logic here
            console.log(`${config.actionText} clicked for status: ${status}`);
          }}
        >
          {config.actionText}
        </button>

        {/* Additional Info for Success */}
        {status?.toLowerCase() === 'success' && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-center justify-between text-sm text-green-700">
              <span>Rental Duration:</span>
              <span className="font-semibold">2 hours</span>
            </div>
            <div className="flex items-center justify-between text-sm text-green-700 mt-1">
              <span>Pickup Location:</span>
              <span className="font-semibold">Downtown Station</span>
            </div>
          </div>
        )}

        {/* Support Link */}
        <div className="mt-4">
          <button className="text-sm text-blue-600 hover:text-blue-800 underline">
            Need help? Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;