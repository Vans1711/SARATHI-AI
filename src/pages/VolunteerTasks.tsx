import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Calendar, Clock, Users, 
  CheckCircle, AlertTriangle, Info, ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';

// Mock data for available tasks
const mockTasks = [
  {
    id: 'task-001',
    title: 'Medical Support',
    description: 'Provide medical assistance at the downtown relief center. Looking for trained medical professionals to help with basic health checks and first aid.',
    location: 'Downtown Relief Center, San Francisco',
    date: '2023-08-15',
    duration: 4,
    requiredSkills: ['Medical', 'First Aid'],
    volunteersNeeded: 5,
    volunteersAssigned: 2,
    urgency: 'high',
    status: 'active',
    coordinator: 'Dr. Sarah Chen'
  },
  {
    id: 'task-002',
    title: 'Supply Distribution',
    description: 'Help distribute food, water, and essential supplies to affected families. Tasks include organizing supplies, creating care packages, and distribution.',
    location: 'Eastside Community Center, Oakland',
    date: '2023-08-22',
    duration: 6,
    requiredSkills: ['Organization', 'Communication'],
    volunteersNeeded: 10,
    volunteersAssigned: 4,
    urgency: 'medium',
    status: 'active',
    coordinator: 'Michael Rodriguez'
  },
  {
    id: 'task-003',
    title: 'Evacuation Assistance',
    description: 'Assist with evacuation procedures in flood-affected areas. Help residents safely evacuate and transport to designated shelters.',
    location: 'Riverside District, Sacramento',
    date: '2023-08-10',
    duration: 8,
    requiredSkills: ['Transportation', 'Crisis Management'],
    volunteersNeeded: 8,
    volunteersAssigned: 6,
    urgency: 'critical',
    status: 'active',
    coordinator: 'Captain James Wilson'
  },
  {
    id: 'task-004',
    title: 'Shelter Setup',
    description: 'Help set up temporary shelters for displaced residents. Tasks include arranging beds, organizing living spaces, and setting up basic amenities.',
    location: 'North High School, San Jose',
    date: '2023-08-18',
    duration: 5,
    requiredSkills: ['Physical Labor', 'Organization'],
    volunteersNeeded: 12,
    volunteersAssigned: 3,
    urgency: 'high',
    status: 'active',
    coordinator: 'Lisa Thompson'
  },
  {
    id: 'task-005',
    title: 'Child Care Support',
    description: 'Provide care and activities for children at the family relief center while parents work with relief coordinators.',
    location: 'Family Relief Center, Palo Alto',
    date: '2023-08-25',
    duration: 4,
    requiredSkills: ['Childcare', 'Education'],
    volunteersNeeded: 6,
    volunteersAssigned: 2,
    urgency: 'medium',
    status: 'active',
    coordinator: 'Emily Parker'
  },
  {
    id: 'task-006',
    title: 'Damage Assessment',
    description: 'Assist with preliminary damage assessment in affected neighborhoods. Document damage to homes and infrastructure to help with relief planning.',
    location: 'Various Locations, Bay Area',
    date: '2023-08-12',
    duration: 6,
    requiredSkills: ['Documentation', 'Assessment'],
    volunteersNeeded: 8,
    volunteersAssigned: 5,
    urgency: 'high',
    status: 'active',
    coordinator: 'Robert Chang'
  }
];

const VolunteerTasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    urgency: 'all',
    location: 'all',
    date: 'all',
    duration: [0, 8],
    onlyAvailable: false,
    skills: 'all'
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter(task => {
    // Search term filter
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Urgency filter
    if (filters.urgency !== 'all' && task.urgency !== filters.urgency) {
      return false;
    }
    
    // Location filter (simplified for demo)
    if (filters.location !== 'all') {
      const city = task.location.split(',')[1]?.trim();
      if (!city || !city.includes(filters.location)) {
        return false;
      }
    }
    
    // Date filter (simplified for demo)
    const taskDate = new Date(task.date);
    const today = new Date();
    if (filters.date === 'today' && taskDate.toDateString() !== today.toDateString()) {
      return false;
    } else if (filters.date === 'week') {
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      if (taskDate > nextWeek || taskDate < today) {
        return false;
      }
    } else if (filters.date === 'month') {
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);
      if (taskDate > nextMonth || taskDate < today) {
        return false;
      }
    }
    
    // Duration filter
    if (task.duration < filters.duration[0] || task.duration > filters.duration[1]) {
      return false;
    }
    
    // Only available filter
    if (filters.onlyAvailable && task.volunteersAssigned >= task.volunteersNeeded) {
      return false;
    }
    
    // Skills filter (simplified for demo)
    if (filters.skills !== 'all' && !task.requiredSkills.includes(filters.skills)) {
      return false;
    }
    
    return true;
  });

  // Sort filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'urgency':
        const urgencyOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        comparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        break;
      case 'duration':
        comparison = a.duration - b.duration;
        break;
      case 'volunteers':
        comparison = (a.volunteersNeeded - a.volunteersAssigned) - (b.volunteersNeeded - b.volunteersAssigned);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleVolunteer = (taskId: string) => {
    // In a real app, this would make an API call to sign up for the task
    toast({
      title: "Task sign-up successful",
      description: "You have been added to the volunteer list for this task.",
    });
    
    // Update local state to reflect the change
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, volunteersAssigned: task.volunteersAssigned + 1 } 
        : task
    ));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Volunteer Tasks</h1>
            <p className="text-gray-400">Browse and sign up for tasks that match your skills and availability</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-700"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select 
                      value={filters.urgency} 
                      onValueChange={(value) => handleFilterChange('urgency', value)}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Urgencies</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select 
                      value={filters.location} 
                      onValueChange={(value) => handleFilterChange('location', value)}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                        <SelectItem value="Oakland">Oakland</SelectItem>
                        <SelectItem value="San Jose">San Jose</SelectItem>
                        <SelectItem value="Sacramento">Sacramento</SelectItem>
                        <SelectItem value="Palo Alto">Palo Alto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date Range</Label>
                    <Select 
                      value={filters.date} 
                      onValueChange={(value) => handleFilterChange('date', value)}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <span className="text-sm text-gray-400">{filters.duration[0]} - {filters.duration[1]}h</span>
                    </div>
                    <Slider
                      id="duration"
                      min={0}
                      max={8}
                      step={1}
                      value={filters.duration}
                      onValueChange={(value) => handleFilterChange('duration', value)}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Select 
                      value={filters.skills} 
                      onValueChange={(value) => handleFilterChange('skills', value)}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue placeholder="Select skills" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Skills</SelectItem>
                        <SelectItem value="Medical">Medical</SelectItem>
                        <SelectItem value="First Aid">First Aid</SelectItem>
                        <SelectItem value="Organization">Organization</SelectItem>
                        <SelectItem value="Communication">Communication</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Crisis Management">Crisis Management</SelectItem>
                        <SelectItem value="Physical Labor">Physical Labor</SelectItem>
                        <SelectItem value="Childcare">Childcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Documentation">Documentation</SelectItem>
                        <SelectItem value="Assessment">Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="available"
                      checked={filters.onlyAvailable}
                      onCheckedChange={(checked) => handleFilterChange('onlyAvailable', checked)}
                    />
                    <Label htmlFor="available">Show only tasks needing volunteers</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setFilters({
                      urgency: 'all',
                      location: 'all',
                      date: 'all',
                      duration: [0, 8],
                      onlyAvailable: false,
                      skills: 'all'
                    })}
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800"
                  >
                    Reset Filters
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Tasks List */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-xl">Available Tasks ({sortedTasks.length})</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="sort" className="whitespace-nowrap">Sort by:</Label>
                      <Select 
                        value={sortBy} 
                        onValueChange={setSortBy}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 w-[160px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="urgency">Urgency</SelectItem>
                          <SelectItem value="duration">Duration</SelectItem>
                          <SelectItem value="volunteers">Volunteers Needed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        <ArrowUpDown className={`h-4 w-4 ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="list" className="w-full">
                    <TabsList className="bg-gray-800 border-gray-700 mb-4">
                      <TabsTrigger value="list">List View</TabsTrigger>
                      <TabsTrigger value="grid">Grid View</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="list">
                      <div className="space-y-4">
                        {sortedTasks.length > 0 ? (
                          sortedTasks.map(task => (
                            <div key={task.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-medium">{task.title}</h3>
                                    {getUrgencyBadge(task.urgency)}
                                  </div>
                                  <p className="text-gray-300 mb-3">{task.description}</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                                    <div className="flex items-center text-gray-400">
                                      <MapPin className="h-4 w-4 mr-2" />
                                      {task.location}
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      {formatDate(task.date)}
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                      <Clock className="h-4 w-4 mr-2" />
                                      {task.duration} hours
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                      <Users className="h-4 w-4 mr-2" />
                                      {task.volunteersAssigned}/{task.volunteersNeeded} volunteers
                                    </div>
                                  </div>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {task.requiredSkills.map((skill, index) => (
                                      <Badge key={index} variant="outline" className="bg-gray-800 text-blue-300 border-blue-500">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[120px]">
                                  <Button 
                                    onClick={() => handleVolunteer(task.id)}
                                    className="bg-blue-500 hover:bg-blue-600"
                                    disabled={task.volunteersAssigned >= task.volunteersNeeded}
                                  >
                                    {task.volunteersAssigned >= task.volunteersNeeded ? (
                                      <span className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Full
                                      </span>
                                    ) : (
                                      "Volunteer"
                                    )}
                                  </Button>
                                  <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                                    <Info className="mr-2 h-4 w-4" />
                                    Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                            <h3 className="text-xl font-medium mb-2">No tasks found</h3>
                            <p className="text-gray-400 mb-4">Try adjusting your filters to see more results</p>
                            <Button 
                              onClick={() => setFilters({
                                urgency: 'all',
                                location: 'all',
                                date: 'all',
                                duration: [0, 8],
                                onlyAvailable: false,
                                skills: 'all'
                              })}
                              variant="outline"
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              Reset Filters
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="grid">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sortedTasks.length > 0 ? (
                          sortedTasks.map(task => (
                            <Card key={task.id} className="bg-gray-800/50 border-gray-700">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-lg">{task.title}</CardTitle>
                                  {getUrgencyBadge(task.urgency)}
                                </div>
                                <CardDescription className="line-clamp-2">{task.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center text-gray-400">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {task.location}
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(task.date)}
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {task.duration} hours
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <Users className="h-4 w-4 mr-2" />
                                    {task.volunteersAssigned}/{task.volunteersNeeded} volunteers
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1">
                                  {task.requiredSkills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="bg-gray-800 text-blue-300 border-blue-500 text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter className="flex gap-2">
                                <Button 
                                  onClick={() => handleVolunteer(task.id)}
                                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                                  disabled={task.volunteersAssigned >= task.volunteersNeeded}
                                >
                                  {task.volunteersAssigned >= task.volunteersNeeded ? (
                                    <span className="flex items-center">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Full
                                    </span>
                                  ) : (
                                    "Volunteer"
                                  )}
                                </Button>
                                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                                  <Info className="h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-12">
                            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                            <h3 className="text-xl font-medium mb-2">No tasks found</h3>
                            <p className="text-gray-400 mb-4">Try adjusting your filters to see more results</p>
                            <Button 
                              onClick={() => setFilters({
                                urgency: 'all',
                                location: 'all',
                                date: 'all',
                                duration: [0, 8],
                                onlyAvailable: false,
                                skills: 'all'
                              })}
                              variant="outline"
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              Reset Filters
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerTasks; 