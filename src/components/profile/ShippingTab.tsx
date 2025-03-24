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

// Complete list of countries for the dropdown
const countryOptions = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AQ', label: 'Antarctica' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AW', label: 'Aruba' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BM', label: 'Bermuda' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BV', label: 'Bouvet Island' },
  { value: 'BR', label: 'Brazil' },
  { value: 'IO', label: 'British Indian Ocean Territory' },
  { value: 'BN', label: 'Brunei Darussalam' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'CV', label: 'Cape Verde' },
  { value: 'KY', label: 'Cayman Islands' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CX', label: 'Christmas Island' },
  { value: 'CC', label: 'Cocos (Keeling) Islands' },
  { value: 'CO', label: 'Colombia' },
  { value: 'KM', label: 'Comoros' },
  { value: 'CG', label: 'Congo' },
  { value: 'CD', label: 'Congo, Democratic Republic of the' },
  { value: 'CK', label: 'Cook Islands' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'CI', label: 'Cote D\'ivoire' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FK', label: 'Falkland Islands (Malvinas)' },
  { value: 'FO', label: 'Faroe Islands' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GF', label: 'French Guiana' },
  { value: 'PF', label: 'French Polynesia' },
  { value: 'TF', label: 'French Southern Territories' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GI', label: 'Gibraltar' },
  { value: 'GR', label: 'Greece' },
  { value: 'GL', label: 'Greenland' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GP', label: 'Guadeloupe' },
  { value: 'GU', label: 'Guam' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GW', label: 'Guinea-Bissau' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HM', label: 'Heard Island and Mcdonald Islands' },
  { value: 'VA', label: 'Holy See (Vatican City State)' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KI', label: 'Kiribati' },
  { value: 'KP', label: 'Korea, Democratic People\'s Republic of' },
  { value: 'KR', label: 'Korea, Republic of' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: 'Lao People\'s Democratic Republic' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libyan Arab Jamahiriya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MO', label: 'Macao' },
  { value: 'MK', label: 'Macedonia' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MQ', label: 'Martinique' },
  { value: 'MR', label: 'Mauritania' },
  { value: 'MU', label: 'Mauritius' },
  { value: 'YT', label: 'Mayotte' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FM', label: 'Micronesia, Federated States of' },
  { value: 'MD', label: 'Moldova, Republic of' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'MS', label: 'Montserrat' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NR', label: 'Nauru' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'AN', label: 'Netherlands Antilles' },
  { value: 'NC', label: 'New Caledonia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NU', label: 'Niue' },
  { value: 'NF', label: 'Norfolk Island' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PS', label: 'Palestinian Territory, Occupied' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PN', label: 'Pitcairn' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RE', label: 'Reunion' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russian Federation' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'SH', label: 'Saint Helena' },
  { value: 'KN', label: 'Saint Kitts and Nevis' },
  { value: 'LC', label: 'Saint Lucia' },
  { value: 'PM', label: 'Saint Pierre and Miquelon' },
  { value: 'VC', label: 'Saint Vincent and the Grenadines' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'Sao Tome and Principe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'CS', label: 'Serbia and Montenegro' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SJ', label: 'Svalbard and Jan Mayen' },
  { value: 'SZ', label: 'Swaziland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syrian Arab Republic' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania, United Republic of' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TK', label: 'Tokelau' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TC', label: 'Turks and Caicos Islands' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'UM', label: 'United States Minor Outlying Islands' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'VG', label: 'Virgin Islands, British' },
  { value: 'VI', label: 'Virgin Islands, U.S.' },
  { value: 'WF', label: 'Wallis and Futuna' },
  { value: 'EH', label: 'Western Sahara' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' }
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

  // Custom styles for react-select to match other inputs
  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: '40px',
      minHeight: '40px',
      borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--input))',
      boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring))' : 'none',
      backgroundColor: 'hsl(var(--background))',
      borderRadius: 'var(--radius)',
      '&:hover': {
        borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--input))'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      borderRadius: 'var(--radius)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 9999
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'hsl(var(--accent))' : state.isFocused ? 'hsl(var(--accent))' : 'transparent',
      color: state.isSelected ? 'hsl(var(--accent-foreground))' : 'hsl(var(--foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))'
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))'
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Shipping Details</CardTitle>
          <CardDescription>Your shipping information for orders</CardDescription>
        </div>
        {!editingShipping && (
          <Button variant="outline" size="sm" onClick={() => setEditingShipping(true)} className="self-start">
            <Pencil className="h-4 w-4 mr-2" />
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
                <PhoneInput
                  country={'us'}
                  value={shippingDetails.phone}
                  onChange={handlePhoneChange}
                  inputClass="!w-full !h-10 !py-2 !text-base md:!text-sm !rounded-md !border !border-input !bg-background"
                  buttonClass="!border !border-input !rounded-md !bg-background"
                  containerClass="!w-full"
                  dropdownClass="!bg-background !min-w-fit"
                  buttonStyle={{ 
                    width: '58px', 
                    background: 'hsl(var(--background))', 
                    borderTopRightRadius: 0, 
                    borderBottomRightRadius: 0 
                  }}
                  inputStyle={{ 
                    paddingLeft: '65px',
                    width: '100%', 
                    background: 'hsl(var(--background))', 
                    borderTopLeftRadius: 0, 
                    borderBottomLeftRadius: 0 
                  }}
                  dropdownStyle={{ 
                    background: 'hsl(var(--background))', 
                    color: 'hsl(var(--foreground))', 
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: 9999
                  }}
                  searchClass="!bg-background !text-foreground !border-input"
                  searchStyle={{ 
                    background: 'hsl(var(--background))', 
                    color: 'hsl(var(--foreground))', 
                    borderColor: 'hsl(var(--input))'
                  }}
                  enableSearch={false}
                  containerStyle={{
                    width: '100%'
                  }}
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
                  styles={customSelectStyles}
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
      <CardFooter>
        {/* Edit button moved to CardHeader */}
      </CardFooter>
    </Card>
  );
};

export default ShippingTab;
