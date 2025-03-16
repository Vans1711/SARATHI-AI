import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Ambulance, 
  ArrowRight, 
  Clock, 
  Droplets, 
  Filter, 
  Home, 
  Layers, 
  LifeBuoy, 
  MapPin, 
  Truck, 
  Users, 
  Warehouse,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  RotateCcw,
  X,
  CheckCircle2
} from 'lucide-react';

const ReliefMap = () => {
  const [mapView, setMapView] = useState<string>('heatmap');
  const [disasterType, setDisasterType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<number[]>([0, 100]);
  const [showTeams, setShowTeams] = useState<boolean>(true);
  const [showResources, setShowResources] = useState<boolean>(true);
  const [showVictims, setShowVictims] = useState<boolean>(true);
  const [mapZoom, setMapZoom] = useState<number>(1);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Mock data for the map
  const disasterStats = {
    activeDisasters: 8,
    affectedAreas: 42,
    rescueTeams: 156,
    resourceCenters: 28
  };
  
  const resourceTypes = [
    { name: 'Medical Supplies', count: 24, icon: <Ambulance size={16} className="text-neon-red" /> },
    { name: 'Food & Water', count: 36, icon: <Droplets size={16} className="text-neon-blue" /> },
    { name: 'Shelter Kits', count: 18, icon: <Home size={16} className="text-neon-cyan" /> },
    { name: 'Rescue Equipment', count: 12, icon: <LifeBuoy size={16} className="text-neon-red" /> }
  ];
  
  const teamTypes = [
    { name: 'Medical Teams', count: 42, icon: <Ambulance size={16} className="text-neon-red" /> },
    { name: 'Rescue Teams', count: 38, icon: <LifeBuoy size={16} className="text-neon-cyan" /> },
    { name: 'Supply Teams', count: 27, icon: <Truck size={16} className="text-neon-blue" /> },
    { name: 'Volunteer Groups', count: 49, icon: <Users size={16} className="text-neon-green" /> }
  ];
  
  // Mock disaster locations
  const disasterLocations = [
    { id: 1, name: 'Flood Zone Alpha', type: 'flood', lat: 28.6139, lng: 77.2090, severity: 'high', affectedPeople: 5000 },
    { id: 2, name: 'Earthquake Site Beta', type: 'earthquake', lat: 19.0760, lng: 72.8777, severity: 'critical', affectedPeople: 12000 },
    { id: 3, name: 'Cyclone Path Delta', type: 'cyclone', lat: 22.5726, lng: 88.3639, severity: 'medium', affectedPeople: 8000 },
    { id: 4, name: 'Landslide Area Gamma', type: 'landslide', lat: 30.7333, lng: 76.7794, severity: 'high', affectedPeople: 2000 },
    { id: 5, name: 'Wildfire Zone Epsilon', type: 'fire', lat: 26.9124, lng: 75.7873, severity: 'medium', affectedPeople: 1500 },
  ];

  // Map zoom controls
  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setMapZoom(1);
  };

  // Interactive map markers
  const renderMapMarkers = () => {
    return disasterLocations.map(location => {
      // Calculate position based on lat/lng (simplified for demo)
      const left = ((location.lng + 180) / 360) * 100;
      const top = ((90 - location.lat) / 180) * 100;
      
      let markerColor = 'bg-yellow-500';
      if (location.severity === 'high') markerColor = 'bg-orange-500';
      if (location.severity === 'critical') markerColor = 'bg-red-500';
      
      return (
        <div 
          key={location.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ 
            left: `${left}%`, 
            top: `${top}%`,
          }}
        >
          <div className={`w-4 h-4 rounded-full ${markerColor} animate-pulse relative`}>
            <div className={`absolute inset-0 ${markerColor} rounded-full animate-ping opacity-75`}></div>
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-background/90 backdrop-blur-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            <p className="font-semibold text-sm">{location.name}</p>
            <p className="text-xs text-muted-foreground">Type: {location.type}</p>
            <p className="text-xs text-muted-foreground">Affected: {location.affectedPeople.toLocaleString()}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Relief <span className="neon-text-blue">Map</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Real-time visualization of disaster zones, relief teams, and resource distribution.
            </p>
          </div>
        </div>
      </section>
      
      {/* Map Controls */}
      <section className="pb-8 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <Label htmlFor="disaster-type" className="mb-2 block">Disaster Type</Label>
                  <Select value={disasterType} onValueChange={setDisasterType}>
                    <SelectTrigger id="disaster-type" className="w-[180px]">
                      <SelectValue placeholder="All Disasters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Disasters</SelectItem>
                      <SelectItem value="flood">Floods</SelectItem>
                      <SelectItem value="earthquake">Earthquakes</SelectItem>
                      <SelectItem value="cyclone">Cyclones</SelectItem>
                      <SelectItem value="fire">Wildfires</SelectItem>
                      <SelectItem value="landslide">Landslides</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="min-w-[200px]">
                  <Label className="mb-2 block">Time Range</Label>
                  <Slider
                    value={timeRange}
                    onValueChange={setTimeRange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>24h ago</span>
                    <span>Now</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Switch id="show-teams" checked={showTeams} onCheckedChange={setShowTeams} />
                  <Label htmlFor="show-teams" className="cursor-pointer">Teams</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="show-resources" checked={showResources} onCheckedChange={setShowResources} />
                  <Label htmlFor="show-resources" className="cursor-pointer">Resources</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="show-victims" checked={showVictims} onCheckedChange={setShowVictims} />
                  <Label htmlFor="show-victims" className="cursor-pointer">Affected Areas</Label>
                </div>
              </div>
            </div>
            
            <Tabs value={mapView} onValueChange={setMapView} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
                <TabsTrigger value="terrain">Terrain</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Stats Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-neon-red" />
                  Disaster Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Disasters</span>
                    <Badge variant="outline" className="bg-background/50">{disasterStats.activeDisasters}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Affected Areas</span>
                    <Badge variant="outline" className="bg-background/50">{disasterStats.affectedAreas}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rescue Teams</span>
                    <Badge variant="outline" className="bg-background/50">{disasterStats.rescueTeams}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Resource Centers</span>
                    <Badge variant="outline" className="bg-background/50">{disasterStats.resourceCenters}</Badge>
                  </div>
                </div>
              </div>
              
              {showResources && (
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Warehouse className="mr-2 h-5 w-5 text-neon-blue" />
                    Resources
                  </h3>
                  <div className="space-y-3">
                    {resourceTypes.map((resource, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          {resource.icon}
                          <span className="ml-2 text-muted-foreground">{resource.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-background/50">{resource.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {showTeams && (
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-neon-cyan" />
                    Teams
                  </h3>
                  <div className="space-y-3">
                    {teamTypes.map((team, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          {team.icon}
                          <span className="ml-2 text-muted-foreground">{team.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-background/50">{team.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Map */}
            <div className="lg:col-span-3">
              <div className="glass-card p-4 rounded-xl h-[600px] relative overflow-hidden">
                {/* Map Container */}
                <div 
                  ref={mapContainerRef}
                  className="w-full h-full relative overflow-hidden rounded-lg bg-dark-lighter"
                  style={{ transform: `scale(${mapZoom})`, transition: 'transform 0.3s ease' }}
                >
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-90">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7774183.274272995!2d73.73197974999999!3d20.593684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1699887309729!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  
                  {/* Map Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30 pointer-events-none"></div>
                  
                  {/* Disaster Markers */}
                  {showVictims && renderMapMarkers()}
                  
                  {/* Heatmap Overlay (conditional based on mapView) */}
                  {mapView === 'heatmap' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-orange-500/20 to-yellow-500/30 mix-blend-screen opacity-40 pointer-events-none"></div>
                  )}
                </div>
                
                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-background/80 backdrop-blur-sm hover:bg-background/90 w-8 h-8"
                    onClick={handleZoomIn}
                  >
                    <ZoomIn size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-background/80 backdrop-blur-sm hover:bg-background/90 w-8 h-8"
                    onClick={handleZoomOut}
                  >
                    <ZoomOut size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-background/80 backdrop-blur-sm hover:bg-background/90 w-8 h-8"
                    onClick={handleResetZoom}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Medium Severity</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>High Severity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Critical Severity</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-2" />
                  Last updated: 5 minutes ago
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm"
                  onClick={() => document.getElementById('detailed-report-modal')?.classList.remove('hidden')}
                >
                  View Detailed Report <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Report Modal */}
      <div id="detailed-report-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div className="bg-background border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
          <div className="sticky top-0 bg-background p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Detailed Disaster Report</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => document.getElementById('detailed-report-modal')?.classList.add('hidden')}
            >
              <X size={20} />
            </Button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-neon-red" />
                  Active Disasters
                </h3>
                <div className="space-y-3">
                  {disasterLocations.map((location, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          location.severity === 'critical' ? 'bg-red-500' : 
                          location.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        } mr-2`}></div>
                        <span>{location.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-background/50">{location.affectedPeople.toLocaleString()}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-neon-blue" />
                  Rescue Operations
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Teams Deployed</span>
                    <Badge variant="outline" className="bg-background/50">156</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">People Rescued</span>
                    <Badge variant="outline" className="bg-background/50">4,328</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Medical Aid Provided</span>
                    <Badge variant="outline" className="bg-background/50">2,156</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ongoing Operations</span>
                    <Badge variant="outline" className="bg-background/50">23</Badge>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-neon-cyan" />
                  Resource Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Food Packets</span>
                    <Badge variant="outline" className="bg-background/50">12,500</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Water (Liters)</span>
                    <Badge variant="outline" className="bg-background/50">45,000</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Medical Supplies</span>
                    <Badge variant="outline" className="bg-background/50">3,200</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Shelter Kits</span>
                    <Badge variant="outline" className="bg-background/50">1,850</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Affected Areas by Severity</h3>
                <div className="h-[200px] flex items-end justify-around">
                  <div className="flex flex-col items-center">
                    <div className="h-[120px] w-16 bg-yellow-500/70 rounded-t-md"></div>
                    <div className="mt-2 text-sm">Medium</div>
                    <div className="text-xs text-muted-foreground">12 areas</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-[160px] w-16 bg-orange-500/70 rounded-t-md"></div>
                    <div className="mt-2 text-sm">High</div>
                    <div className="text-xs text-muted-foreground">18 areas</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-[80px] w-16 bg-red-500/70 rounded-t-md"></div>
                    <div className="mt-2 text-sm">Critical</div>
                    <div className="text-xs text-muted-foreground">8 areas</div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Food & Water</span>
                      <span className="text-xs text-muted-foreground">40%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-blue rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Medical Supplies</span>
                      <span className="text-xs text-muted-foreground">25%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-red rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Shelter & Clothing</span>
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-green rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Rescue Equipment</span>
                      <span className="text-xs text-muted-foreground">15%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-cyan rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mt-1">
                    <CheckCircle2 className="h-4 w-4 text-neon-blue" />
                  </div>
                  <div>
                    <div className="font-medium">Relief camp established in Wayanad district</div>
                    <div className="text-sm text-muted-foreground mt-1">Capacity for 500 people with medical facilities</div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" /> 2 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-red/20 flex items-center justify-center mt-1">
                    <AlertTriangle className="h-4 w-4 text-neon-red" />
                  </div>
                  <div>
                    <div className="font-medium">Flash flood warning issued for Uttarakhand region</div>
                    <div className="text-sm text-muted-foreground mt-1">Evacuation orders in place for 12 villages</div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" /> 5 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center mt-1">
                    <Truck className="h-4 w-4 text-neon-green" />
                  </div>
                  <div>
                    <div className="font-medium">10 tons of supplies airlifted to Sundarbans</div>
                    <div className="text-sm text-muted-foreground mt-1">Including food, water, and medical supplies</div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" /> 8 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white">
                Download Full Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReliefMap; 