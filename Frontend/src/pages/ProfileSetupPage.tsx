
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
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
    preferredGames: [] as string[],
    twitchUsername: '',
    discordUsername: '',
    twitterUsername: '',
  });

  const [gameSearch, setGameSearch] = useState('');

  // Mock list of games
  const gameOptions = [
    "Apex Legends", 
    "Call of Duty", 
    "Counter-Strike", 
    "Dota 2", 
    "FIFA", 
    "Fortnite", 
    "Hearthstone", 
    "League of Legends",
    "Minecraft",
    "Overwatch", 
    "PUBG", 
    "Rainbow Six Siege", 
    "Rocket League", 
    "Starcraft", 
    "Street Fighter", 
    "Super Smash Bros",
    "Valorant", 
    "World of Warcraft"
  ];

  // Filter games based on search
  const filteredGames = gameOptions.filter(game => 
    game.toLowerCase().includes(gameSearch.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGame = (game: string) => {
    setProfileData(prev => {
      if (prev.preferredGames.includes(game)) {
        return { ...prev, preferredGames: prev.preferredGames.filter(g => g !== game) };
      } else {
        return { ...prev, preferredGames: [...prev.preferredGames, game] };
      }
    });
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

    // Save profile logic would go here in a real app

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });

    // Navigate to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleReset = () => {
    setProfileData({
      username: '',
      displayName: '',
      email: '',
      bio: '',
      country: '',
      preferredGames: [],
      twitchUsername: '',
      discordUsername: '',
      twitterUsername: '',
    });
  };

  return (
    <PageLayout>
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Set Up Your Profile</h1>
            
            <div className="bg-riftx-olive/20 rounded-lg p-6">
              <Tabs defaultValue="basic">
                <TabsList className="bg-riftx-black/30 w-full mb-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="games">Games</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit}>
                  <TabsContent value="basic">
                    <div className="space-y-6">
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
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow h-32"
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
                      
                      <div className="pt-4 flex flex-wrap justify-between gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-riftx-olive text-riftx-snow"
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="border-riftx-green text-riftx-green"
                            onClick={() => document.querySelector('[data-value="games"]')?.click()}
                          >
                            Next: Games
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="games">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Search Games</Label>
                        <Input
                          value={gameSearch}
                          onChange={(e) => setGameSearch(e.target.value)}
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                          placeholder="Search for games..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Selected Games ({profileData.preferredGames.length})</Label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.preferredGames.length > 0 ? (
                            profileData.preferredGames.map((game) => (
                              <div 
                                key={game} 
                                className="bg-riftx-green/20 text-riftx-green px-3 py-1 rounded-full flex items-center gap-2"
                              >
                                <span>{game}</span>
                                <button 
                                  type="button"
                                  onClick={() => toggleGame(game)}
                                  className="w-4 h-4 rounded-full bg-riftx-green/30 hover:bg-riftx-green/50 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-riftx-snow/60 text-sm">No games selected</p>
                          )}
                        </div>
                      </div>
                      
                      <Separator className="bg-riftx-olive/30" />
                      
                      <div className="space-y-2">
                        <Label>Available Games</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {filteredGames.map((game) => (
                            <div 
                              key={game} 
                              onClick={() => toggleGame(game)}
                              className={`px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 ${
                                profileData.preferredGames.includes(game) 
                                  ? 'bg-riftx-green/20 text-riftx-green' 
                                  : 'bg-riftx-black/30 text-riftx-snow hover:bg-riftx-black/50'
                              }`}
                            >
                              <div 
                                className={`w-4 h-4 rounded-sm border ${
                                  profileData.preferredGames.includes(game) 
                                    ? 'border-riftx-green bg-riftx-green/30' 
                                    : 'border-riftx-snow/50'
                                }`}
                              >
                                {profileData.preferredGames.includes(game) && (
                                  <div className="flex items-center justify-center text-xs">
                                    ✓
                                  </div>
                                )}
                              </div>
                              <span>{game}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 flex flex-wrap justify-between gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-riftx-olive text-riftx-snow"
                          onClick={() => document.querySelector('[data-value="basic"]')?.click()}
                        >
                          Back
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-riftx-green text-riftx-green"
                          onClick={() => document.querySelector('[data-value="social"]')?.click()}
                        >
                          Next: Social Media
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="social">
                    <div className="space-y-6">
                      <p className="text-riftx-snow/80 mb-4">
                        Connect your social media accounts to share your gaming achievements and find teammates.
                      </p>
                      
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
                      
                      <div className="pt-6 flex flex-wrap justify-between gap-4 border-t border-riftx-olive/30">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-riftx-olive text-riftx-snow"
                          onClick={() => document.querySelector('[data-value="games"]')?.click()}
                        >
                          Back
                        </Button>
                        <div className="flex gap-2">
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
                            Save Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </form>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProfileSetupPage;
