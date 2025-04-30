
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, List, User, LogIn } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-riftx-black/80 backdrop-blur-md border-b border-riftx-olive z-50 h-16">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-riftx-green rounded-md flex items-center justify-center">
            <span className="font-bold text-riftx-black text-lg">R</span>
          </div>
          <span className="font-bold text-xl text-riftx-snow">Rift-<span className="text-riftx-green">X</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/tournaments" className="text-riftx-snow hover:text-riftx-green transition-colors">
            Tournaments
          </Link>
          <Link to="/dashboard" className="text-riftx-snow hover:text-riftx-green transition-colors">
            Dashboard
          </Link>
          <Link to="/teams" className="text-riftx-snow hover:text-riftx-green transition-colors">
            Teams
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/wallet" className="hover-glow">
            <Button variant="outline" className="border-riftx-green text-riftx-green">
              Connect Wallet
            </Button>
          </Link>
          <Link to="/profile/setup">
            <Button className="bg-riftx-green text-riftx-black hover:bg-riftx-green/90">
              <User className="mr-2 h-4 w-4" /> 
              Profile
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-riftx-snow p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <List size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-riftx-black/95 backdrop-blur-md border-b border-riftx-olive animate-fade-in">
          <div className="container mx-auto p-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 hover:bg-riftx-olive/20 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={20} className="text-riftx-green" />
              <span>Home</span>
            </Link>
            <Link 
              to="/tournaments" 
              className="flex items-center gap-2 p-2 hover:bg-riftx-olive/20 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <List size={20} className="text-riftx-green" />
              <span>Tournaments</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 p-2 hover:bg-riftx-olive/20 rounded-md" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={20} className="text-riftx-green" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/teams" 
              className="flex items-center gap-2 p-2 hover:bg-riftx-olive/20 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users size={20} className="text-riftx-green" />
              <span>Teams</span>
            </Link>
            <Link 
              to="/wallet" 
              className="flex items-center gap-2 p-2 hover:bg-riftx-olive/20 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-riftx-green">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M16 14h.01" />
              </svg>
              <span>Connect Wallet</span>
            </Link>
            <Link 
              to="/profile/setup" 
              className="flex items-center gap-2 p-2 hover:bg-riftx-olive/20 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={20} className="text-riftx-green" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
