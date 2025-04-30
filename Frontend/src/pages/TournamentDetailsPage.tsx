
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    description: ''
  });

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

    // Create team logic would go here
    
    toast({
      title: "Team Created",
      description: `${newTeamData.name} has been successfully created and registered for ${tournament.title}.`,
    });

    // Reset form
    setNewTeamData({
      name: '',
      description: ''
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
                      Register Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-riftx-olive text-riftx-snow border-riftx-darkgreen">
                    <DialogHeader>
                      <DialogTitle>Create a New Team for {tournament.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
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

      {/* Related Tournaments */}
      <section className="py-8 bg-riftx-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Similar Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Link to={`/tournaments/${item}`} key={item}>
                <div className="bg-riftx-olive/20 rounded-lg overflow-hidden hover-glow transition-all duration-300">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${item === 1 ? '1605810230434-7631ac76ec81' : item === 2 ? '1488590528505-98d2b5aba04b' : '1649972904349-6e44c42644a7'}`} 
                      alt="Tournament" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">
                      {item === 1 ? 'Valorant Masters' : item === 2 ? 'Call of Duty Warzone Showdown' : 'Fortnite Battle Royale'}
                    </h3>
                    <div className="flex justify-between text-sm text-riftx-snow/70">
                      <span>
                        {item === 1 ? 'Valorant' : item === 2 ? 'Call of Duty' : 'Fortnite'}
                      </span>
                      <span className="text-riftx-green">
                        {item === 1 ? '$15,000' : item === 2 ? '$8,000' : '$20,000'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TournamentDetailsPage;
