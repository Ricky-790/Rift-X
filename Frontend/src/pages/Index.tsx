
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome to Rift-X!",
      description: "The ultimate platform for gaming tournaments and esports competitions.",
    });
  }, []);

  const featuredTournaments = [
    {
      id: 1,
      title: "Apex Legends Championship",
      game: "Apex Legends",
      prize: "$10,000",
      date: "May 15, 2025",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      id: 2,
      title: "Valorant Masters",
      game: "Valorant",
      prize: "$15,000",
      date: "June 10, 2025",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 3,
      title: "League of Legends World Cup",
      game: "League of Legends",
      prize: "$25,000",
      date: "July 22, 2025",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-riftx-black">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e)' }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-riftx-green animate-pulse-glow inline-block">Rift-X</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-riftx-snow/90">
              The ultimate platform for gaming tournaments and esports competitions. 
              Join today and compete with the best players worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/tournaments">
                <Button size="lg" className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                  Browse Tournaments
                </Button>
              </Link>
              <Link to="/tournaments/create">
                <Button size="lg" variant="outline" className="border-riftx-green text-riftx-green hover:bg-riftx-green/10">
                  Create Tournament
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-riftx-black to-transparent"></div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-16 bg-riftx-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Tournaments</h2>
            <Link to="/tournaments" className="text-riftx-green hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTournaments.map((tournament) => (
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
                    <h3 className="text-xl font-bold mb-2">{tournament.title}</h3>
                    <div className="flex justify-between text-sm text-riftx-snow/70 mb-4">
                      <span>{tournament.game}</span>
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-riftx-green font-semibold">{tournament.prize} Prize Pool</span>
                      <span className="text-xs px-3 py-1 bg-riftx-green/20 text-riftx-green rounded-full">
                        Registration Open
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-b from-riftx-black to-riftx-darkgreen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-riftx-olive/20 p-8 rounded-lg text-center">
              <div className="rounded-full w-16 h-16 flex items-center justify-center bg-riftx-green/20 text-riftx-green mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Sign Up</h3>
              <p className="text-riftx-snow/80">
                Create your account and set up your gaming profile with your preferred games and experience.
              </p>
            </div>

            <div className="bg-riftx-olive/20 p-8 rounded-lg text-center">
              <div className="rounded-full w-16 h-16 flex items-center justify-center bg-riftx-green/20 text-riftx-green mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Join Tournaments</h3>
              <p className="text-riftx-snow/80">
                Browse available tournaments, register your team, and prepare for competition.
              </p>
            </div>

            <div className="bg-riftx-olive/20 p-8 rounded-lg text-center">
              <div className="rounded-full w-16 h-16 flex items-center justify-center bg-riftx-green/20 text-riftx-green mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Compete & Win</h3>
              <p className="text-riftx-snow/80">
                Play matches, climb the leaderboards, and win prizes through our secure blockchain payouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-riftx-darkgreen">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Compete?</h2>
            <p className="text-xl mb-8 text-riftx-snow/90">
              Sign up now and join thousands of gamers in the most exciting tournaments online.
            </p>
            <Link to="/wallet">
              <Button size="lg" className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-riftx-darkgreen to-riftx-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Gamers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-riftx-olive/10 p-8 rounded-lg">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6EE224" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-riftx-snow/80 mb-4">
                "Rift-X has completely transformed how I experience gaming competitions. The platform is intuitive, tournaments are well-organized, and payouts are instant."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-riftx-green/20 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Alex Martinez</p>
                  <p className="text-xs text-riftx-snow/60">Pro Gamer</p>
                </div>
              </div>
            </div>

            <div className="bg-riftx-olive/10 p-8 rounded-lg">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6EE224" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-riftx-snow/80 mb-4">
                "As a tournament organizer, Rift-X gives me all the tools I need to create and manage professional-level competitions. My community loves it!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-riftx-green/20 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-xs text-riftx-snow/60">Tournament Organizer</p>
                </div>
              </div>
            </div>

            <div className="bg-riftx-olive/10 p-8 rounded-lg">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6EE224" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-riftx-snow/80 mb-4">
                "The blockchain integration for tournament prizes is a game-changer. Fast, secure, and transparent - exactly what the esports industry needed."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-riftx-green/20 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Michael Lee</p>
                  <p className="text-xs text-riftx-snow/60">Team Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
