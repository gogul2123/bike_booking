'use client';

import { CreditCard, IndianRupee } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const PaymentHistory = () => {
  const paymentHistory = [
    { id: 'PAY001', date: '2025-07-18', amount: 150, method: 'UPI', status: 'Completed', bookingId: 'BK123' },
    { id: 'PAY002', date: '2025-07-15', amount: 200, method: 'Credit Card', status: 'Completed', bookingId: 'BK122' },
    { id: 'PAY003', date: '2025-07-10', amount: 100, method: 'UPI', status: 'Completed', bookingId: 'BK121' },
    { id: 'PAY004', date: '2025-07-05', amount: 300, method: 'Debit Card', status: 'Completed', bookingId: 'BK120' },
    { id: 'PAY005', date: '2025-06-28', amount: 180, method: 'UPI', status: 'Completed', bookingId: 'BK119' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment History
          </CardTitle>
          <CardDescription>All your payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">Payment #{payment.id}</p>
                    <Badge variant={payment.status === 'Completed' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
                    <p>Method: {payment.method}</p>
                    <p>Booking: {payment.bookingId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {payment.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;
