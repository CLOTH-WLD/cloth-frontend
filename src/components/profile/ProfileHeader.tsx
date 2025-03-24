
import React from 'react';
import { User, Wallet, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Function to truncate wallet address
const truncateWalletAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
};

interface ProfileHeaderProps {
  username: string;
  walletAddress: string;
  email: string;
  editingEmail: boolean;
  setEditingEmail: (value: boolean) => void;
  setEmail: (value: string) => void;
  handleEmailUpdate: (e: React.FormEvent) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  walletAddress,
  email,
  editingEmail,
  setEditingEmail,
  setEmail,
  handleEmailUpdate
}) => {
  return (
    <Card className="w-full lg:w-1/3 mb-4 lg:mb-0">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="" alt={username} />
          <AvatarFallback className="bg-cloth-charcoal text-white text-xl">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{username}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-gray-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Wallet Address</p>
              <p className="text-sm text-gray-500 truncate">{truncateWalletAddress(walletAddress)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Email</p>
                {!editingEmail && (
                  <p className="text-sm text-gray-500">{email || 'Not set'}</p>
                )}
              </div>
              {!editingEmail && (
                <Button variant="ghost" size="sm" onClick={() => setEditingEmail(true)} className="h-7 px-2">
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            
            {editingEmail && (
              <form onSubmit={handleEmailUpdate} className="space-y-2">
                <Input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-sm"
                  required
                  type="email"
                />
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" size="sm" onClick={() => setEditingEmail(false)}>Cancel</Button>
                  <Button type="submit" size="sm">Save</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
