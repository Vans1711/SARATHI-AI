import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Users, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Download, 
  BarChart3, 
  PieChart,
  UserPlus,
  Briefcase,
  Award,
  Phone,
  Mail,
  FileText,
  ArrowUpRight
} from 'lucide-react';

const VolunteerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState<number | null>(null);

  // Mock volunteer data
  const volunteers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 9876543210',
      location: 'New Delhi, India',
      skills: ['Medical', 'First Aid', 'Driving'],
      availability: 'Weekends',
      experience: '3 years',
      status: 'active',
      tasks: 12,
      completedTasks: 10,
      joinedDate: '2023-01-15',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 9876543211',
      location: 'Mumbai, India',
      skills: ['Communication', 'Coordination', 'Languages'],
      availability: 'Full-time',
      experience: '1 year',
      status: 'active',
      tasks: 8,
      completedTasks: 8,
      joinedDate: '2023-03-22',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 9876543212',
      location: 'Jaipur, India',
      skills: ['Heavy Machinery', 'Rescue', 'Swimming'],
      availability: 'On-call',
      experience: '5 years',
      status: 'active',
      tasks: 20,
      completedTasks: 18,
      joinedDate: '2022-11-05',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Ananya Gupta',
      email: 'ananya.gupta@example.com',
      phone: '+91 9876543213',
      location: 'Bangalore, India',
      skills: ['Medical', 'Counseling', 'Administration'],
      availability: 'Evenings',
      experience: '2 years',
      status: 'inactive',
      tasks: 15,
      completedTasks: 12,
      joinedDate: '2023-02-18',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      name: 'Arjun Kumar',
      email: 'arjun.kumar@example.com',
      phone: '+91 9876543214',
      location: 'Chennai, India',
      skills: ['Logistics', 'Driving', 'Heavy Lifting'],
      availability: 'Weekdays',
      experience: '4 years',
      status: 'active',
      tasks: 18,
      completedTasks: 15,
      joinedDate: '2022-12-10',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Neha Verma',
      email: 'neha.verma@example.com',
      phone: '+91 9876543215',
      location: 'Kolkata, India',
      skills: ['Teaching', 'Child Care', 'First Aid'],
      availability: 'Weekends',
      experience: '3 years',
      status: 'pending',
      tasks: 0,
      completedTasks: 0,
      joinedDate: '2023-05-30',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      id: 7,
      name: 'Rajesh Khanna',
      email: 'rajesh.khanna@example.com',
      phone: '+91 9876543216',
      location: 'Hyderabad, India',
      skills: ['Engineering', 'Construction', 'Planning'],
      availability: 'Full-time',
      experience: '7 years',
      status: 'active',
      tasks: 25,
      completedTasks: 23,
      joinedDate: '2022-09-15',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      id: 8,
      name: 'Meera Reddy',
      email: 'meera.reddy@example.com',
      phone: '+91 9876543217',
      location: 'Pune, India',
      skills: ['Cooking', 'Distribution', 'Management'],
      availability: 'Weekdays',
      experience: '2 years',
      status: 'inactive',
      tasks: 10,
      completedTasks: 7,
      joinedDate: '2023-01-20',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
    }
  ];

  // Filter volunteers based on search query and active tab
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = 
      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && volunteer.status === activeTab;
  });

  // Stats for the dashboard
  const stats = {
    totalVolunteers: volunteers.length,
    activeVolunteers: volunteers.filter(v => v.status === 'active').length,
    pendingVolunteers: volunteers.filter(v => v.status === 'pending').length,
    inactiveVolunteers: volunteers.filter(v => v.status === 'inactive').length,
    totalTasks: volunteers.reduce((sum, v) => sum + v.tasks, 0),
    completedTasks: volunteers.reduce((sum, v) => sum + v.completedTasks, 0),
  };

  // Calculate completion rate
  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Volunteer <span className="neon-text-blue">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Manage volunteer registrations, track activities, and coordinate relief efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="pb-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Volunteers</h3>
                <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-neon-blue" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stats.totalVolunteers}</div>
              <div className="flex items-center text-sm text-neon-green">
                <UserPlus className="h-4 w-4 mr-1" />
                <span>+3 new this week</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Active Volunteers</h3>
                <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-neon-green" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stats.activeVolunteers}</div>
              <div className="text-sm text-gray-400">
                {Math.round((stats.activeVolunteers / stats.totalVolunteers) * 100)}% of total
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Tasks Completed</h3>
                <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-neon-cyan" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stats.completedTasks}</div>
              <div className="flex items-center">
                <Progress value={completionRate} className="h-2 flex-1 mr-3 bg-white/10" />
                <span className="text-sm text-gray-400">{completionRate}%</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Pending Approvals</h3>
                <div className="w-10 h-10 rounded-full bg-neon-red/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-neon-red" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stats.pendingVolunteers}</div>
              <Button variant="outline" size="sm" className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                Review Applications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer List */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold">Volunteer Registry</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search volunteers..." 
                    className="pl-10 w-full md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Skills</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Joined</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVolunteers.map((volunteer) => (
                        <tr 
                          key={volunteer.id} 
                          className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                          onClick={() => setSelectedVolunteer(volunteer.id === selectedVolunteer ? null : volunteer.id)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                                <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{volunteer.name}</div>
                                <div className="text-sm text-gray-400">{volunteer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{volunteer.location}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {volunteer.skills.slice(0, 2).map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-background/50">{skill}</Badge>
                              ))}
                              {volunteer.skills.length > 2 && (
                                <Badge variant="outline" className="bg-background/50">+{volunteer.skills.length - 2}</Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={
                                volunteer.status === 'active' ? 'bg-neon-green/20 text-neon-green' :
                                volunteer.status === 'pending' ? 'bg-amber-500/20 text-amber-500' :
                                'bg-gray-500/20 text-gray-400'
                              }
                            >
                              {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{new Date(volunteer.joinedDate).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">Assign</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredVolunteers.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-400">
                            No volunteers found matching your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Volunteer Details */}
          {selectedVolunteer && (
            <div className="mt-8 glass-card p-6 rounded-xl animate-fade-in">
              {volunteers.filter(v => v.id === selectedVolunteer).map(volunteer => (
                <div key={volunteer.id}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                        <AvatarFallback className="text-xl">{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold">{volunteer.name}</h2>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge 
                            className={
                              volunteer.status === 'active' ? 'bg-neon-green/20 text-neon-green' :
                              volunteer.status === 'pending' ? 'bg-amber-500/20 text-amber-500' :
                              'bg-gray-500/20 text-gray-400'
                            }
                          >
                            {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                          </Badge>
                          <span className="text-gray-400 flex items-center">
                            <Award className="h-4 w-4 mr-1" />
                            {volunteer.experience} experience
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                        Edit Profile
                      </Button>
                      <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white">
                        Assign Task
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{volunteer.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{volunteer.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{volunteer.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Skills & Availability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3">
                          <div className="text-sm text-gray-400 mb-2">Skills</div>
                          <div className="flex flex-wrap gap-1">
                            {volunteer.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-background/50">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-2">Availability</div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{volunteer.availability}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Task Completion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">
                          {volunteer.completedTasks}/{volunteer.tasks}
                        </div>
                        <Progress 
                          value={volunteer.tasks > 0 ? (volunteer.completedTasks / volunteer.tasks) * 100 : 0} 
                          className="h-2 mb-3 bg-white/10" 
                        />
                        <div className="text-sm text-gray-400">
                          {volunteer.tasks > 0 
                            ? `${Math.round((volunteer.completedTasks / volunteer.tasks) * 100)}% completion rate` 
                            : 'No tasks assigned yet'}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Activities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mt-1">
                              <CheckCircle2 className="h-4 w-4 text-neon-blue" />
                            </div>
                            <div>
                              <div className="font-medium">Completed food distribution task</div>
                              <div className="text-sm text-gray-400 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" /> 2 days ago
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center mt-1">
                              <MapPin className="h-4 w-4 text-neon-green" />
                            </div>
                            <div>
                              <div className="font-medium">Assigned to Kerala flood relief</div>
                              <div className="text-sm text-gray-400 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" /> 1 week ago
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center mt-1">
                              <FileText className="h-4 w-4 text-neon-cyan" />
                            </div>
                            <div>
                              <div className="font-medium">Completed training module</div>
                              <div className="text-sm text-gray-400 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" /> 2 weeks ago
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View All Activities
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Notes & Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 border border-white/10 rounded-lg">
                            <div className="font-medium mb-1">Background Check</div>
                            <div className="text-sm text-gray-400 mb-2">Completed on {new Date(volunteer.joinedDate).toLocaleDateString()}</div>
                            <Badge className="bg-neon-green/20 text-neon-green">Verified</Badge>
                          </div>
                          <div className="p-3 border border-white/10 rounded-lg">
                            <div className="font-medium mb-1">ID Verification</div>
                            <div className="text-sm text-gray-400 mb-2">Government ID card verified</div>
                            <Badge className="bg-neon-green/20 text-neon-green">Verified</Badge>
                          </div>
                          <div className="p-3 border border-white/10 rounded-lg">
                            <div className="font-medium mb-1">Training Certificates</div>
                            <div className="text-sm text-gray-400 mb-2">3 certificates uploaded</div>
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              View Documents
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default VolunteerDashboard; 