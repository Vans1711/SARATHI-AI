
import React from 'react';
import { MapPin, AlertTriangle, Users, Package } from 'lucide-react';

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
    coordinates: { x: 40, y: 25 }
  }
];

interface DisasterMarkerProps {
  disaster: typeof disasterData[0];
  isSelected: boolean;
  onClick: () => void;
}

const DisasterMarker: React.FC<DisasterMarkerProps> = ({ disaster, isSelected, onClick }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20';
      default: return 'text-blue-500 bg-blue-500/20';
    }
  };
  
  const color = getSeverityColor(disaster.severity);
  
  return (
    <div 
      className={`absolute cursor-pointer transition-all duration-300 ${isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'}`}
      style={{ left: `${disaster.coordinates.x}%`, top: `${disaster.coordinates.y}%` }}
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center border-2 border-white/30 animate-pulse`}>
        <MapPin size={20} className={`${isSelected ? 'text-white' : color.split(' ')[0]}`} />
      </div>
      {isSelected && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-60 glass-card p-3 animate-fade-in">
          <h4 className="font-semibold text-white">{disaster.name}</h4>
          <p className="text-sm text-gray-300">{disaster.location}</p>
          
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="flex flex-col items-center">
              <Users size={14} className="text-gray-400" />
              <span className="text-xs text-white mt-1">{disaster.affected.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400">Affected</span>
            </div>
            <div className="flex flex-col items-center">
              <Users size={14} className="text-gray-400" />
              <span className="text-xs text-white mt-1">{disaster.teams}</span>
              <span className="text-[10px] text-gray-400">Teams</span>
            </div>
            <div className="flex flex-col items-center">
              <Package size={14} className="text-gray-400" />
              <span className="text-xs text-white mt-1">{disaster.supplies}</span>
              <span className="text-[10px] text-gray-400">Supplies</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DisasterMap = () => {
  const [selectedDisaster, setSelectedDisaster] = React.useState<number | null>(null);
  
  const handleMarkerClick = (id: number) => {
    setSelectedDisaster(prev => prev === id ? null : id);
  };
  
  return (
    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden glass-card border border-white/10">
      {/* Map Background - In production this would be a real map */}
      <div className="absolute inset-0 bg-dark-lighter">
        {/* Map Grid Lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(76, 201, 240, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(76, 201, 240, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Map Glow */}
        <div className="absolute left-1/4 top-1/3 w-1/2 h-1/3 rounded-full bg-neon-blue opacity-5 blur-3xl"></div>
      </div>
      
      {/* Map Legend */}
      <div className="absolute top-4 left-4 glass-card p-3 z-10 text-xs">
        <h4 className="text-white font-medium mb-2">Severity</h4>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-gray-300">Critical</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-gray-300">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-gray-300">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-300">Low</span>
          </div>
        </div>
      </div>
      
      {/* Disaster Markers */}
      {disasterData.map(disaster => (
        <DisasterMarker 
          key={disaster.id}
          disaster={disaster}
          isSelected={selectedDisaster === disaster.id}
          onClick={() => handleMarkerClick(disaster.id)}
        />
      ))}
      
      {/* Active Alerts Notice */}
      <div className="absolute bottom-4 right-4 glass-card p-3 flex items-center gap-2 z-10">
        <AlertTriangle size={16} className="text-neon-red" />
        <span className="text-white text-sm">5 Active Disasters</span>
      </div>
    </div>
  );
};

export default DisasterMap;
