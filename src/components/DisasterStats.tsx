
import React, { useState, useEffect } from 'react';
import { Activity, Users, Package, TrendingUp } from 'lucide-react';

// Mock data for the disaster statistics
const mockData = {
  activeDisasters: 12,
  affectedPeople: 32450,
  reliefTeams: 156,
  suppliesDeployed: "438 tons"
};

const StatCard = ({ icon, label, value, change }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
  change?: string;
}) => {
  return (
    <div className="glass-card p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-neon-blue">{icon}</div>
        <h3 className="text-gray-400 text-sm">{label}</h3>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-white font-bold text-2xl">{value}</p>
        {change && (
          <div className="flex items-center text-xs text-green-400">
            <TrendingUp size={12} className="mr-1" /> 
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

const DisasterStats = () => {
  const [stats, setStats] = useState(mockData);
  
  // Simulate real-time data updates
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeDisasters: prev.activeDisasters + (Math.random() > 0.8 ? 1 : 0),
        affectedPeople: prev.affectedPeople + Math.floor(Math.random() * 100),
        reliefTeams: prev.reliefTeams + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Activity size={18} />} 
          label="Active Disasters" 
          value={stats.activeDisasters}
          change="+2 today"
        />
        
        <StatCard 
          icon={<Users size={18} />} 
          label="People Affected" 
          value={stats.affectedPeople.toLocaleString()}
        />
        
        <StatCard 
          icon={<Users size={18} />} 
          label="Relief Teams" 
          value={stats.reliefTeams}
          change="+12 today"
        />
        
        <StatCard 
          icon={<Package size={18} />} 
          label="Supplies Deployed" 
          value={stats.suppliesDeployed}
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          <span className="inline-flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            Live data - Last updated: Just now
          </span>
        </p>
      </div>
    </div>
  );
};

export default DisasterStats;
