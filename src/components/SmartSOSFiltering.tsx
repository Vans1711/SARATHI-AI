import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Brain, 
  CheckCircle2, 
  Clock, 
  Filter, 
  MessageSquare, 
  Phone, 
  Search, 
  Shield, 
  Smartphone, 
  Twitter, 
  XCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SmartSOSFiltering = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // Mock data for incoming alerts
  const incomingAlerts = [
    {
      id: 1,
      source: 'twitter',
      message: 'Urgent! Flooding in Kurla East area. Multiple families trapped on rooftops. Need immediate rescue. #MumbaiFloods',
      location: 'Kurla East, Mumbai',
      timestamp: '10 minutes ago',
      status: 'pending',
      confidence: null,
      duplicateOf: null
    },
    {
      id: 2,
      source: 'whatsapp',
      message: 'Building collapsed at Sion Circle. At least 5 people trapped under debris. Need urgent help!',
      location: 'Sion, Mumbai',
      timestamp: '15 minutes ago',
      status: 'pending',
      confidence: null,
      duplicateOf: null
    },
    {
      id: 3,
      source: 'sms',
      message: 'HELP FLOOD. Water level rising rapidly in Dharavi. Family of 6 stranded.',
      location: 'Dharavi, Mumbai',
      timestamp: '22 minutes ago',
      status: 'pending',
      confidence: null,
      duplicateOf: null
    },
    {
      id: 4,
      source: 'twitter',
      message: 'Urgent help needed! Flooding in Kurla area with families trapped on rooftops! #MumbaiRains',
      location: 'Kurla, Mumbai',
      timestamp: '25 minutes ago',
      status: 'pending',
      confidence: null,
      duplicateOf: null
    },
    {
      id: 5,
      source: 'whatsapp',
      message: 'Road completely blocked at Andheri subway due to waterlogging. Cars stranded.',
      location: 'Andheri, Mumbai',
      timestamp: '30 minutes ago',
      status: 'pending',
      confidence: null,
      duplicateOf: null
    }
  ];
  
  // Mock data for verified alerts
  const verifiedAlerts = [
    {
      id: 101,
      source: 'twitter',
      message: 'Multiple families trapped in Chembur due to landslide. Need immediate evacuation.',
      location: 'Chembur, Mumbai',
      timestamp: '45 minutes ago',
      status: 'verified',
      confidence: 98,
      priority: 'high'
    },
    {
      id: 102,
      source: 'whatsapp',
      message: 'Medical emergency at Goregaon shelter. Elderly person needs oxygen support urgently.',
      location: 'Goregaon, Mumbai',
      timestamp: '1 hour ago',
      status: 'verified',
      confidence: 95,
      priority: 'high'
    },
    {
      id: 103,
      source: 'sms',
      message: 'HELP FLOOD. Water entered ground floor of Sai Krupa building. 20+ residents moved to terrace.',
      location: 'Santacruz, Mumbai',
      timestamp: '1.5 hours ago',
      status: 'verified',
      confidence: 92,
      priority: 'medium'
    }
  ];
  
  // Mock data for rejected alerts
  const rejectedAlerts = [
    {
      id: 201,
      source: 'twitter',
      message: 'Aliens have landed in Mumbai and are causing the floods! Government hiding the truth! #ConspiracyAlert',
      location: 'Unknown',
      timestamp: '2 hours ago',
      status: 'fake',
      confidence: 99,
      reason: 'Misinformation'
    },
    {
      id: 202,
      source: 'whatsapp',
      message: 'Urgent! Flooding in Kurla East area. Multiple families trapped on rooftops. Need immediate rescue.',
      location: 'Kurla East, Mumbai',
      timestamp: '2.5 hours ago',
      status: 'duplicate',
      confidence: 97,
      duplicateOf: 1,
      reason: 'Duplicate of alert #1'
    }
  ];
  
  // Function to simulate AI analysis
  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  // Function to get source icon
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'twitter':
        return <Twitter size={16} className="text-neon-blue" />;
      case 'whatsapp':
        return <MessageSquare size={16} className="text-green-500" />;
      case 'sms':
        return <Smartphone size={16} className="text-neon-cyan" />;
      default:
        return <MessageSquare size={16} />;
    }
  };
  
  // Function to get status badge
  const getStatusBadge = (status: string, priority?: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge variant={
            priority === 'high' ? 'danger' : 
            priority === 'medium' ? 'warning' : 
            'info'
          }>
            <CheckCircle2 size={12} className="mr-1" /> Verified
          </Badge>
        );
      case 'fake':
        return (
          <Badge variant="danger">
            <XCircle size={12} className="mr-1" /> Fake
          </Badge>
        );
      case 'duplicate':
        return (
          <Badge variant="warning">
            <Filter size={12} className="mr-1" /> Duplicate
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock size={12} className="mr-1" /> Pending
          </Badge>
        );
    }
  };
  
  // Filter alerts based on search query and filter type
  const filteredIncoming = incomingAlerts.filter(alert => 
    alert.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterType === 'all' || alert.source === filterType)
  );
  
  const filteredVerified = verifiedAlerts.filter(alert => 
    alert.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterType === 'all' || alert.source === filterType)
  );
  
  const filteredRejected = rejectedAlerts.filter(alert => 
    alert.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterType === 'all' || alert.source === filterType)
  );

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Brain className="mr-2 h-6 w-6 text-neon-blue" /> 
          Smart SOS Filtering System
        </h2>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="bg-neon-blue hover:bg-neon-blue/90 text-white"
          >
            <Brain className="mr-2 h-4 w-4" /> 
            Run AI Analysis
          </Button>
        </div>
      </div>
      
      {isAnalyzing && (
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span>Analyzing SOS messages with NLP...</span>
            <span>{analysisProgress}%</span>
          </div>
          <Progress value={analysisProgress} className="h-2" />
          <div className="mt-2 text-xs text-gray-400 flex flex-wrap gap-2">
            <span className="flex items-center">
              <Shield className="mr-1 h-3 w-3" /> Detecting fake alerts
            </span>
            <span className="flex items-center">
              <Filter className="mr-1 h-3 w-3" /> Identifying duplicates
            </span>
            <span className="flex items-center">
              <Search className="mr-1 h-3 w-3" /> Extracting location data
            </span>
            <span className="flex items-center">
              <AlertTriangle className="mr-1 h-3 w-3" /> Prioritizing emergencies
            </span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dark-lighter border-white/10 text-white"
            />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-dark-lighter border-white/10 text-white">
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="incoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="incoming" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
            Incoming ({filteredIncoming.length})
          </TabsTrigger>
          <TabsTrigger value="verified" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
            Verified ({filteredVerified.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-neon-blue data-[state=active]:text-white">
            Rejected ({filteredRejected.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="incoming" className="space-y-4">
          {filteredIncoming.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No incoming alerts match your search criteria
            </div>
          ) : (
            filteredIncoming.map(alert => (
              <div key={alert.id} className="bg-dark-lighter rounded-lg p-4 hover:bg-dark-lighter/80 transition-colors">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(alert.source)}
                    <span className="text-sm text-gray-400 capitalize">{alert.source}</span>
                    <span className="text-xs text-gray-500">#{alert.id}</span>
                  </div>
                  {getStatusBadge(alert.status)}
                </div>
                
                <p className="mb-2">{alert.message}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{alert.location}</span>
                  <span className="text-gray-500">{alert.timestamp}</span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                    <CheckCircle2 size={14} className="mr-1" /> Verify
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                    <Filter size={14} className="mr-1" /> Mark as Duplicate
                  </Button>
                  <Button size="sm" variant="outline" className="border-neon-red text-neon-red hover:bg-neon-red/10">
                    <XCircle size={14} className="mr-1" /> Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="verified" className="space-y-4">
          {filteredVerified.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No verified alerts match your search criteria
            </div>
          ) : (
            filteredVerified.map(alert => (
              <div key={alert.id} className="bg-dark-lighter rounded-lg p-4 hover:bg-dark-lighter/80 transition-colors">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(alert.source)}
                    <span className="text-sm text-gray-400 capitalize">{alert.source}</span>
                    <span className="text-xs text-gray-500">#{alert.id}</span>
                  </div>
                  {getStatusBadge(alert.status, alert.priority)}
                </div>
                
                <p className="mb-2">{alert.message}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{alert.location}</span>
                  <span className="text-gray-500">{alert.timestamp}</span>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">AI Confidence:</span>
                    <div className="w-24 bg-dark rounded-full h-2">
                      <div 
                        className="bg-neon-blue h-2 rounded-full" 
                        style={{ width: `${alert.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-neon-blue">{alert.confidence}%</span>
                  </div>
                  
                  <Button size="sm" className="bg-neon-blue hover:bg-neon-blue/90 text-white">
                    <Phone size={14} className="mr-1" /> Dispatch Team
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {filteredRejected.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No rejected alerts match your search criteria
            </div>
          ) : (
            filteredRejected.map(alert => (
              <div key={alert.id} className="bg-dark-lighter rounded-lg p-4 hover:bg-dark-lighter/80 transition-colors">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(alert.source)}
                    <span className="text-sm text-gray-400 capitalize">{alert.source}</span>
                    <span className="text-xs text-gray-500">#{alert.id}</span>
                  </div>
                  {getStatusBadge(alert.status)}
                </div>
                
                <p className="mb-2">{alert.message}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{alert.location}</span>
                  <span className="text-gray-500">{alert.timestamp}</span>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">AI Confidence:</span>
                    <div className="w-24 bg-dark rounded-full h-2">
                      <div 
                        className="bg-neon-red h-2 rounded-full" 
                        style={{ width: `${alert.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-neon-red">{alert.confidence}%</span>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    <span>Reason: {alert.reason}</span>
                    {alert.duplicateOf && (
                      <span className="ml-2 text-neon-blue">
                        (Ref: #{alert.duplicateOf})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartSOSFiltering; 