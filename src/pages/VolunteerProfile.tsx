import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, Clock, Edit, Save, 
  Shield, CheckCircle, AlertTriangle, FileText, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';

// Mock data for the volunteer profile
const mockVolunteer = {
  id: 'vol-123456',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: '2023-05-15',
  bio: 'Emergency medical technician with 5+ years of experience. Passionate about helping communities in crisis and providing medical support during disasters.',
  skills: ['Medical Aid', 'First Response', 'Search & Rescue', 'Communication'],
  availability: 'Weekends & Emergencies',
  verificationStatus: 'verified',
  completedMissions: 12,
  hoursContributed: 156,
  certifications: [
    { name: 'First Aid & CPR', issuer: 'Red Cross', date: '2022-03-10', expires: '2024-03-10' },
    { name: 'Disaster Response', issuer: 'FEMA', date: '2021-11-05', expires: '2023-11-05' }
  ],
  upcomingTasks: [
    { id: 'task-001', title: 'Medical Support', location: 'Downtown Relief Center', date: '2023-08-15', status: 'confirmed' },
    { id: 'task-002', title: 'Supply Distribution', location: 'Eastside Community Center', date: '2023-08-22', status: 'pending' }
  ],
  recentActivity: [
    { id: 'act-001', type: 'task_completed', description: 'Completed medical support at North Shore Relief Camp', date: '2023-07-28' },
    { id: 'act-002', type: 'training_completed', description: 'Completed Advanced First Aid training', date: '2023-07-15' },
    { id: 'act-003', type: 'task_completed', description: 'Assisted with evacuation coordination during flood response', date: '2023-06-30' }
  ]
};

const VolunteerProfile = () => {
  const [volunteer, setVolunteer] = useState(mockVolunteer);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: volunteer.firstName,
    lastName: volunteer.lastName,
    email: volunteer.email,
    phone: volunteer.phone,
    location: volunteer.location,
    bio: volunteer.bio,
    availability: volunteer.availability
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setVolunteer(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 lg:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={`${volunteer.firstName} ${volunteer.lastName}`} />
                    <AvatarFallback className="bg-blue-600 text-xl">
                      {getInitials(volunteer.firstName, volunteer.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{volunteer.firstName} {volunteer.lastName}</CardTitle>
                <CardDescription className="flex items-center justify-center mt-1">
                  <span className={`h-2 w-2 rounded-full ${getStatusColor(volunteer.verificationStatus)} mr-2`}></span>
                  {volunteer.verificationStatus === 'verified' ? 'Verified Volunteer' : 'Pending Verification'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p>{volunteer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p>{volunteer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p>{volunteer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Joined</p>
                        <p>{formatDate(volunteer.joinDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Availability</p>
                        <p>{volunteer.availability}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-gray-400 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {volunteer.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-800 text-blue-300 border-blue-500">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-gray-400 mb-2">Bio</p>
                      <p className="text-sm">{volunteer.bio}</p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={editForm.firstName}
                          onChange={handleEditChange}
                          className="bg-gray-800/50 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={editForm.lastName}
                          onChange={handleEditChange}
                          className="bg-gray-800/50 border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditChange}
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={editForm.location}
                        onChange={handleEditChange}
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Input
                        id="availability"
                        name="availability"
                        value={editForm.availability}
                        onChange={handleEditChange}
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editForm.bio}
                        onChange={handleEditChange}
                        className="bg-gray-800/50 border-gray-700 min-h-[100px]"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex w-full space-x-2">
                    <Button 
                      onClick={() => setIsEditing(false)} 
                      variant="outline" 
                      className="flex-1 border-gray-700 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile} 
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Missions Completed</p>
                        <p className="text-3xl font-bold">{volunteer.completedMissions}</p>
                      </div>
                      <Award className="h-10 w-10 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Hours Contributed</p>
                        <p className="text-3xl font-bold">{volunteer.hoursContributed}</p>
                      </div>
                      <Clock className="h-10 w-10 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Verification Status</p>
                        <div className="flex items-center">
                          {volunteer.verificationStatus === 'verified' ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                              <p className="text-green-500 font-medium">Verified</p>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-1" />
                              <p className="text-yellow-500 font-medium">Pending</p>
                            </>
                          )}
                        </div>
                      </div>
                      <Shield className="h-10 w-10 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Tabs for different sections */}
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="bg-gray-800 border-gray-700 mb-4">
                  <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
                      <CardDescription>Tasks you've been assigned or signed up for</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {volunteer.upcomingTasks.length > 0 ? (
                        <div className="space-y-4">
                          {volunteer.upcomingTasks.map((task) => (
                            <div key={task.id} className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <div className="flex items-center text-sm text-gray-400 mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {task.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-400 mt-1">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(task.date)}
                                </div>
                              </div>
                              <div>
                                {getTaskStatusBadge(task.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-400">No upcoming tasks</p>
                          <Link to="/volunteer-tasks">
                            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                              Find Tasks
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link to="/volunteer-tasks" className="w-full">
                        <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                          View All Available Tasks
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="certifications">
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl">Certifications & Training</CardTitle>
                      <CardDescription>Your qualifications and completed training</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {volunteer.certifications.length > 0 ? (
                        <div className="space-y-4">
                          {volunteer.certifications.map((cert, index) => (
                            <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">{cert.name}</h4>
                                  <p className="text-sm text-gray-400 mt-1">Issued by {cert.issuer}</p>
                                </div>
                                <FileText className="h-5 w-5 text-blue-400" />
                              </div>
                              <div className="flex items-center justify-between mt-3 text-sm">
                                <div className="text-gray-400">
                                  Issued: {formatDate(cert.date)}
                                </div>
                                <div className={new Date(cert.expires) < new Date() ? "text-red-400" : "text-green-400"}>
                                  Expires: {formatDate(cert.expires)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-400">No certifications added yet</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Add Certification
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity">
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl">Recent Activity</CardTitle>
                      <CardDescription>Your recent contributions and actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {volunteer.recentActivity.length > 0 ? (
                        <div className="space-y-4">
                          {volunteer.recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                              <div className="mt-0.5">
                                {activity.type === 'task_completed' ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : activity.type === 'training_completed' ? (
                                  <Award className="h-5 w-5 text-blue-500" />
                                ) : (
                                  <Clock className="h-5 w-5 text-yellow-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p>{activity.description}</p>
                                <p className="text-sm text-gray-400 mt-1">{formatDate(activity.date)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-400">No recent activity</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile; 