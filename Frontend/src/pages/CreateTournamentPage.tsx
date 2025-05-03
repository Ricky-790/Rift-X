
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const CreateTournamentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    title: '',
    game: '',
    description: '',
    format: '',
    startDate: '',
    registrationDeadline: '',
    prizePool: '',
    maxTeams: '',
    teamSize: '',
    rules: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formState.title || !formState.game || !formState.startDate || !formState.registrationDeadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Submit logic would go here in a real app

    toast({
      title: "Tournament Created",
      description: "Your tournament has been created successfully.",
    });

    // Navigate to tournaments page
    setTimeout(() => {
      navigate('/tournaments');
    }, 1500);
  };

  const gameOptions = [
    "Apex Legends", 
    "Call of Duty", 
    "Counter-Strike", 
    "Dota 2", 
    "Fortnite", 
    "League of Legends", 
    "Overwatch",
    "PUBG", 
    "Rocket League", 
    "Valorant"
  ];

  const formatOptions = [
    "5v5 Team Deathmatch",
    "Battle Royale",
    "Capture the Flag",
    "Double Elimination",
    "Free-for-All",
    "Groups + Single Elimination",
    "Single Elimination",
    "Swiss System"
  ];

  return (
    <PageLayout>
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create Tournament</h1>
            
            <div className="bg-riftx-olive/20 rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-riftx-green">Basic Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Tournament Title*</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                        placeholder="e.g. Apex Legends Championship"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="game">Game*</Label>
                      <Select value={formState.game} onValueChange={(value) => handleSelectChange('game', value)}>
                        <SelectTrigger className="bg-riftx-black/50 border-riftx-olive text-riftx-snow">
                          <SelectValue placeholder="Select a game" />
                        </SelectTrigger>
                        <SelectContent className="bg-riftx-olive text-riftx-snow border-riftx-darkgreen">
                          {gameOptions.map((game) => (
                            <SelectItem key={game} value={game}>
                              {game}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        className="bg-riftx-black/50 border-riftx-olive text-riftx-snow h-32"
                        placeholder="Describe your tournament in detail..."
                      />
                    </div>
                  </div>
                </div>
                
                {/* Tournament Structure */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-riftx-green">Tournament Structure</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="format">Format*</Label>
                      <Select value={formState.format} onValueChange={(value) => handleSelectChange('format', value)}>
                        <SelectTrigger className="bg-riftx-black/50 border-riftx-olive text-riftx-snow">
                          <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent className="bg-riftx-olive text-riftx-snow border-riftx-darkgreen">
                          {formatOptions.map((format) => (
                            <SelectItem key={format} value={format}>
                              {format}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date*</Label>
                        <Input
                          id="startDate"
                          name="startDate"
                          type="date"
                          value={formState.startDate}
                          onChange={handleChange}
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="registrationDeadline">Registration Deadline*</Label>
                        <Input
                          id="registrationDeadline"
                          name="registrationDeadline"
                          type="date"
                          value={formState.registrationDeadline}
                          onChange={handleChange}
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="prizePool">Prize Pool</Label>
                        <Input
                          id="prizePool"
                          name="prizePool"
                          value={formState.prizePool}
                          onChange={handleChange}
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                          placeholder="e.g. $10,000"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="maxTeams">Max Teams</Label>
                        <Input
                          id="maxTeams"
                          name="maxTeams"
                          type="number"
                          value={formState.maxTeams}
                          onChange={handleChange}
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                          placeholder="e.g. 32"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="teamSize">Team Size</Label>
                        <Input
                          id="teamSize"
                          name="teamSize"
                          type="number"
                          value={formState.teamSize}
                          onChange={handleChange}
                          className="bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                          placeholder="e.g. 5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Rules & Guidelines */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-riftx-green">Rules & Guidelines</h2>
                  <div>
                    <Label htmlFor="rules">Tournament Rules</Label>
                    <Textarea
                      id="rules"
                      name="rules"
                      value={formState.rules}
                      onChange={handleChange}
                      className="bg-riftx-black/50 border-riftx-olive text-riftx-snow h-32"
                      placeholder="Enter the rules for your tournament..."
                    />
                  </div>
                </div>
                
                {/* Submit */}
                <div className="flex justify-end gap-4 pt-4 border-t border-riftx-olive/30">
                  <Button
                    type="button"
                    variant="outline" 
                    className="border-riftx-olive text-riftx-snow"
                    onClick={() => navigate('/tournaments')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                    Create Tournament
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CreateTournamentPage;
