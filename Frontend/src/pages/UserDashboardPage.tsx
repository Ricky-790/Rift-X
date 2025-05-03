
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PageLayout from '@/components/layout/PageLayout';

// Import Chart component from recharts
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserDashboardPage = () => {
  // Mock user data
  const user = {
    username: "ProGamer123",
    level: 42,
    xp: 8750,
    nextLevelXp: 10000,
    wallet: "$250.00",
    totalWinnings: "$1,250.00",
    matches: 86,
    wins: 54,
    tournaments: {
      upcoming: [
        { id: 1, name: "Valorant Masters", date: "June 10, 2025", game: "Valorant", status: "Registered" },
        { id: 2, name: "Fortnite Battle Royale", date: "June 5, 2025", game: "Fortnite", status: "Registered" }
      ],
      active: [
        { id: 3, name: "Apex Legends Championship", date: "May 15, 2025", game: "Apex Legends", status: "In Progress", nextMatch: "May 17, 2025" }
      ],
      completed: [
        { id: 4, name: "Call of Duty Warzone Showdown", date: "April 30, 2025", game: "Call of Duty", status: "3rd Place" },
        { id: 5, name: "League of Legends Cup", date: "April 15, 2025", game: "League of Legends", status: "5th-8th Place" },
        { id: 6, name: "Dota 2 International Qualifiers", date: "March 20, 2025", game: "Dota 2", status: "1st Place" }
      ]
    },
    teams: [
      { id: 1, name: "Team Alpha", role: "Captain", members: 5, tournaments: 3 },
      { id: 2, name: "The Legends", role: "Member", members: 5, tournaments: 1 }
    ],
    recentMatches: [
      { id: 1, game: "Apex Legends", result: "Win", date: "May 12, 2025", score: "5-3" },
      { id: 2, game: "Valorant", result: "Loss", date: "May 10, 2025", score: "2-3" },
      { id: 3, game: "Apex Legends", result: "Win", date: "May 8, 2025", score: "4-1" },
      { id: 4, game: "Fortnite", result: "Win", date: "May 5, 2025", score: "1st Place" },
      { id: 5, game: "Valorant", result: "Loss", date: "May 3, 2025", score: "1-3" }
    ]
  };

  // Chart data
  const winRateData = [
    { name: 'Wins', value: user.wins },
    { name: 'Losses', value: user.matches - user.wins },
  ];

  const COLORS = ['#6EE224', '#3A403D'];

  const performanceData = [
    { name: 'Apex Legends', wins: 23, losses: 7 },
    { name: 'Valorant', wins: 15, losses: 10 },
    { name: 'Fortnite', wins: 10, losses: 5 },
    { name: 'League of Legends', wins: 6, losses: 10 }
  ];

  return (
    <PageLayout>
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          {/* User Profile Overview */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-riftx-darkgreen rounded-full border-2 border-riftx-green flex items-center justify-center">
                  <span className="text-xl font-bold">{user.username.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  <div className="flex items-center text-sm text-riftx-snow/70">
                    <span>Level {user.level}</span>
                    <span className="mx-2">•</span>
                    <span>{user.xp}/{user.nextLevelXp} XP</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/teams">
                  <Button variant="outline" className="border-riftx-olive text-riftx-snow">
                    Manage Teams
                  </Button>
                </Link>
                <Link to="/profile/setup">
                  <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-riftx-olive/20 border-riftx-olive">
              <CardHeader className="pb-2">
                <h3 className="text-sm font-medium text-riftx-snow/70">Wallet Balance</h3>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-riftx-green">{user.wallet}</p>
                <p className="text-xs text-riftx-snow/50 mt-1">Available for withdrawal</p>
              </CardContent>
            </Card>

            <Card className="bg-riftx-olive/20 border-riftx-olive">
              <CardHeader className="pb-2">
                <h3 className="text-sm font-medium text-riftx-snow/70">Total Winnings</h3>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{user.totalWinnings}</p>
                <p className="text-xs text-riftx-snow/50 mt-1">Lifetime earnings</p>
              </CardContent>
            </Card>

            <Card className="bg-riftx-olive/20 border-riftx-olive">
              <CardHeader className="pb-2">
                <h3 className="text-sm font-medium text-riftx-snow/70">Win Rate</h3>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{Math.round((user.wins / user.matches) * 100)}%</p>
                <p className="text-xs text-riftx-snow/50 mt-1">{user.wins} wins out of {user.matches} matches</p>
              </CardContent>
            </Card>

            <Card className="bg-riftx-olive/20 border-riftx-olive">
              <CardHeader className="pb-2">
                <h3 className="text-sm font-medium text-riftx-snow/70">Teams</h3>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{user.teams.length}</p>
                <p className="text-xs text-riftx-snow/50 mt-1">Active teams</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tournament & Teams */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-riftx-olive/20 border-riftx-olive">
                <CardHeader>
                  <h2 className="text-xl font-bold">My Tournaments</h2>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="bg-riftx-black/30 w-full justify-start mb-4">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upcoming">
                      {user.tournaments.upcoming.length > 0 ? (
                        <div className="space-y-4">
                          {user.tournaments.upcoming.map((tournament) => (
                            <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
                              <div className="flex items-center justify-between p-4 bg-riftx-black/30 rounded-lg hover:bg-riftx-black/40 transition-colors">
                                <div>
                                  <h3 className="font-medium">{tournament.name}</h3>
                                  <div className="flex text-sm text-riftx-snow/70">
                                    <span>{tournament.game}</span>
                                    <span className="mx-2">•</span>
                                    <span>{tournament.date}</span>
                                  </div>
                                </div>
                                <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                                  {tournament.status}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-riftx-snow/60 py-4">No upcoming tournaments.</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="active">
                      {user.tournaments.active.length > 0 ? (
                        <div className="space-y-4">
                          {user.tournaments.active.map((tournament) => (
                            <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
                              <div className="flex items-center justify-between p-4 bg-riftx-black/30 rounded-lg hover:bg-riftx-black/40 transition-colors">
                                <div>
                                  <h3 className="font-medium">{tournament.name}</h3>
                                  <div className="flex flex-col md:flex-row md:items-center text-sm text-riftx-snow/70">
                                    <span>{tournament.game}</span>
                                    <span className="hidden md:inline mx-2">•</span>
                                    <span>Next match: {tournament.nextMatch}</span>
                                  </div>
                                </div>
                                <span className="text-xs px-3 py-1 bg-riftx-green/20 text-riftx-green rounded-full">
                                  {tournament.status}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-riftx-snow/60 py-4">No active tournaments.</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      {user.tournaments.completed.length > 0 ? (
                        <div className="space-y-4">
                          {user.tournaments.completed.map((tournament) => (
                            <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
                              <div className="flex items-center justify-between p-4 bg-riftx-black/30 rounded-lg hover:bg-riftx-black/40 transition-colors">
                                <div>
                                  <h3 className="font-medium">{tournament.name}</h3>
                                  <div className="flex text-sm text-riftx-snow/70">
                                    <span>{tournament.game}</span>
                                    <span className="mx-2">•</span>
                                    <span>{tournament.date}</span>
                                  </div>
                                </div>
                                <span className="text-xs px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full">
                                  {tournament.status}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-riftx-snow/60 py-4">No completed tournaments.</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="bg-riftx-olive/20 border-riftx-olive">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">My Teams</h2>
                    <Link to="/teams">
                      <Button variant="outline" size="sm" className="border-riftx-green text-riftx-green">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {user.teams.length > 0 ? (
                    <div className="space-y-4">
                      {user.teams.map((team) => (
                        <Link to={`/teams/${team.id}`} key={team.id}>
                          <div className="flex items-center justify-between p-4 bg-riftx-black/30 rounded-lg hover:bg-riftx-black/40 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-riftx-darkgreen rounded-md flex items-center justify-center">
                                <span>{team.name.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-medium">{team.name}</h3>
                                <div className="flex text-sm text-riftx-snow/70">
                                  <span>{team.role}</span>
                                  <span className="mx-2">•</span>
                                  <span>{team.members} members</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-riftx-snow/70">
                                {team.tournaments} {team.tournaments === 1 ? 'tournament' : 'tournaments'}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-riftx-snow/60 mb-4">You haven't joined any teams yet.</p>
                      <Link to="/teams/create">
                        <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                          Create a Team
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats & Recent Matches */}
            <div className="space-y-8">
              <Card className="bg-riftx-olive/20 border-riftx-olive">
                <CardHeader>
                  <h2 className="text-xl font-bold">Performance</h2>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={winRateData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {winRateData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="w-full h-64 mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#3A403D" />
                        <XAxis dataKey="name" tick={{ fill: '#F6EFEE' }} />
                        <YAxis tick={{ fill: '#F6EFEE' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#3A403D', borderColor: '#253519', color: '#F6EFEE' }} 
                        />
                        <Legend />
                        <Bar dataKey="wins" fill="#6EE224" name="Wins" />
                        <Bar dataKey="losses" fill="#3A403D" name="Losses" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-riftx-olive/20 border-riftx-olive">
                <CardHeader>
                  <h2 className="text-xl font-bold">Recent Matches</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.recentMatches.map((match) => (
                      <div key={match.id} className="flex justify-between items-center p-3 bg-riftx-black/30 rounded-lg">
                        <div>
                          <p className="font-medium">{match.game}</p>
                          <p className="text-xs text-riftx-snow/70">{match.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{match.score}</span>
                          {match.result === 'Win' ? (
                            <span className="text-xs px-2 py-1 bg-riftx-green/20 text-riftx-green rounded-full">Win</span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">Loss</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default UserDashboardPage;
