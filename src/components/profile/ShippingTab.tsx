
import React from 'react';
import { Edit, Pencil } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';

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

// Country options for the dropdown
const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'JP', label: 'Japan' },
  { value: 'CN', label: 'China' },
  { value: 'IN', label: 'India' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  // Add more countries as needed
];

const ShippingTab: React.FC<ShippingTabProps> = ({
  shippingDetails,
  editingShipping,
  setEditingShipping,
  handleShippingUpdate,
  handleInputChange
}) => {
  const handleCountryChange = (selectedOption: any) => {
    const event = {
      target: {
        name: 'country',
        value: selectedOption.label
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  const handlePhoneChange = (value: string) => {
    const event = {
      target: {
        name: 'phone',
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  const selectedCountry = countryOptions.find(option => option.label === shippingDetails.country) || null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Shipping Details</CardTitle>
          <CardDescription>Your shipping information for orders</CardDescription>
        </div>
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
                <PhoneInput
                  country={'us'}
                  value={shippingDetails.phone}
                  onChange={handlePhoneChange}
                  inputClass="!w-full !h-10 !py-2 !px-3 !text-base md:!text-sm !rounded-md !border !border-input"
                  buttonClass="!border !border-input !rounded-md"
                  containerClass="!w-full"
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
                <Select
                  id="country"
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Select country"
                  className="react-select-container"
                  classNamePrefix="react-select"
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
      <CardFooter className="flex justify-end">
        {!editingShipping && (
          <Button variant="outline" size="sm" onClick={() => setEditingShipping(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Shipping Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShippingTab;
