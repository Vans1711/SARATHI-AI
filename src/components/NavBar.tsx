import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, AlertCircle, Activity, Users, MapPin, Heart, LifeBuoy, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    { name: 'About', href: '/about', icon: <AlertCircle size={18} /> },
    { name: 'Relief Map', href: '/relief-map', icon: <MapPin size={18} /> },
    { name: 'Volunteer', href: '/volunteer', icon: <Users size={18} /> },
    { name: 'Volunteer Dashboard', href: '/volunteer-dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Donate', href: '/donate', icon: <Heart size={18} /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled 
          ? 'py-2 bg-background/90 backdrop-blur-lg shadow-lg' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4CC9F0] to-[#08D9D6] flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl hidden sm:block">
            <span className="text-[#4CC9F0]">SARATHI</span> AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {link.icon}
              <span>{link.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4CC9F0] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/volunteer">
            <Button 
              variant="outline" 
              className="border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0]/10 transition-all duration-300"
            >
              <Users className="mr-2 h-4 w-4" />
              Volunteer
            </Button>
          </Link>
          <Link to="/emergency">
            <Button 
              className="bg-[#FF2E63] hover:bg-[#FF2E63]/90 text-white animate-pulse transition-all duration-300"
            >
              SOS
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors duration-200" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md z-40 p-4 flex flex-col animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-3 rounded-lg hover:bg-foreground/5 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span className="text-lg">{link.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/volunteer" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0]/10 w-full transition-all duration-300"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Volunteer
                </Button>
              </Link>
              <Link to="/emergency" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  className="bg-[#FF2E63] hover:bg-[#FF2E63]/90 text-white animate-pulse w-full transition-all duration-300"
                >
                  SOS
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
