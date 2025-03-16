
import React, { useState } from 'react';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  Image, 
  MessageSquareText,
  RefreshCw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock help requests data
const mockRequests = [
  {
    id: 1,
    source: "Twitter",
    text: "Building collapsed on Main St & 5th Ave. At least 10 people trapped inside. Please send help! #earthquake #emergency",
    timestamp: "10 mins ago",
    status: "verified",
    confidence: 92,
    priority: "high",
    location: "Main St & 5th Ave, Los Angeles"
  },
  {
    id: 2,
    source: "WhatsApp",
    text: "Flood water is rising rapidly in our neighborhood. Families stranded on rooftops. Need boats urgently.",
    timestamp: "25 mins ago",
    status: "verified",
    confidence: 89,
    priority: "critical",
    location: "Riverside District, Chennai, India"
  },
  {
    id: 3,
    source: "SMS",
    text: "Fire spreading through forest near residential area. Strong winds pushing it toward houses.",
    timestamp: "42 mins ago",
    status: "verified",
    confidence: 95,
    priority: "high",
    location: "Northern Hills, California"
  },
  {
    id: 4,
    source: "Twitter",
    text: "OMG! Did you see that giant lizard attacking the city?! #godzilla #emergency",
    timestamp: "55 mins ago",
    status: "fake",
    confidence: 98,
    priority: "none",
    location: "Unknown"
  },
  {
    id: 5,
    source: "Facebook",
    text: "Hospital generator failed. Multiple patients on life support need immediate power backup.",
    timestamp: "1 hour ago",
    status: "verified",
    confidence: 97,
    priority: "critical",
    location: "Memorial Hospital, Miami"
  },
  {
    id: 6,
    source: "WhatsApp",
    text: "Emergency shelter at Central High School is at capacity. Need additional space for evacuees.",
    timestamp: "1.5 hours ago",
    status: "verified",
    confidence: 87,
    priority: "medium",
    location: "Downtown District, Houston"
  },
  {
    id: 7,
    source: "SMS",
    text: "Tornado just passed through. Multiple homes destroyed. People missing.",
    timestamp: "2 hours ago",
    status: "verified",
    confidence: 94,
    priority: "critical",
    location: "Eastern County, Oklahoma"
  }
];

const RequestAnalysisCard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  return (
    <div className="glass-card p-4 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <MessageSquare size={18} className="text-neon-blue" />
        AI Message Analysis
      </h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">NLP Classification</span>
          <span className="text-neon-cyan">Advanced</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Image Recognition</span>
          <span className="text-neon-cyan">Enabled</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Location Extraction</span>
          <span className="text-neon-cyan">Precise</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Fake Alert Detection</span>
          <span className="text-neon-cyan">98.5% Accuracy</span>
        </div>
      </div>
      
      {isAnalyzing ? (
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white">Analyzing social media feeds...</span>
            <span className="text-neon-blue">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-400">
            AI is scanning Twitter, Facebook, WhatsApp and SMS messages for emergency signals
          </p>
        </div>
      ) : (
        <Button 
          className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white"
          onClick={startAnalysis}
        >
          <RefreshCw size={16} className="mr-1" />
          Run AI Analysis
        </Button>
      )}
    </div>
  );
};

const SOSMessage = ({ request }: { request: typeof mockRequests[0] }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'verified':
        return {
          icon: <CheckCircle2 size={16} className="text-green-500" />,
          className: "text-green-500 bg-green-500/10"
        };
      case 'fake':
        return {
          icon: <XCircle size={16} className="text-red-500" />,
          className: "text-red-500 bg-red-500/10"
        };
      case 'duplicate':
        return {
          icon: <AlertTriangle size={16} className="text-yellow-500" />,
          className: "text-yellow-500 bg-yellow-500/10"
        };
      default:
        return {
          icon: <RefreshCw size={16} className="text-gray-400" />,
          className: "text-gray-400 bg-gray-400/10"
        };
    }
  };
  
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'critical':
        return "bg-neon-red text-white";
      case 'high':
        return "bg-orange-500 text-white";
      case 'medium':
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };
  
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Twitter':
        return <MessageCircle size={16} className="text-neon-blue" />;
      case 'WhatsApp':
        return <MessageSquare size={16} className="text-green-500" />;
      case 'SMS':
        return <MessageSquareText size={16} className="text-neon-cyan" />;
      case 'Facebook':
        return <MessageSquare size={16} className="text-blue-500" />;
      default:
        return <MessageSquare size={16} className="text-gray-400" />;
    }
  };
  
  const status = getStatusStyles(request.status);
  
  return (
    <div className="glass-card p-4 border border-white/10 hover:border-neon-blue/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-white/5">
            {getSourceIcon(request.source)}
          </div>
          <div>
            <div className="text-gray-400 text-xs">{request.source}</div>
            <div className="text-gray-500 text-xs">{request.timestamp}</div>
          </div>
        </div>
        
        <div className="flex gap-1.5">
          {request.status !== 'fake' && (
            <Badge className={getPriorityStyles(request.priority)}>
              {request.priority}
            </Badge>
          )}
          
          <Badge className={status.className}>
            <span className="flex items-center gap-1">
              {status.icon}
              {request.status}
            </span>
          </Badge>
        </div>
      </div>
      
      <p className="text-white text-sm mb-3">{request.text}</p>
      
      {request.status === 'verified' && (
        <div className="bg-white/5 p-2 rounded-md text-xs text-gray-300 mb-3 flex items-center">
          <MapPin size={14} className="text-neon-cyan mr-1 flex-shrink-0" />
          <span>{request.location}</span>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">
          AI Confidence: <span className="text-neon-blue">{request.confidence}%</span>
        </div>
        
        {request.status === 'verified' && (
          <Button variant="link" size="sm" className="text-neon-blue text-xs h-auto p-0">
            View Details
          </Button>
        )}
      </div>
    </div>
  );
};

const AIDisasterResponseSystem = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredRequests = mockRequests.filter(request => {
    if (filter === "all") return true;
    if (filter === "verified") return request.status === "verified";
    if (filter === "critical") return request.priority === "critical";
    if (filter === "fake") return request.status === "fake";
    return true;
  });
  
  const stats = {
    total: mockRequests.length,
    verified: mockRequests.filter(r => r.status === "verified").length,
    critical: mockRequests.filter(r => r.priority === "critical").length,
    fake: mockRequests.filter(r => r.status === "fake").length
  };
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          AI-Powered <span className="neon-text-blue">Disaster Response</span>
        </h2>
        <p className="text-gray-400">
          Real-time analysis and verification of emergency requests from various sources.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full mb-4 bg-dark-lighter">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>
                All Requests <Badge className="ml-2 bg-white/10 text-white">{stats.total}</Badge>
              </TabsTrigger>
              <TabsTrigger value="verified" onClick={() => setFilter("verified")}>
                Verified <Badge className="ml-2 bg-green-500/20 text-green-500">{stats.verified}</Badge>
              </TabsTrigger>
              <TabsTrigger value="critical" onClick={() => setFilter("critical")}>
                Critical <Badge className="ml-2 bg-neon-red/20 text-neon-red">{stats.critical}</Badge>
              </TabsTrigger>
              <TabsTrigger value="fake" onClick={() => setFilter("fake")}>
                Fake <Badge className="ml-2 bg-red-500/20 text-red-500">{stats.fake}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.map(request => (
                <SOSMessage key={request.id} request={request} />
              ))}
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No messages match this filter.</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <RequestAnalysisCard />
          
          <div className="glass-card p-4 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Image size={18} className="text-neon-blue" />
              Image Analysis
            </h3>
            
            <div className="space-y-3">
              <div className="rounded-md overflow-hidden">
                <img 
                  src="https://i.imgur.com/z2JTyrR.jpg" 
                  alt="AI Analyzed Image" 
                  className="w-full"
                />
              </div>
              
              <div className="bg-black/30 p-3 rounded-md">
                <h4 className="text-sm font-medium text-white mb-2">AI Detection Results:</h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-500" />
                    Collapsed building detected (88% confidence)
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-500" />
                    ~15-20 people visible in danger zone
                  </li>
                  <li className="flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-500" />
                    Location identified: Downtown district
                  </li>
                </ul>
              </div>
              
              <Button variant="outline" size="sm" className="w-full border-neon-blue text-neon-blue">
                View Full Analysis
              </Button>
            </div>
          </div>
          
          <div className="glass-card p-4 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">Voice Commands</h3>
            <div className="bg-black/30 p-3 rounded-md text-gray-300 text-sm mb-3">
              Try saying: "Report flood emergency in Chennai" or "Find nearest evacuation center"
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan hover:opacity-90 text-white"
            >
              Activate Voice Assistant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDisasterResponseSystem;
