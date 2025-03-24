
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PreferencesTabProps {
  userPreference: string;
  setUserPreference: (value: string) => void;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({ userPreference, setUserPreference }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePreferenceChange = (value: string) => {
    setUserPreference(value);
    localStorage.setItem('userPreference', value);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('userPreference', userPreference);
    
    toast({
      title: "Preferences saved",
      description: "Your shopping preference has been updated",
    });
    
    // Navigate to the appropriate landing page
    switch(userPreference) {
      case 'women':
        navigate('/women');
        break;
      case 'men':
        navigate('/men');
        break;
      case 'kids':
        navigate('/kids');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Preferences</CardTitle>
        <CardDescription>Choose your preferred shopping category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <RadioGroup 
            value={userPreference} 
            onValueChange={handlePreferenceChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="women" id="women" />
              <Label htmlFor="women">Women's Fashion</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="men" id="men" />
              <Label htmlFor="men">Men's Fashion</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kids" id="kids" />
              <Label htmlFor="kids">Kids' Fashion</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="general" id="general" />
              <Label htmlFor="general">No Preference</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button onClick={handleSavePreferences} className="w-full">
          Save Preferences
        </Button>
        
        <div className="text-sm text-gray-500">
          <p>This will determine which landing page you see when you visit our site.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
