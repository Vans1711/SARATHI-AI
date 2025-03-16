
import React from 'react';
import NavBar from '@/components/NavBar';
import HelpRequestForm from '@/components/HelpRequestForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Emergency = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <NavBar />
      
      <div className="container mx-auto pt-32 pb-16 px-4">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-white gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 neon-text-red">
              Emergency Assistance
            </h1>
            <p className="text-gray-400">
              Please provide the details below for immediate help. Our system will prioritize your request based on urgency and location.
            </p>
          </div>
          
          <div className="glass-card p-6 border border-neon-red/30">
            <HelpRequestForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
