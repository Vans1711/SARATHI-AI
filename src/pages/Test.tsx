import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Info, MapPin, Users, Heart } from 'lucide-react';

const Test = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-[#4CC9F0]">Test Page</h1>
      <p className="text-xl mb-8 max-w-md text-center">
        If you can see this page, the routing is working correctly!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
        <Link to="/">
          <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center gap-2">
            <Home size={18} />
            Home
          </Button>
        </Link>
        
        <Link to="/about">
          <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center gap-2">
            <Info size={18} />
            About
          </Button>
        </Link>
        
        <Link to="/relief-map">
          <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center gap-2">
            <MapPin size={18} />
            Relief Map
          </Button>
        </Link>
        
        <Link to="/volunteer">
          <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center gap-2">
            <Users size={18} />
            Volunteer
          </Button>
        </Link>
        
        <Link to="/donate">
          <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center gap-2">
            <Heart size={18} />
            Donate
          </Button>
        </Link>
      </div>
      
      <div className="mt-12 p-6 bg-gray-800 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Debug Information</h2>
        <ul className="space-y-2">
          <li><strong>Current URL:</strong> {window.location.href}</li>
          <li><strong>React Version:</strong> {React.version}</li>
          <li><strong>Time:</strong> {new Date().toLocaleTimeString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default Test; 