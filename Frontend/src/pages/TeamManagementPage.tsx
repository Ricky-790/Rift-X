import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';
import { Search } from 'lucide-react';

const TeamManagementPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock team data
  const myTeams = [
    {
      id: 1,
      name: "Team Alpha",
      logo: null,
      role: "Captain",
      members: [
        { id: 1, username: "ProGamer123", role: "Captain" },
        { id: 2, username: "SniperElite", role: "Member" },
        { id: 3, username: "FragMaster", role: "Member" },
        { id: 4, username: "TacticalGamer", role: "Member" },
        { id: 5, username: "QuickScope", role: "Member" },
      ],
      tournaments: 3,
      achievements: [
        { tournament: "Apex Legends Championship", place: "3rd Place" },
        { tournament: "Valorant Masters", place: "Qualified" }
      ]
    },
    {
      id: 2,
      name: "The Legends",
      logo: null,
      role: "Member",
      members: [
        { id: 6, username: "GamingGuru", role: "Captain" },
        { id: 1, username: "ProGamer123", role: "Member" },
        { id: 7, username: "HeadshotHero", role: "Member" },
        { id: 8, username: "StrategyMaster", role: "Member" },
      ],
      tournaments: 1,
      achievements: [
        { tournament: "League of Legends Cup", place: "5th-8th Place" }
      ]
    }
  ];

  const invitations = [
    {
      id: 1,
      teamName: "Nova Esports",
      from: "ElitePlayer",
      date: "May 12, 2025"
    },
    {
      id: 2,
      teamName: "Phantom Gaming",
      from: "VictoryQueen",
      date: "May 10, 2025"
    }
  ];

  // Filter teams based on search
  const filteredTeams = myTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Team Management</h1>
              <p className="text-riftx-snow/80">Manage your gaming teams.</p>
            </div>
            
            <div>
              <Link to="/tournaments">
                <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                  Join a Tournament
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="my-teams">
            <TabsList className="bg-riftx-black/30 w-full justify-start mb-6">
              <TabsTrigger value="my-teams">My Teams</TabsTrigger>
              <TabsTrigger value="invitations">
                Invitations
                {invitations.length > 0 && (
                  <span className="ml-2 bg-riftx-green text-riftx-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {invitations.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-teams">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-riftx-snow/60" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search teams..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                  />
                </div>
              </div>

              {filteredTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTeams.map((team) => (
                    <Card key={team.id} className="bg-riftx-olive/20 border-riftx-olive overflow-hidden">
                      <div className="h-2 bg-riftx-green"></div>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-riftx-darkgreen rounded-md flex items-center justify-center">
                            <span className="text-xl font-bold">{team.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">{team.name}</h2>
                            <p className="text-sm text-riftx-snow/70">
                              {team.role} • {team.members.length} members
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-riftx-snow/70 mb-2">Members</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {team.members.slice(0, 4).map((member) => (
                              <div key={member.id} className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-riftx-black/50 rounded-full"></div>
                                <span className="text-sm truncate">{member.username}</span>
                                {member.role === 'Captain' && (
                                  <span className="text-xs text-riftx-green">(C)</span>
                                )}
                              </div>
                            ))}
                            {team.members.length > 4 && (
                              <div className="flex items-center text-sm text-riftx-snow/70">
                                +{team.members.length - 4} more
                              </div>
                            )}
                          </div>
                        </div>

                        {team.achievements.length > 0 && (
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-riftx-snow/70 mb-2">Recent Achievements</h3>
                            <ul className="space-y-1">
                              {team.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-sm flex justify-between">
                                  <span className="truncate">{achievement.tournament}</span>
                                  <span className="text-riftx-green">{achievement.place}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-4 border-t border-riftx-olive/30 flex justify-between">
                          <span className="text-sm">
                            {team.tournaments} {team.tournaments === 1 ? 'tournament' : 'tournaments'}
                          </span>
                          <Link to={`/teams/${team.id}`}>
                            <Button variant="link" className="text-riftx-green p-0 h-auto">
                              Manage Team
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-riftx-snow/60 mb-4">No teams found.</p>
                  <Link to="/tournaments">
                    <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                      Join a Tournament to Create a Team
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="invitations">
              {invitations.length > 0 ? (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <Card key={invitation.id} className="bg-riftx-olive/20 border-riftx-olive">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h2 className="text-lg font-semibold">{invitation.teamName}</h2>
                            <p className="text-sm text-riftx-snow/70">
                              Invited by {invitation.from} on {invitation.date}
                            </p>
                          </div>
                          <div className="flex gap-2 self-end md:self-auto">
                            <Button variant="outline" className="border-riftx-olive text-riftx-snow">
                              Decline
                            </Button>
                            <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                              Accept
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-riftx-snow/60">No pending invitations.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageLayout>
  );
};

export default TeamManagementPage;
