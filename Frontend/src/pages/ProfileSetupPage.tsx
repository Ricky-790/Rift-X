import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, UserRound } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import PageLayout from '@/components/layout/PageLayout';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    username: '',
    displayName: '',
    email: '',
    bio: '',
    country: '',
    twitchUsername: '',
    discordUsername: '',
    twitterUsername: '',
    profilePicture: '',
  });

  // Profile picture options
  const profilePictureOptions = [
    { url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", alt: "Gaming setup" },
    { url: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1", alt: "Gaming character" },
    { url: "https://images.unsplash.com/photo-1501286353178-1ec881214838", alt: "Gaming character 2" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureSelect = (url: string) => {
    setProfileData(prev => ({ ...prev, profilePicture: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!profileData.username || !profileData.email) {
      toast({
        title: "Missing Information",
        description: "Username and email are required fields.",
        variant: "destructive",
      });
      return;
    }

    // Save profile and navigate to games setup
    toast({
      title: "Profile Saved",
      description: "Your profile has been saved. Now let's set up your games.",
    });

    // Navigate to game setup
    navigate('/profile/setup-games');
  };

  const handleReset = () => {
    setProfileData({
      username: '',
      displayName: '',
      email: '',
      bio: '',
      country: '',
      twitchUsername: '',
      discordUsername: '',
      twitterUsername: '',
      profilePicture: '',
    });
  };

  return (
    <PageLayout>
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Set Up Your Profile</h1>
            
            <div className="bg-riftx-olive/20 rounded-lg p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Profile Picture Section */}
                  <div className="flex flex-col items-center sm:items-start space-y-4 mb-8">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-2 border-riftx-green">
                          {profileData.profilePicture ? (
                            <AvatarImage src={profileData.profilePicture} alt="Profile" />
                          ) : (
                            <AvatarFallback className="bg-riftx-black text-riftx-snow">
                              <UserRound className="w-12 h-12" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute -bottom-2 -right-2 rounded-full bg-riftx-green text-riftx-black hover:bg-riftx-green/80"
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 bg-riftx-olive border-riftx-darkgreen p-4">
                            <div className="space-y-4">
                              <h4 className="font-medium text-riftx-snow">Select Profile Picture</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {profilePictureOptions.map((pic, index) => (
                                  <div 
                                    key={index}
                                    onClick={() => handleProfilePictureSelect(pic.url)}
                                    className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                                      profileData.profilePicture === pic.url 
                                        ? 'border-riftx-green' 
                                        : 'border-transparent hover:border-riftx-snow/50'
                                    }`}
                                  >
                                    <img src={pic.url} alt={pic.alt} className="h-16 w-full object-cover" />
                                  </div>
                                ))}
                              </div>
                              {profileData.profilePicture && (
                                <Button 
                                  variant="outline" 
                                  className="w-full text-riftx-snow border-riftx-snow/30 hover:bg-riftx-black/30"
                                  onClick={() => handleProfilePictureSelect('')}
                                >
                                  Remove Picture
                                </Button>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="text-sm text-riftx-snow/80">
                        <p>Choose a profile picture from our collection</p>
                        <p>Your profile picture will be visible to other players</p>
                      </div>
                    </div>
                  </div>

                  {/* Basic Info Section */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="username">Username* (unique identifier)</Label>
                      <Input
                        id="username"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                        placeholder="e.g. ProGamer123"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="displayName">Display Name (shown publicly)</Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleChange}
                        className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                        placeholder="e.g. Pro Gamer"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      className="bg-riftx-black/50 border-riftx-olive text-riftx-snow h-24"
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={profileData.country} onValueChange={(value) => handleSelectChange('country', value)}>
                      <SelectTrigger className="bg-riftx-black/50 border-riftx-olive text-riftx-snow">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className="bg-riftx-olive text-riftx-snow border-riftx-darkgreen">
                        {["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Brazil", "South Korea", "Other"].map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Social Media Section */}
                  <div className="pt-6 border-t border-riftx-olive/30">
                    <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                    <p className="text-riftx-snow/80 mb-4">
                      Connect your social media accounts to share your gaming achievements and find teammates.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="twitchUsername">Twitch Username</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-riftx-snow/60">twitch.tv/</span>
                          <Input
                            id="twitchUsername"
                            name="twitchUsername"
                            value={profileData.twitchUsername}
                            onChange={handleChange}
                            className="bg-riftx-black/50 border-riftx-olive text-riftx-snow pl-20"
                            placeholder="your_username"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="discordUsername">Discord Username</Label>
                        <Input
                          id="discordUsername"
                          name="discordUsername"
                          value={profileData.discordUsername}
                          onChange={handleChange}
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                          placeholder="username#0000"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="twitterUsername">Twitter Username</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-riftx-snow/60">@</span>
                          <Input
                            id="twitterUsername"
                            name="twitterUsername"
                            value={profileData.twitterUsername}
                            onChange={handleChange}
                            className="bg-riftx-black/50 border-riftx-olive text-riftx-snow pl-8"
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="pt-6 flex flex-wrap justify-between gap-4 border-t border-riftx-olive/30">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-riftx-olive text-riftx-snow"
                      onClick={handleReset}
                    >
                      Reset All
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90"
                    >
                      Save & Continue
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProfileSetupPage;
