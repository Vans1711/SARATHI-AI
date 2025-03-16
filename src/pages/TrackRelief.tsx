import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, Clock, CheckCircle, Truck, Package, AlertTriangle, 
  Calendar, MapPin, Users, Phone, Mail, FileText, ArrowRight, 
  ChevronRight, ChevronDown, Loader2, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';

// Mock data for relief request
const mockRequest = {
  id: 'REQ-123456',
  status: 'in_progress',
  createdAt: '2023-08-10T14:30:00Z',
  updatedAt: '2023-08-12T09:15:00Z',
  estimatedDelivery: '2023-08-14',
  type: 'food',
  urgency: 'medium',
  contact: {
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com'
  },
  location: {
    area: 'San Francisco, CA',
    address: '123 Main St, Apt 4B, San Francisco, CA 94103'
  },
  peopleCount: '3',
  specialNeeds: true,
  specialNeedsDetails: 'One elderly person with mobility issues requiring assistance.',
  description: 'We need food and water supplies for our family of three. We have been without power for two days and our food supplies are running low. We also have an elderly family member who has mobility issues.',
  assignedTeam: 'Team Alpha',
  timeline: [
    { 
      date: '2023-08-10T14:30:00Z', 
      status: 'submitted', 
      description: 'Request submitted and received by the system.' 
    },
    { 
      date: '2023-08-10T15:45:00Z', 
      status: 'under_review', 
      description: 'Request is being reviewed by relief coordinators.' 
    },
    { 
      date: '2023-08-11T10:20:00Z', 
      status: 'approved', 
      description: 'Request approved. Relief package is being prepared.' 
    },
    { 
      date: '2023-08-12T09:15:00Z', 
      status: 'in_progress', 
      description: 'Relief package has been assigned to Team Alpha for delivery.' 
    }
  ],
  items: [
    { name: 'Bottled Water', quantity: '24 bottles', status: 'packed' },
    { name: 'Non-perishable Food', quantity: '1 week supply', status: 'packed' },
    { name: 'First Aid Kit', quantity: '1', status: 'packed' },
    { name: 'Blankets', quantity: '3', status: 'pending' },
    { name: 'Hygiene Kit', quantity: '3', status: 'packed' }
  ],
  notes: [
    { 
      date: '2023-08-11T11:30:00Z', 
      author: 'Relief Coordinator', 
      text: 'Added extra water supplies due to reported water outage in the area.' 
    },
    { 
      date: '2023-08-12T09:20:00Z', 
      author: 'Logistics Team', 
      text: 'Delivery route planned. Estimated arrival on August 14th between 10 AM and 2 PM.' 
    }
  ]
};

const TrackRelief = () => {
  const [searchParams] = useSearchParams();
  const requestIdFromUrl = searchParams.get('id');
  
  const [requestId, setRequestId] = useState(requestIdFromUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState<typeof mockRequest | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (requestIdFromUrl) {
      handleTrackRequest();
    }
  }, [requestIdFromUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestId(e.target.value);
  };

  const handleTrackRequest = () => {
    if (!requestId) {
      toast({
        title: "Request ID required",
        description: "Please enter a request ID to track.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (requestId === 'REQ-123456' || requestIdFromUrl === 'REQ-123456') {
        setRequest(mockRequest);
      } else {
        setRequest(null);
        setError('Request not found. Please check the ID and try again.');
        toast({
          title: "Request not found",
          description: "We couldn't find a request with that ID. Please check and try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case 'under_review':
        return <Badge className="bg-purple-500">Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'completed':
        return <Badge className="bg-green-700">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const getItemStatusBadge = (status: string) => {
    switch (status) {
      case 'packed':
        return <Badge className="bg-green-500">Packed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'unavailable':
        return <Badge className="bg-red-500">Unavailable</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSimpleDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getReliefTypeName = (type: string) => {
    const types: Record<string, string> = {
      'food': 'Food & Water',
      'medical': 'Medical Assistance',
      'shelter': 'Temporary Shelter',
      'evacuation': 'Evacuation Support',
      'supplies': 'Essential Supplies',
      'rescue': 'Search & Rescue'
    };
    return types[type] || type;
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'under_review':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Package className="h-5 w-5 text-yellow-500" />;
      case 'out_for_delivery':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-700" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Track Relief Request</h1>
            <p className="text-gray-400">Check the status of your relief request and get updates</p>
          </div>
          
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Enter Request ID</CardTitle>
              <CardDescription>Enter the request ID you received when submitting your relief request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter request ID (e.g., REQ-123456)"
                    value={requestId}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800/50 border-gray-700"
                  />
                </div>
                <Button 
                  onClick={handleTrackRequest} 
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </span>
                  ) : (
                    'Track Request'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {error && (
            <Alert className="bg-red-900/20 border-red-500 mb-8">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertTitle>Request Not Found</AlertTitle>
              <AlertDescription>
                {error} If you need assistance, please contact our support team.
              </AlertDescription>
            </Alert>
          )}
          
          {request && (
            <div className="space-y-6">
              {/* Request Overview */}
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-xl">Request {request.id}</CardTitle>
                      <CardDescription>
                        Submitted on {formatDate(request.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Status:</span>
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Request Type</h3>
                        <p className="flex items-center mt-1">
                          {getReliefTypeName(request.type)}
                          <span className="mx-2">•</span>
                          {getUrgencyLabel(request.urgency)}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Contact Information</h3>
                        <div className="space-y-2 mt-1">
                          <p className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            {request.contact.name}
                          </p>
                          <p className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {request.contact.phone}
                          </p>
                          {request.contact.email && (
                            <p className="flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              {request.contact.email}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Location</h3>
                        <div className="space-y-2 mt-1">
                          <p className="flex items-start">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                            <span>{request.location.address}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Request Details</h3>
                        <div className="space-y-2 mt-1">
                          <p className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                            {request.peopleCount} {parseInt(request.peopleCount) === 1 ? 'person' : 'people'}
                          </p>
                          {request.specialNeeds && (
                            <div className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-1" />
                              <div>
                                <p className="font-medium">Special Needs</p>
                                <p className="text-sm text-gray-400">{request.specialNeedsDetails}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Estimated Delivery</h3>
                        <p className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {formatSimpleDate(request.estimatedDelivery)}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Assigned Team</h3>
                        <p className="mt-1">{request.assignedTeam || 'Not yet assigned'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Collapsible className="mt-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                      <span className="font-medium">Request Description</span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 mt-2 bg-gray-800/50 rounded-md">
                      <p className="text-gray-300">{request.description}</p>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
              
              {/* Status Timeline */}
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {request.timeline.map((event, index) => (
                      <div key={index} className="relative">
                        {index !== request.timeline.length - 1 && (
                          <div className="absolute top-7 left-[18px] bottom-0 w-0.5 bg-gray-700" />
                        )}
                        <div className="flex gap-4">
                          <div className="mt-1.5">
                            {getStatusIcon(event.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium capitalize">
                                  {event.status.replace(/_/g, ' ')}
                                </h3>
                                {getStatusBadge(event.status)}
                              </div>
                              <p className="text-sm text-gray-400">{formatDate(event.date)}</p>
                            </div>
                            <p className="mt-1 text-gray-300">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Relief Items */}
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">Relief Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-400">Item</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-400">Quantity</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {request.items.map((item, index) => (
                          <tr key={index} className="border-b border-gray-800">
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">{item.quantity}</td>
                            <td className="py-3 px-4">{getItemStatusBadge(item.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Notes */}
              {request.notes.length > 0 && (
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {request.notes.map((note, index) => (
                        <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <p className="font-medium">{note.author}</p>
                            <p className="text-sm text-gray-400">{formatDate(note.date)}</p>
                          </div>
                          <p className="text-gray-300">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Actions */}
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      If you have questions about your relief request or need to update information, please contact our support team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        Contact Support
                      </Button>
                      <Link to="/request-relief">
                        <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800">
                          Submit New Request
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {!request && !error && !isLoading && (
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h2 className="text-xl font-medium mb-2">Enter your request ID to track your relief request</h2>
                  <p className="text-gray-400 mb-6">
                    You can find your request ID in the confirmation email or message you received when submitting your request.
                  </p>
                  <div className="flex justify-center">
                    <Link to="/request-relief">
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        Submit a New Request
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackRelief; 