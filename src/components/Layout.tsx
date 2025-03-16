import React from 'react';
import NavBar from './NavBar';
import { Facebook, Twitter, Instagram, Mail, Heart, MapPin, Phone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-12 border-t border-white/10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4CC9F0] to-[#08D9D6] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-white font-bold text-xl">
                  <span className="text-[#4CC9F0]">SARATHI</span> AI
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                An AI-powered disaster relief coordination platform designed to save lives and optimize resource allocation during emergencies.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">
                  <Globe size={18} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">About</Link>
                </li>
                <li>
                  <Link to="/relief-map" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Relief Map</Link>
                </li>
                <li>
                  <Link to="/volunteer" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Volunteer</Link>
                </li>
                <li>
                  <Link to="/donate" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Donate</Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Emergency Guide</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Disaster Preparedness</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Relief Protocols</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">Training Materials</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-[#4CC9F0] transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="text-[#4CC9F0] mt-0.5" />
                  <span className="text-muted-foreground">123 Relief Center, New Delhi, India</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={18} className="text-[#4CC9F0] mt-0.5" />
                  <span className="text-muted-foreground">contact@sarathiai.org</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={18} className="text-[#4CC9F0] mt-0.5" />
                  <span className="text-muted-foreground">+91 1234567890</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 Sarathi AI. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
              <div className="flex items-center text-sm text-muted-foreground">
                Made with <Heart size={14} className="mx-1 text-[#FF2E63]" /> in India
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 