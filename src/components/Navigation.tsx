import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  AlertTriangle, 
  Activity, 
  Users, 
  MapPin, 
  Heart, 
  HelpCircle,
  Info,
  LogIn
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Activity size={18} /> },
    { name: 'About', href: '/about', icon: <Info size={18} /> },
    { name: 'Volunteer', href: '/volunteer', icon: <Users size={18} /> },
    { name: 'Relief Map', href: '/relief-map', icon: <MapPin size={18} /> },
    { name: 'Donate', href: '/donate', icon: <Heart size={18} /> },
  ];

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled ? 'py-2 bg-gray-900/90 backdrop-blur-lg' : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl hidden sm:block">
            <span className="text-blue-400">SARATHI</span> AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center gap-1.5 text-gray-400 hover:text-white transition-all duration-300 relative group",
                isLinkActive(link.href) && "text-blue-400 font-medium"
              )}
            >
              <div className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full",
                isLinkActive(link.href) && "w-full"
              )} />
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              <LogIn size={16} className="mr-1" />
              Login
            </Button>
          </Link>
          <Link to="/emergency">
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white animate-pulse"
            >
              <AlertTriangle size={16} className="mr-1" />
              SOS Emergency
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-400 hover:text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-md z-40 p-4 flex flex-col">
            <div className="flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300",
                    isLinkActive(link.href) 
                      ? "text-blue-400 bg-gray-800/50 border-l-2 border-blue-400" 
                      : "text-gray-300"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span className="text-lg">{link.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10"
                >
                  <LogIn size={16} className="mr-1" />
                  Login
                </Button>
              </Link>
              <Link to="/emergency" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <AlertTriangle size={16} className="mr-1" />
                  SOS Emergency
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
