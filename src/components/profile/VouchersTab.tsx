
import React from 'react';
import { Ticket, Copy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

export interface Voucher {
  id: string;
  code: string;
  discount: string;
  expiry: string;
  isActive: boolean;
}

interface VouchersTabProps {
  vouchers: Voucher[];
}

const VouchersTab: React.FC<VouchersTabProps> = ({ vouchers }) => {
  
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Voucher code copied to clipboard!");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Vouchers</CardTitle>
        <CardDescription>Available discount vouchers for your orders</CardDescription>
      </CardHeader>
      <CardContent>
        {vouchers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {vouchers.map((voucher) => (
              <div 
                key={voucher.id} 
                className={`rounded-lg border p-4 ${voucher.isActive ? 'bg-white' : 'bg-gray-100'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{voucher.discount} Discount</h3>
                    <p className="text-sm text-gray-500">Expires: {voucher.expiry}</p>
                  </div>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      voucher.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {voucher.isActive ? 'Active' : 'Expired'}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 bg-gray-50 rounded p-2">
                  <code className="font-mono text-sm">{voucher.code}</code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(voucher.code)}
                    disabled={!voucher.isActive}
                    title={voucher.isActive ? "Copy code" : "Voucher expired"}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Ticket className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No vouchers yet</h3>
            <p className="mt-1 text-sm text-gray-500">You don't have any vouchers available at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VouchersTab;
