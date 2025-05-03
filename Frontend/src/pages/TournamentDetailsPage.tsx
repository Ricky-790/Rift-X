
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';
import { Tabs as DialogTabs, TabsContent as DialogTabsContent, TabsList as DialogTabsList, TabsTrigger as DialogTabsTrigger } from "@/components/ui/tabs";
import { Copy } from 'lucide-react';

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    description: ''
  });
  const [joinTeamCode, setJoinTeamCode] = useState('');
  const [generatedTeamCode, setGeneratedTeamCode] = useState('');

  // Function to generate a random team code
  const generateTeamCode = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Mock tournament data
  const tournament = {
    id: parseInt(id || "1"),
    title: "Apex Legends Championship",
    game: "Apex Legends",
    prize: "$10,000",
    date: "May 15, 2025",
    registrationDeadline: "May 10, 2025",
    status: "Registration Open",
    description: "Join the ultimate Apex Legends tournament and compete against the best players worldwide. This tournament features a group stage followed by a double-elimination bracket.",
    format: "5v5 Team Deathmatch",
    rules: [
      "Standard competitive ruleset applies",
      "Players must be at least 16 years old",
      "All team members must be registered before the deadline",
      "Check-in required 30 minutes before matches",
      "Teams must have a minimum of 5 players and maximum of 7 (including substitutes)"
    ],
    schedule: [
      { stage: "Registration", date: "April 15 - May 10, 2025" },
      { stage: "Group Stage", date: "May 15 - May 20, 2025" },
      { stage: "Quarter Finals", date: "May 22, 2025" },
      { stage: "Semi Finals", date: "May 24, 2025" },
      { stage: "Finals", date: "May 25, 2025" }
    ],
    prizes: [
      { position: "1st Place", amount: "$5,000" },
      { position: "2nd Place", amount: "$2,500" },
      { position: "3rd Place", amount: "$1,500" },
      { position: "4th Place", amount: "$1,000" }
    ],
    teams: [
      { name: "Team Alpha", members: 5, status: "Confirmed" },
      { name: "The Legends", members: 5, status: "Confirmed" },
      { name: "Victory Squadron", members: 5, status: "Confirmed" },
      { name: "Digital Chaos", members: 5, status: "Pending" },
      { name: "Phoenix Force", members: 5, status: "Confirmed" },
      { name: "Nova Esports", members: 5, status: "Pending" },
      { name: "Elite Gaming", members: 5, status: "Confirmed" },
      { name: "Team Synergy", members: 5, status: "Pending" }
    ],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  };

  const handleCreateTeam = () => {
    // Validation
    if (!newTeamData.name) {
      toast({
        title: "Team name required",
        description: "Please enter a name for your team.",
        variant: "destructive"
      });
      return;
    }

    // Generate a unique team code
    const teamCode = generateTeamCode();
    setGeneratedTeamCode(teamCode);
    
    toast({
      title: "Team Created",
      description: `${newTeamData.name} has been successfully created and registered for ${tournament.title}.`,
    });
  };

  const handleJoinTeam = () => {
    // Validation
    if (!joinTeamCode) {
      toast({
        title: "Team code required",
        description: "Please enter a valid team code to join.",
        variant: "destructive"
      });
      return;
    }

    // Join team logic would go here
    
    toast({
      title: "Team Joined",
      description: `You have successfully joined a team for ${tournament.title}.`,
    });

    // Reset form
    setJoinTeamCode('');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedTeamCode);
    toast({
      title: "Code Copied",
      description: "Team code copied to clipboard.",
    });
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={tournament.image} 
            alt={tournament.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-riftx-black to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{tournament.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-riftx-snow/80">{tournament.game}</span>
              <span className="w-2 h-2 rounded-full bg-riftx-snow/40"></span>
              <span className="text-riftx-snow/80">{tournament.date}</span>
              <span className="text-xs px-3 py-1 bg-riftx-green/20 text-riftx-green rounded-full">
                {tournament.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Details */}
      <section className="py-8 bg-riftx-black">
        <div className="container mx-auto px-4">
          <div className="bg-riftx-olive/20 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Tournament Details</h2>
                <p className="text-riftx-snow/80">
                  Registration closes on {tournament.registrationDeadline}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-riftx-olive text-riftx-snow">
                  Share
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                      Register or Join Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-riftx-olive text-riftx-snow border-riftx-darkgreen">
                    <DialogHeader>
                      <DialogTitle>Register for {tournament.title}</DialogTitle>
                    </DialogHeader>
                    <div className="pt-4">
                      <DialogTabs defaultValue="create">
                      {!generatedTeamCode && (
                        <DialogTabsList className="bg-riftx-black/30 w-full">
                        <DialogTabsTrigger value="create">Create a Team</DialogTabsTrigger>
                        <DialogTabsTrigger value="join">Join a Team</DialogTabsTrigger>
                        </DialogTabsList>
                )}
                        <DialogTabsContent value="create" className="space-y-4 pt-4">
                          {!generatedTeamCode ? (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="team-name">Team Name*</Label>
                                <Input
                                  id="team-name"
                                  placeholder="Enter your team name"
                                  className="bg-riftx-black/50 border-riftx-darkgreen text-riftx-snow"
                                  value={newTeamData.name}
                                  onChange={(e) => setNewTeamData({...newTeamData, name: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="team-description">Team Description</Label>
                                <Input
                                  id="team-description"
                                  placeholder="Describe your team's focus and goals"
                                  className="bg-riftx-black/50 border-riftx-darkgreen text-riftx-snow"
                                  value={newTeamData.description}
                                  onChange={(e) => setNewTeamData({...newTeamData, description: e.target.value})}
                                />
                              </div>
                              <Button 
                                className="w-full bg-riftx-green text-riftx-black hover:bg-riftx-green/90 mt-4"
                                onClick={handleCreateTeam}
                              >
                                Create & Register Team
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4 text-center">
                              <h3 className="text-lg font-medium">Your Team Code</h3>
                              <p className="text-sm text-riftx-snow/80">Share this code with your teammates so they can join your team</p>
                              <div className="relative">
                                <div className="bg-riftx-black/50 border border-riftx-darkgreen rounded-md p-4 text-center">
                                  <span className="text-2xl font-bold tracking-widest">{generatedTeamCode}</span>
                                </div>
                                <Button 
                                  className="absolute top-1/2 right-2 transform -translate-y-1/2 h-8 w-8 p-0 bg-transparent hover:bg-riftx-black/20"
                                  onClick={handleCopyCode}
                                >
                                  <Copy className="h-4 w-4" />
                                  <span className="sr-only">Copy code</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogTabsContent>
                        {!generatedTeamCode && (
                        <DialogTabsContent value="join" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="team-code">Team Code*</Label>
                            <Input
                              id="team-code"
                              placeholder="Enter the team code"
                              className="bg-riftx-black/50 border-riftx-darkgreen text-riftx-snow"
                              value={joinTeamCode}
                              onChange={(e) => setJoinTeamCode(e.target.value)}
                            />
                          </div>
                          <Button 
                            className="w-full bg-riftx-green text-riftx-black hover:bg-riftx-green/90 mt-4"
                            onClick={handleJoinTeam}
                          >
                            Join Team
                          </Button>
                        </DialogTabsContent>
                         )}
                      </DialogTabs>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="bg-riftx-black/30 border-b border-riftx-olive w-full justify-start">
                <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-riftx-green rounded-none">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="rules" className="data-[state=active]:border-b-2 data-[state=active]:border-riftx-green rounded-none">
                  Rules
                </TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:border-b-2 data-[state=active]:border-riftx-green rounded-none">
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="prizes" className="data-[state=active]:border-b-2 data-[state=active]:border-riftx-green rounded-none">
                  Prizes
                </TabsTrigger>
                <TabsTrigger value="teams" className="data-[state=active]:border-b-2 data-[state=active]:border-riftx-green rounded-none">
                  Teams
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <p className="text-riftx-snow/80 mb-6">{tournament.description}</p>
                    
                    <h3 className="text-xl font-bold mb-4">Tournament Format</h3>
                    <p className="text-riftx-snow/80">{tournament.format}</p>
                  </div>
                  
                  <div className="bg-riftx-black/30 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-riftx-snow/60">Game:</span>
                        <span className="font-medium">{tournament.game}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-riftx-snow/60">Start Date:</span>
                        <span className="font-medium">{tournament.date}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-riftx-snow/60">Registration Deadline:</span>
                        <span className="font-medium">{tournament.registrationDeadline}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-riftx-snow/60">Format:</span>
                        <span className="font-medium">{tournament.format}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-riftx-snow/60">Prize Pool:</span>
                        <span className="font-medium text-riftx-green">{tournament.prize}</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-riftx-olive/50">
                      <h4 className="font-semibold mb-2">Organizer</h4>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-riftx-darkgreen mr-3"></div>
                        <div>
                          <p className="font-medium">Rift-X Official</p>
                          <p className="text-xs text-riftx-snow/60">Verified Organizer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rules" className="pt-6">
                <h3 className="text-xl font-bold mb-4">Tournament Rules</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className="text-riftx-snow/80">{rule}</li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="schedule" className="pt-6">
                <h3 className="text-xl font-bold mb-4">Tournament Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-riftx-olive">
                        <th className="text-left py-3 px-4">Stage</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournament.schedule.map((stage, index) => (
                        <tr key={index} className="border-b border-riftx-olive/30">
                          <td className="py-3 px-4">{stage.stage}</td>
                          <td className="py-3 px-4">{stage.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="prizes" className="pt-6">
                <h3 className="text-xl font-bold mb-4">Prize Distribution</h3>
                <p className="text-riftx-snow/80 mb-6">Total Prize Pool: <span className="text-riftx-green font-bold">{tournament.prize}</span></p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {tournament.prizes.map((prize, index) => (
                    <div key={index} className="bg-riftx-black/30 p-6 rounded-lg text-center">
                      <h4 className="text-lg font-bold mb-2">{prize.position}</h4>
                      <p className="text-riftx-green text-2xl font-bold">{prize.amount}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="teams" className="pt-6">
                <h3 className="text-xl font-bold mb-4">Registered Teams</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-riftx-olive">
                        <th className="text-left py-3 px-4">Team Name</th>
                        <th className="text-left py-3 px-4">Members</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournament.teams.map((team, index) => (
                        <tr key={index} className="border-b border-riftx-olive/30">
                          <td className="py-3 px-4">{team.name}</td>
                          <td className="py-3 px-4">{team.members}</td>
                          <td className="py-3 px-4">
                            {team.status === 'Confirmed' ? (
                              <span className="text-xs px-2 py-1 bg-riftx-green/20 text-riftx-green rounded-full">
                                {team.status}
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                                {team.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      
    </PageLayout>
  );
};

export default TournamentDetailsPage;
