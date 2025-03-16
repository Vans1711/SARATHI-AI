
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, Package, MapPin, Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock disaster data
const disasterData = [
  {
    id: 1,
    name: "Coastal Flooding",
    location: "Mumbai, India",
    type: "flood",
    severity: "high",
    affected: 15000,
    teams: 24,
    supplies: "120 tons",
    resourceAllocation: 70,
    coordinates: { x: 30, y: 50 }
  },
  {
    id: 2,
    name: "Forest Fire",
    location: "California, USA",
    type: "fire",
    severity: "medium",
    affected: 7500,
    teams: 35,
    supplies: "82 tons",
    resourceAllocation: 50,
    coordinates: { x: 65, y: 30 }
  },
  {
    id: 3,
    name: "Earthquake",
    location: "Tokyo, Japan",
    type: "earthquake",
    severity: "high",
    affected: 28000,
    teams: 47,
    supplies: "205 tons",
    resourceAllocation: 85,
    coordinates: { x: 80, y: 40 }
  },
  {
    id: 4,
    name: "Cyclone",
    location: "Chennai, India",
    type: "storm",
    severity: "critical",
    affected: 32000,
    teams: 56,
    supplies: "270 tons",
    resourceAllocation: 90,
    coordinates: { x: 35, y: 60 }
  },
  {
    id: 5,
    name: "Landslide",
    location: "Nepal",
    type: "landslide",
    severity: "medium",
    affected: 5200,
    teams: 18,
    supplies: "65 tons",
    resourceAllocation: 40,
    coordinates: { x: 40, y: 25 }
  }
];

const ResourceCard = ({ title, icon, value, total, color }: { 
  title: string; 
  icon: React.ReactNode; 
  value: number;
  total: number;
  color: string;
}) => {
  const percentage = Math.round((value / total) * 100);
  
  return (
    <div className="glass-card p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <div className={`text-${color}`}>{icon}</div>
        <h3 className="text-white font-medium">{title}</h3>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">Allocated: {value}</span>
        <span className="text-gray-400">Total: {total}</span>
      </div>
      <Progress value={percentage} className="h-2" indicatorClassName={`bg-${color}`} />
    </div>
  );
};

const DisasterCard = ({ disaster, onOptimize }: { 
  disaster: typeof disasterData[0]; 
  onOptimize: (id: number) => void;
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-neon-red';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-blue-500';
    }
  };
  
  const color = getSeverityColor(disaster.severity);
  
  return (
    <div className="glass-card p-4 border border-white/10 hover:border-neon-blue/50 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-white text-lg">{disaster.name}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPin size={14} />
            <span>{disaster.location}</span>
          </div>
        </div>
        <div className={`${color} px-2 py-1 rounded-full text-xs bg-white/5 flex items-center`}>
          <AlertTriangle size={12} className="mr-1" />
          {disaster.severity.toUpperCase()}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-white/5 rounded-md p-2">
          <span className="text-neon-cyan block text-lg font-bold">{disaster.affected.toLocaleString()}</span>
          <span className="text-gray-400 text-xs">Affected</span>
        </div>
        <div className="bg-white/5 rounded-md p-2">
          <span className="text-neon-blue block text-lg font-bold">{disaster.teams}</span>
          <span className="text-gray-400 text-xs">Teams</span>
        </div>
        <div className="bg-white/5 rounded-md p-2">
          <span className="text-neon-cyan block text-lg font-bold">{disaster.supplies}</span>
          <span className="text-gray-400 text-xs">Supplies</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Resource Allocation</span>
          <span className="text-white">{disaster.resourceAllocation}%</span>
        </div>
        <Progress value={disaster.resourceAllocation} className="h-2" />
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/10"
        onClick={() => onOptimize(disaster.id)}
      >
        <RefreshCw size={14} className="mr-1" />
        Optimize Allocation
      </Button>
    </div>
  );
};

const SmartReliefSystem = () => {
  const [disasters, setDisasters] = useState(disasterData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedId, setOptimizedId] = useState<number | null>(null);
  
  const handleOptimize = (id: number) => {
    setIsOptimizing(true);
    setOptimizedId(id);
    
    // Simulate AI optimization
    setTimeout(() => {
      setDisasters(prev => prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            teams: d.teams + 8,
            supplies: `${parseInt(d.supplies) + 25} tons`,
            resourceAllocation: Math.min(95, d.resourceAllocation + 15)
          };
        }
        return d;
      }));
      
      setIsOptimizing(false);
      setOptimizedId(null);
    }, 2000);
  };
  
  const filteredDisasters = disasters.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Smart Relief <span className="neon-text-blue">Allocation System</span>
        </h2>
        <p className="text-gray-400">
          AI-powered system that automatically distributes resources based on disaster severity and need.
        </p>
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search disasters by name, location or type..."
            className="pl-10 bg-dark-lighter border-white/10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-white/20 text-white">
          <Filter size={16} className="mr-1" />
          Filters
        </Button>
        <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white">
          Refresh Data
        </Button>
      </div>
      
      <Tabs defaultValue="disasters" className="w-full">
        <TabsList className="w-full mb-6 bg-dark-lighter">
          <TabsTrigger value="disasters" className="flex-1">Active Disasters</TabsTrigger>
          <TabsTrigger value="resources" className="flex-1">Resource Allocation</TabsTrigger>
          <TabsTrigger value="heatmap" className="flex-1">Relief Heatmap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="disasters" className="space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDisasters.map(disaster => (
              <DisasterCard 
                key={disaster.id} 
                disaster={disaster}
                onOptimize={handleOptimize}
              />
            ))}
          </div>
          
          {isOptimizing && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="glass-card p-6 max-w-md text-center">
                <RefreshCw size={48} className="text-neon-blue mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-bold text-white mb-2">AI Optimization in Progress</h3>
                <p className="text-gray-400 mb-4">
                  Our AI is analyzing current resources and reallocating them for maximum efficiency.
                </p>
                <Progress value={70} className="h-2 mb-2" />
              </div>
            </div>
          )}
          
          {filteredDisasters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No disasters match your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResourceCard
                title="Emergency Medical Teams"
                icon={<Users size={18} />}
                value={180}
                total={250}
                color="neon-blue"
              />
              <ResourceCard
                title="Relief Supplies"
                icon={<Package size={18} />}
                value={742}
                total={1000}
                color="neon-cyan"
              />
              <ResourceCard
                title="Evacuation Vehicles"
                icon={<AlertTriangle size={18} />}
                value={56}
                total={80}
                color="neon-red"
              />
            </div>
            
            <div className="glass-card p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">AI Resource Allocation Insights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="text-neon-blue mt-0.5"><AlertTriangle size={16} /></div>
                  <span className="text-gray-300">Chennai Cyclone requires additional 15 medical teams for optimal coverage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-neon-blue mt-0.5"><AlertTriangle size={16} /></div>
                  <span className="text-gray-300">Tokyo Earthquake area has excess food supplies but needs more shelter kits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-neon-blue mt-0.5"><AlertTriangle size={16} /></div>
                  <span className="text-gray-300">Mumbai flooding requires reallocation of evacuation vehicles from less affected areas.</span>
                </li>
              </ul>
              
              <Button className="w-full mt-4 bg-neon-blue hover:bg-neon-blue/90 text-white">
                Apply AI Recommendations
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="heatmap">
          <div className="glass-card bg-dark-lighter rounded-lg overflow-hidden border border-white/10">
            <div className="relative w-full" style={{ height: "500px" }}>
              <div className="absolute inset-0">
                <img 
                  src="https://i.imgur.com/9Td9ykj.png" 
                  alt="Relief Heatmap" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              
              <div className="absolute bottom-4 left-4 glass-card p-3 z-10 text-xs">
                <h4 className="text-white font-medium mb-2">Resource Density</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-300">Critical Shortage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-gray-300">Insufficient</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-gray-300">Adequate</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-300">Optimal</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 glass-card p-3 z-10">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="text-xs border-white/20 text-white">
                    Teams View
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs border-white/20 text-white">
                    Supplies View
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs border-neon-blue text-neon-blue">
                    Combined View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartReliefSystem;
