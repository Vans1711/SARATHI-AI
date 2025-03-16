import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, MapPin, Users, Phone, MessageSquare, 
  FileText, Upload, CheckCircle, Info, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Navigation from '@/components/Navigation';

// Mock data for relief types
const reliefTypes = [
  { id: 'food', name: 'Food & Water', description: 'Request essential food supplies and clean drinking water' },
  { id: 'medical', name: 'Medical Assistance', description: 'Request medical supplies or assistance for injuries or health conditions' },
  { id: 'shelter', name: 'Temporary Shelter', description: 'Request temporary housing or shelter if your home is damaged or unsafe' },
  { id: 'evacuation', name: 'Evacuation Support', description: 'Request help with evacuation from dangerous areas' },
  { id: 'supplies', name: 'Essential Supplies', description: 'Request non-food essentials like clothing, blankets, or hygiene products' },
  { id: 'rescue', name: 'Search & Rescue', description: 'Request urgent rescue for yourself or others in immediate danger' }
];

const RequestRelief = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState('');
  
  const [formData, setFormData] = useState({
    reliefType: '',
    urgency: 'medium',
    fullName: '',
    phone: '',
    email: '',
    location: '',
    address: '',
    peopleCount: '1',
    specialNeeds: false,
    specialNeedsDetails: '',
    description: '',
    attachments: [],
    consent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...fileList] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.reliefType) {
        toast({
          title: "Relief type required",
          description: "Please select a relief type to continue.",
          variant: "destructive"
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.fullName || !formData.phone || !formData.location) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields to continue.",
          variant: "destructive"
        });
        return false;
      }
      
      // Basic phone validation
      const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid phone number.",
          variant: "destructive"
        });
        return false;
      }
      
      // Basic email validation if provided
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address.",
            variant: "destructive"
          });
          return false;
        }
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent required",
        description: "Please agree to the terms and conditions to submit your request.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Generate a random request ID
      const id = 'REQ-' + Math.floor(100000 + Math.random() * 900000);
      setRequestId(id);
      
      toast({
        title: "Request submitted successfully",
        description: `Your relief request has been submitted. Your request ID is ${id}.`,
      });
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      reliefType: '',
      urgency: 'medium',
      fullName: '',
      phone: '',
      email: '',
      location: '',
      address: '',
      peopleCount: '1',
      specialNeeds: false,
      specialNeedsDetails: '',
      description: '',
      attachments: [],
      consent: false
    });
    setStep(1);
    setIsSuccess(false);
    setRequestId('');
  };

  const trackRequest = () => {
    navigate(`/track-relief?id=${requestId}`);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Relief Type</h3>
              <p className="text-gray-400">Choose the type of relief assistance you need</p>
              
              <RadioGroup 
                value={formData.reliefType} 
                onValueChange={(value) => handleSelectChange('reliefType', value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
              >
                {reliefTypes.map((type) => (
                  <div key={type.id} className="relative">
                    <RadioGroupItem
                      value={type.id}
                      id={type.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={type.id}
                      className="flex flex-col h-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-900/20 hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-medium mb-1">{type.name}</span>
                      <span className="text-sm text-gray-400">{type.description}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Urgency Level</h3>
              <p className="text-gray-400">How urgent is your need for assistance?</p>
              
              <RadioGroup 
                value={formData.urgency} 
                onValueChange={(value) => handleSelectChange('urgency', value)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
              >
                <div className="relative">
                  <RadioGroupItem
                    value="low"
                    id="urgency-low"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="urgency-low"
                    className="flex flex-col h-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:bg-green-900/20 hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium mb-1">Low</span>
                    <span className="text-sm text-gray-400">Need assistance within a few days</span>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="medium"
                    id="urgency-medium"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="urgency-medium"
                    className="flex flex-col h-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-yellow-500 peer-checked:bg-yellow-900/20 hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium mb-1">Medium</span>
                    <span className="text-sm text-gray-400">Need assistance within 24 hours</span>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="high"
                    id="urgency-high"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="urgency-high"
                    className="flex flex-col h-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-red-500 peer-checked:bg-red-900/20 hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium mb-1">High</span>
                    <span className="text-sm text-gray-400">Need immediate assistance</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <p className="text-gray-400">Provide your contact details so we can reach you</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="peopleCount">Number of People <span className="text-red-500">*</span></Label>
                  <Select 
                    value={formData.peopleCount} 
                    onValueChange={(value) => handleSelectChange('peopleCount', value)}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue placeholder="Select number of people" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3">3 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="5">5 people</SelectItem>
                      <SelectItem value="6-10">6-10 people</SelectItem>
                      <SelectItem value="10+">More than 10 people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Location Information</h3>
              <p className="text-gray-400">Provide your location details so we can send help</p>
              
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="location">City/Area <span className="text-red-500">*</span></Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Detailed Address <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="123 Main St, Apt 4B"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 min-h-[80px]"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="specialNeeds" 
                  checked={formData.specialNeeds}
                  onCheckedChange={(checked) => handleCheckboxChange('specialNeeds', checked as boolean)}
                />
                <Label htmlFor="specialNeeds">Do you or anyone in your group have special needs or medical conditions?</Label>
              </div>
              
              {formData.specialNeeds && (
                <div className="pt-2">
                  <Textarea
                    id="specialNeedsDetails"
                    name="specialNeedsDetails"
                    placeholder="Please describe any special needs, disabilities, or medical conditions..."
                    value={formData.specialNeedsDetails}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 min-h-[80px] w-full"
                  />
                </div>
              )}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Request Details</h3>
              <p className="text-gray-400">Provide more details about your situation and needs</p>
              
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="description">Describe your situation and specific needs <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please describe your current situation and what specific assistance you need..."
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 min-h-[150px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachments">Upload Photos or Documents (optional)</Label>
                  <div className="flex items-center gap-2">
                    <Label 
                      htmlFor="attachments" 
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Choose Files</span>
                    </Label>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <span className="text-sm text-gray-400">
                      {formData.attachments.length > 0 
                        ? `${formData.attachments.length} file(s) selected` 
                        : 'No files selected'}
                    </span>
                  </div>
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="h-4 w-4 text-blue-400" />
                            <span className="text-sm truncate">{file.name}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-white"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <Alert className="bg-blue-900/20 border-blue-500">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertTitle>Important Information</AlertTitle>
              <AlertDescription className="text-sm">
                Our team will review your request and prioritize based on urgency and available resources. 
                You will receive a confirmation with your request ID that you can use to track the status.
              </AlertDescription>
            </Alert>
            
            <div className="pt-2">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="consent" 
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleCheckboxChange('consent', checked as boolean)}
                />
                <Label htmlFor="consent" className="text-sm">
                  I understand and agree that my information will be used to coordinate relief efforts. 
                  I confirm that the information provided is accurate to the best of my knowledge.
                </Label>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderSuccessContent = () => {
    return (
      <div className="text-center py-8 space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-green-900/20 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Request Submitted Successfully</h2>
          <p className="text-gray-400">Your relief request has been received and is being processed.</p>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-gray-400 mb-1">Your Request ID:</p>
          <p className="text-xl font-mono font-bold">{requestId}</p>
          <p className="text-sm text-gray-400 mt-2">
            Please save this ID for tracking your request status.
          </p>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={trackRequest} className="bg-blue-500 hover:bg-blue-600">
            Track Your Request
          </Button>
          <Button onClick={resetForm} variant="outline" className="border-gray-700 hover:bg-gray-800">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Request Relief Assistance</h1>
            <p className="text-gray-400">Submit a request for relief assistance during disasters or emergencies</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-800 border-gray-700 mb-6">
              <TabsTrigger value="new">New Request</TabsTrigger>
              <TabsTrigger value="track">Track Request</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                {!isSuccess ? (
                  <>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl">Relief Request Form</CardTitle>
                          <CardDescription>Please provide accurate information to help us assist you</CardDescription>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-sm">
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-700'}`}>1</div>
                          <div className={`h-0.5 w-8 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-700'}`}>2</div>
                          <div className={`h-0.5 w-8 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-gray-700'}`}>3</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit}>
                        {renderStepContent()}
                      </form>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                      {step > 1 && (
                        <Button 
                          type="button" 
                          onClick={prevStep}
                          variant="outline"
                          className="w-full sm:w-auto border-gray-700 hover:bg-gray-800"
                        >
                          Previous
                        </Button>
                      )}
                      
                      <div className="flex-1"></div>
                      
                      {step < 3 ? (
                        <Button 
                          type="button" 
                          onClick={nextStep}
                          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button 
                          type="submit" 
                          onClick={handleSubmit}
                          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            'Submit Request'
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </>
                ) : (
                  <CardContent>
                    {renderSuccessContent()}
                  </CardContent>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="track">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">Track Your Relief Request</CardTitle>
                  <CardDescription>Enter your request ID to check the status of your relief request</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="requestId">Request ID</Label>
                      <div className="flex gap-2">
                        <Input
                          id="requestId"
                          placeholder="Enter your request ID (e.g., REQ-123456)"
                          className="bg-gray-800/50 border-gray-700 flex-1"
                        />
                        <Button className="bg-blue-500 hover:bg-blue-600">
                          Track
                        </Button>
                      </div>
                    </div>
                    
                    <Alert className="bg-yellow-900/20 border-yellow-500">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <AlertTitle>Don't have your request ID?</AlertTitle>
                      <AlertDescription className="text-sm">
                        If you've lost your request ID, please contact our support team at 
                        <span className="text-blue-400"> support@reliefcybernet.org</span> or call 
                        <span className="text-blue-400"> (555) 123-4567</span> with your name and contact details.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <Alert className="bg-gray-800/50 border-gray-700">
              <Phone className="h-4 w-4 text-blue-400" />
              <AlertTitle>Need immediate help?</AlertTitle>
              <AlertDescription>
                For emergencies requiring immediate assistance, please call our 24/7 emergency hotline at 
                <span className="text-blue-400 font-bold"> (555) 911-HELP</span>.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRelief; 