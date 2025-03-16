
import React from 'react';
import Navigation from '@/components/Navigation';
import AIDisasterResponseSystem from '@/components/AIDisasterResponseSystem';
import SmartReliefSystem from '@/components/SmartReliefSystem';
import VolunteerDashboard from '@/components/VolunteerDashboard';
import DisasterStats from '@/components/DisasterStats';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  ChevronRight,
  Settings,
  Bell,
  User,
  ArrowUpRight,
  PackageOpen
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LayoutDashboard className="h-8 w-8 text-neon-blue" />
              Command Center
            </h1>
            <p className="text-gray-400 mt-1">
              Manage disaster response efforts and track resources in real-time.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="border-white/20 text-white gap-2">
              <Bell size={16} />
              Alerts
              <span className="bg-neon-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </Button>
            
            <Button variant="outline" className="border-white/20 text-white">
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">Admin User</div>
                <div className="text-gray-400 text-xs">Emergency Coordinator</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <DisasterStats />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full mb-8 bg-dark-lighter">
            <TabsTrigger value="overview" className="flex-1">
              <LayoutDashboard size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex-1">
              <AlertTriangle size={16} className="mr-2" />
              Emergencies
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex-1">
              <PackageOpen size={16} className="mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex-1">
              <Users size={16} className="mr-2" />
              Volunteers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Active Disasters", value: "12", change: "+2 today", color: "text-neon-red" },
                { title: "Teams Deployed", value: "156", change: "+12 today", color: "text-neon-blue" },
                { title: "People Helped", value: "32,450", change: "+350 today", color: "text-neon-cyan" },
                { title: "Resource Utilization", value: "78%", change: "+5% this week", color: "text-green-500" }
              ].map((stat, index) => (
                <div key={index} className="glass-card p-4 border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">{stat.title}</div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="flex items-center text-xs text-green-400 mt-1">
                    <ArrowUpRight size={12} className="mr-1" /> 
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-3/5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Recent Emergency Alerts</h2>
                  <Button variant="link" className="text-neon-blue">
                    View All <ChevronRight size={16} />
                  </Button>
                </div>
                <AIDisasterResponseSystem />
              </div>
              
              <div className="lg:w-2/5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Volunteer Status</h2>
                  <Button variant="link" className="text-neon-blue">
                    View All <ChevronRight size={16} />
                  </Button>
                </div>
                <VolunteerDashboard />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <AIDisasterResponseSystem />
          </TabsContent>
          
          <TabsContent value="resources">
            <SmartReliefSystem />
          </TabsContent>
          
          <TabsContent value="volunteers">
            <div className="max-w-3xl mx-auto">
              <VolunteerDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
