
import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Users, 
  Award, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock tasks data
const tasks = [
  {
    id: 1,
    title: "Medical Supply Distribution",
    location: "Chennai Central Hospital",
    status: "in-progress",
    dueTime: "3 hours",
    priority: "high",
    progress: 65
  },
  {
    id: 2,
    title: "Food Package Assembly",
    location: "Relief Center #4",
    status: "upcoming",
    dueTime: "Tomorrow, 9:00 AM",
    priority: "medium",
    progress: 0
  },
  {
    id: 3,
    title: "Area Evacuation Assistance",
    location: "Coastal Village B5",
    status: "completed",
    dueTime: "Completed 2h ago",
    priority: "critical",
    progress: 100
  }
];

// Mock volunteer stats
const volunteerStats = {
  tasksCompleted: 28,
  hoursContributed: 147,
  peopleHelped: 350,
  rank: "Silver Responder",
  xp: 1450,
  nextRank: "Gold Responder",
  nextRankXp: 2000
};

const TaskCard = ({ task }: { task: typeof tasks[0] }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-neon-red';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-blue-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'in-progress': return <Clock size={16} className="text-neon-blue animate-pulse" />;
      default: return <Clock size={16} className="text-gray-400" />;
    }
  };
  
  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 60) return 'bg-neon-blue';
    if (progress > 30) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="glass-card p-4 border border-white/10 hover:border-neon-blue/50 transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-white">{task.title}</h3>
        <div className={getPriorityColor(task.priority)}>
          <AlertTriangle size={16} />
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
        <MapPin size={14} />
        <span>{task.location}</span>
      </div>
      
      <Progress 
        value={task.progress} 
        className="h-1.5 mb-3" 
        indicatorClassName={getProgressColor(task.progress)} 
      />
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm">
          {getStatusIcon(task.status)}
          <span className="text-gray-300">{task.dueTime}</span>
        </div>
        
        {task.status !== 'completed' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-neon-blue p-0 h-auto hover:bg-transparent"
          >
            View <ArrowRight size={14} className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

const VolunteerDashboard = () => {
  const progressPercentage = Math.round((volunteerStats.xp / volunteerStats.nextRankXp) * 100);
  
  return (
    <div className="space-y-6">
      {/* Volunteer Profile Section */}
      <div className="glass-card p-4 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center text-white font-bold text-xl">
            JS
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-white">John Smith</h2>
            <div className="flex items-center text-sm text-gray-400">
              <Award size={14} className="mr-1 text-yellow-500" />
              {volunteerStats.rank} • {volunteerStats.xp} XP
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-gray-400">{volunteerStats.xp} XP</span>
            <span className="text-gray-400">{volunteerStats.nextRankXp} XP</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2" 
            indicatorClassName="bg-gradient-to-r from-neon-blue to-neon-cyan" 
          />
          <div className="mt-1 text-center text-xs text-gray-400">
            {volunteerStats.nextRankXp - volunteerStats.xp} XP to reach {volunteerStats.nextRank}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center bg-white/5 rounded-lg p-2">
            <span className="text-neon-blue font-bold text-xl">{volunteerStats.tasksCompleted}</span>
            <span className="text-xs text-gray-400">Tasks</span>
          </div>
          <div className="flex flex-col items-center bg-white/5 rounded-lg p-2">
            <span className="text-neon-blue font-bold text-xl">{volunteerStats.hoursContributed}</span>
            <span className="text-xs text-gray-400">Hours</span>
          </div>
          <div className="flex flex-col items-center bg-white/5 rounded-lg p-2">
            <span className="text-neon-blue font-bold text-xl">{volunteerStats.peopleHelped}</span>
            <span className="text-xs text-gray-400">Helped</span>
          </div>
        </div>
      </div>
      
      {/* Tasks Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Your Tasks</h2>
          <Button variant="outline" size="sm" className="border-neon-blue text-neon-blue">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      
      {/* Leaderboard Preview */}
      <div className="glass-card p-4 border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Top Volunteers</h2>
          <TrendingUp size={18} className="text-neon-cyan" />
        </div>
        
        <div className="space-y-3">
          {[
            { name: "Alex Kumar", rank: "Gold Responder", xp: 3240, avatar: "AK" },
            { name: "Maria Rodriguez", rank: "Gold Responder", xp: 2980, avatar: "MR" },
            { name: "David Chen", rank: "Silver Responder", xp: 1820, avatar: "DC" }
          ].map((volunteer, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-lighter text-gray-300 text-sm border border-white/10">
                {volunteer.avatar}
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{volunteer.name}</div>
                <div className="text-xs text-gray-400">{volunteer.rank}</div>
              </div>
              <div className="text-neon-blue font-semibold">{volunteer.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
