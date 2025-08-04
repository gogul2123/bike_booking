
'use client';

import { CreditCard, IndianRupee, Calendar, FileText, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const PaymentHistory = () => {
  const paymentHistory = [
    { id: 'PAY001', date: '2025-07-18', amount: 150, method: 'UPI', status: 'Completed', bookingId: 'BK123' },
    { id: 'PAY002', date: '2025-07-15', amount: 200, method: 'Credit Card', status: 'Completed', bookingId: 'BK122' },
    { id: 'PAY003', date: '2025-07-10', amount: 100, method: 'UPI', status: 'Completed', bookingId: 'BK121' },
    { id: 'PAY004', date: '2025-07-05', amount: 300, method: 'Debit Card', status: 'Completed', bookingId: 'BK120' },
    { id: 'PAY005', date: '2025-06-28', amount: 180, method: 'UPI', status: 'Pending', bookingId: 'BK119' },
  ];



  const getStatusConfig = (status: string) => {
    if (status === 'Completed') {
      return {
        className: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle className="w-3 h-3" />
      };
    }
    return {
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <Clock className="w-3 h-3" />
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">

      {/* Header Section */}
       <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            Payment History
          </h1>
          <p className="text-gray-600 mt-1">All your payment transactions and billing details</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Total Transactions</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-900">{paymentHistory.length}</p>
              <p className="text-xs text-blue-600 mt-1">All time payments</p>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-700" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Total Amount Paid</p>
              <div className="flex items-center gap-1 mb-1">
                <IndianRupee className="w-5 h-5 text-green-700" />
                <p className="text-2xl sm:text-3xl font-bold text-green-900">
                  {paymentHistory.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-green-600">Lifetime spending</p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Cards */}
      <div className="space-y-4">
        {paymentHistory.map((payment) => {
          const statusConfig = getStatusConfig(payment.status);
          
          return (
            <Card 
              key={payment.id} 
              className={`transition-all duration-200 hover:shadow-lg border-0 shadow-md ${
                payment.status === 'Completed' 
                  ? 'bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-green-100' 
                  : 'bg-gradient-to-r from-white to-yellow-50 hover:from-yellow-50 hover:to-yellow-100'
              }`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Left Section - Payment Info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#D4B76A] rounded-lg flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                          Payment #{payment.id}
                        </h3>
                        <Badge className={`${statusConfig.className} w-fit`}>
                          {statusConfig.icon}
                          <span className="ml-1">{payment.status}</span>
                        </Badge>
                      </div>
                      
                      {/* Payment Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Date</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(payment.date)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Method</p>
                            <p className="text-sm font-medium text-gray-900">{payment.method}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Booking</p>
                            <p className="text-sm font-medium text-gray-900">{payment.bookingId}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Section - Amount */}
                  <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:pl-6">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 flex-shrink-0" />
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        {payment.amount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      Transaction Amount
                    </p>
                  </div>
                </div>
                
                {/* Success Indicator for Completed Payments */}
                {payment.status === 'Completed' && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Payment processed successfully</span>
                    </div>
                  </div>
                )}
                
                {/* Pending Indicator */}
                {payment.status === 'Pending' && (
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Payment is being processed</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentHistory;