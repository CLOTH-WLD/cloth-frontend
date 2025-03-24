
import React from 'react';
import { Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface ShippingTabProps {
  shippingDetails: ShippingDetails;
  editingShipping: boolean;
  setEditingShipping: (value: boolean) => void;
  handleShippingUpdate: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingTab: React.FC<ShippingTabProps> = ({
  shippingDetails,
  editingShipping,
  setEditingShipping,
  handleShippingUpdate,
  handleInputChange
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Shipping Details</CardTitle>
          <CardDescription>Your shipping information for orders</CardDescription>
        </div>
        {!editingShipping && (
          <Button variant="ghost" size="sm" onClick={() => setEditingShipping(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {editingShipping ? (
          <form onSubmit={handleShippingUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={shippingDetails.fullName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={shippingDetails.phone} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={shippingDetails.address} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={shippingDetails.city} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input 
                  id="state" 
                  name="state" 
                  value={shippingDetails.state} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input 
                  id="zipCode" 
                  name="zipCode" 
                  value={shippingDetails.zipCode} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  name="country" 
                  value={shippingDetails.country} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setEditingShipping(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p>{shippingDetails.fullName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p>{shippingDetails.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p>{shippingDetails.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">City</h3>
              <p>{shippingDetails.city}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">State/Province</h3>
              <p>{shippingDetails.state}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ZIP/Postal Code</h3>
              <p>{shippingDetails.zipCode}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Country</h3>
              <p>{shippingDetails.country}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingTab;
