
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from '@/components/layout/PageLayout';
import { Search } from 'lucide-react';

const TournamentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock tournament data
  const allTournaments = [
    {
      id: 1,
      title: "Apex Legends Championship",
      game: "Apex Legends",
      prize: "$10,000",
      date: "May 15, 2025",
      status: "open",
      participants: "64 Teams",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      id: 2,
      title: "Valorant Masters",
      game: "Valorant",
      prize: "$15,000",
      date: "June 10, 2025",
      status: "open",
      participants: "32 Teams",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 3,
      title: "League of Legends World Cup",
      game: "League of Legends",
      prize: "$25,000",
      date: "July 22, 2025",
      status: "upcoming",
      participants: "16 Teams",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      id: 4,
      title: "Call of Duty Warzone Showdown",
      game: "Call of Duty",
      prize: "$8,000",
      date: "May 30, 2025",
      status: "open",
      participants: "100 Teams",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    },
    {
      id: 5,
      title: "Fortnite Battle Royale",
      game: "Fortnite",
      prize: "$20,000",
      date: "June 5, 2025",
      status: "upcoming",
      participants: "50 Teams",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      id: 6,
      title: "Dota 2 International Qualifiers",
      game: "Dota 2",
      prize: "$30,000",
      date: "April 15, 2025",
      status: "completed",
      participants: "8 Teams",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
  ];

  // Filter tournaments based on search and filters
  const filteredTournaments = allTournaments.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tournament.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = gameFilter === 'all' || tournament.game.toLowerCase() === gameFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
    
    return matchesSearch && matchesGame && matchesStatus;
  });

  // Get unique game names for filter
  const gameOptions = ['all', ...new Set(allTournaments.map(t => t.game.toLowerCase()))];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tournaments</h1>
              <p className="text-riftx-snow/80">Browse and join gaming tournaments from around the world.</p>
            </div>
            <Link to="/tournaments/create">
              <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90 mt-4 md:mt-0">
                Create Tournament
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-riftx-olive/20 rounded-lg p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-riftx-snow/60" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search tournaments..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-riftx-black/50 border-riftx-olive text-riftx-snow"
                />
              </div>
              
              <Select value={gameFilter} onValueChange={setGameFilter}>
                <SelectTrigger className="bg-riftx-black/50 border-riftx-olive text-riftx-snow">
                  <SelectValue placeholder="Filter by Game" />
                </SelectTrigger>
                <SelectContent className="bg-riftx-olive text-riftx-snow border-riftx-darkgreen">
                  <SelectItem value="all">All Games</SelectItem>
                  {gameOptions.filter(game => game !== 'all').map(game => (
                    <SelectItem key={game} value={game} className="capitalize">
                      {game}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-riftx-black/50 border-riftx-olive text-riftx-snow">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="bg-riftx-olive text-riftx-snow border-riftx-darkgreen">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Registration Open</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tournament Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
                  <div className="bg-riftx-olive/20 rounded-lg overflow-hidden hover-glow transition-all duration-300 h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={tournament.image} 
                        alt={tournament.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{tournament.title}</h3>
                        {tournament.status === 'open' && (
                          <span className="text-xs px-3 py-1 bg-riftx-green/20 text-riftx-green rounded-full">
                            Registration Open
                          </span>
                        )}
                        {tournament.status === 'upcoming' && (
                          <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                            Upcoming
                          </span>
                        )}
                        {tournament.status === 'completed' && (
                          <span className="text-xs px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-riftx-snow/70 mb-4">
                        <div className="flex justify-between mb-1">
                          <span>Game:</span>
                          <span className="text-riftx-snow">{tournament.game}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Date:</span>
                          <span className="text-riftx-snow">{tournament.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Teams:</span>
                          <span className="text-riftx-snow">{tournament.participants}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-riftx-green font-semibold">{tournament.prize} Prize Pool</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-riftx-snow/60 text-lg">No tournaments found matching your filters.</p>
                <Button 
                  variant="link" 
                  className="text-riftx-green mt-2"
                  onClick={() => {
                    setSearchQuery('');
                    setGameFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TournamentsPage;
