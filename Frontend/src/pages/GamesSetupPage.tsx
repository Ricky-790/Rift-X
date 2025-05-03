
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight, CheckCheck } from "lucide-react";

const GamesSetupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1: Game selection
  // Step 2: Game ID input
  const [currentStep, setCurrentStep] = useState<"select" | "input">("select");
  
  const [gameSearch, setGameSearch] = useState('');
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [gameIds, setGameIds] = useState<Record<string, string>>({});

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

  const toggleGame = (game: string) => {
    setSelectedGames(prev => {
      if (prev.includes(game)) {
        // Remove game ID when game is deselected
        const newGameIds = { ...gameIds };
        delete newGameIds[game];
        setGameIds(newGameIds);
        
        return prev.filter(g => g !== game);
      } else {
        return [...prev, game];
      }
    });
  };

  const handleGameIdChange = (game: string, id: string) => {
    setGameIds(prev => ({
      ...prev,
      [game]: id
    }));
  };

  const handleNextStep = () => {
    if (selectedGames.length === 0) {
      toast({
        title: "No Games Selected",
        description: "Please select at least one game or skip this step.",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep("input");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all selected games have IDs
    const missingIds = selectedGames.filter(game => !gameIds[game]);
    
    if (missingIds.length > 0) {
      toast({
        title: "Missing Game IDs",
        description: `Please provide your user ID for: ${missingIds.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Save profile logic would go here in a real app
    toast({
      title: "Profile Setup Complete",
      description: "Your gaming profile has been set up successfully.",
    });

    // Navigate to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleSkip = () => {
    toast({
      title: "Game Setup Skipped",
      description: "You can add games later from your profile.",
    });
    
    navigate('/dashboard');
  };

  return (
    <PageLayout>
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Set Up Your Games</h1>
            
            <div className="bg-riftx-olive/20 rounded-lg p-6">
              {currentStep === "select" ? (
                // Step 1: Game Selection
                <div className="space-y-6">
                  <p className="text-riftx-snow/80">
                    Select the games you play and then you'll be able to add your in-game usernames.
                  </p>
                  
                  <div className="space-y-2">
                    <Label>Search Games</Label>
                    <Input
                      value={gameSearch}
                      onChange={(e) => setGameSearch(e.target.value)}
                      className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                      placeholder="Search for games..."
                    />
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
                            selectedGames.includes(game) 
                              ? 'bg-riftx-green/20 text-riftx-green' 
                              : 'bg-riftx-black/30 text-riftx-snow hover:bg-riftx-black/50'
                          }`}
                        >
                          <div 
                            className={`w-4 h-4 rounded-sm border ${
                              selectedGames.includes(game) 
                                ? 'border-riftx-green bg-riftx-green/30' 
                                : 'border-riftx-snow/50'
                            }`}
                          >
                            {selectedGames.includes(game) && (
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
                  
                  <div className="pt-6 flex flex-wrap justify-between gap-4 border-t border-riftx-olive/30">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-riftx-olive text-riftx-snow"
                      onClick={handleSkip}
                    >
                      Skip for Now
                    </Button>
                    <Button 
                      type="button" 
                      className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90 flex items-center gap-2"
                      onClick={handleNextStep}
                      disabled={selectedGames.length === 0}
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                // Step 2: Game ID Input
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <p className="text-riftx-snow/80">
                      Enter your in-game usernames/IDs so other players can find you.
                    </p>
                    
                    <div className="space-y-4">
                      {selectedGames.map((game) => (
                        <div key={game} className="bg-riftx-black/30 p-4 rounded-md">
                          <div className="space-y-2">
                            <Label htmlFor={`gameId-${game}`}>{game} Username/ID</Label>
                            <Input
                              id={`gameId-${game}`}
                              value={gameIds[game] || ''}
                              onChange={(e) => handleGameIdChange(game, e.target.value)}
                              className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                              placeholder={`Enter your ${game} username...`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-riftx-green/10 text-riftx-green rounded-md text-sm">
                      <CheckCheck className="h-4 w-4" />
                      <span>Fill out your game usernames so other players can find you!</span>
                    </div>
                    
                    <div className="pt-6 flex flex-wrap justify-between gap-4 border-t border-riftx-olive/30">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-riftx-olive text-riftx-snow"
                        onClick={() => setCurrentStep("select")}
                      >
                        Back to Selection
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90"
                      >
                        Complete Setup
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GamesSetupPage;
