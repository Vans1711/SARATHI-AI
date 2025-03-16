
import React, { useState } from 'react';
import { Check, MapPin, User, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const HelpRequestForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    location: '',
    disasterType: '',
    peopleAffected: '',
    description: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const disasterTypes = [
    'Flood',
    'Earthquake',
    'Hurricane',
    'Wildfire',
    'Landslide',
    'Tsunami',
    'Other'
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormState(prev => ({ ...prev, disasterType: value }));
  };
  
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormState(prev => ({ 
            ...prev, 
            location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` 
          }));
        },
        () => {
          toast({
            title: "Location Detection Failed",
            description: "Please enter your location manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support location detection.",
        variant: "destructive"
      });
    }
  };
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Help Request Submitted",
        description: "Your request has been sent to nearby relief teams.",
      });
      
      // Reset form
      setFormState({
        name: '',
        location: '',
        disasterType: '',
        peopleAffected: '',
        description: '',
      });
      setCurrentStep(1);
    }, 1500);
  };
  
  return (
    <div className="glass-card p-6 md:p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Request Assistance</h2>
      
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step < currentStep 
                  ? 'bg-neon-blue text-white' 
                  : step === currentStep 
                  ? 'bg-white/10 border border-neon-blue text-white' 
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              {step < currentStep ? <Check size={16} /> : step}
            </div>
            <span className="text-xs mt-1 text-gray-400">
              {step === 1 ? 'Info' : step === 2 ? 'Details' : 'Submit'}
            </span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="name">Your Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="bg-black/30 border-white/10 pl-10"
                  placeholder="Enter your full name"
                  required
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="location">Your Location</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="location"
                    name="location"
                    value={formState.location}
                    onChange={handleChange}
                    className="bg-black/30 border-white/10 pl-10"
                    placeholder="City or coordinates"
                    required
                  />
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  className="border-neon-blue text-neon-blue"
                  onClick={handleDetectLocation}
                >
                  <MapPin size={18} />
                </Button>
              </div>
            </div>
            
            <Button 
              type="button" 
              className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan hover:opacity-90"
              onClick={nextStep}
            >
              Continue
            </Button>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Disaster Type</Label>
              <Select onValueChange={handleSelectChange} value={formState.disasterType}>
                <SelectTrigger className="bg-black/30 border-white/10">
                  <SelectValue placeholder="Select disaster type" />
                </SelectTrigger>
                <SelectContent>
                  {disasterTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="peopleAffected">People Affected</Label>
              <Input
                id="peopleAffected"
                name="peopleAffected"
                type="number"
                value={formState.peopleAffected}
                onChange={handleChange}
                className="bg-black/30 border-white/10"
                placeholder="Approximate number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="description">Situation Details</Label>
              <div className="relative">
                <Textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  className="bg-black/30 border-white/10 pl-10 min-h-[100px]"
                  placeholder="Describe your current situation and needs"
                  required
                />
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 border-white/20 text-white"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button 
                type="button" 
                className="flex-1 bg-gradient-to-r from-neon-blue to-neon-cyan hover:opacity-90"
                onClick={nextStep}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium text-white mb-3">Confirm Your Request</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{formState.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white">{formState.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Disaster Type:</span>
                  <span className="text-white">{formState.disasterType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">People Affected:</span>
                  <span className="text-white">{formState.peopleAffected}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <h4 className="text-xs text-gray-400 uppercase mb-1">Description</h4>
                <p className="text-white text-sm bg-black/40 p-2 rounded">
                  {formState.description || "No description provided."}
                </p>
              </div>
            </div>
            
            <div className="bg-black/30 p-3 rounded-lg border border-neon-blue/30 flex items-center">
              <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3">
                <Check className="h-4 w-4 text-neon-blue" />
              </div>
              <div className="text-xs text-gray-300">
                By submitting, you confirm this is a genuine request for assistance.
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 border-white/20 text-white"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-neon-blue to-neon-cyan hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default HelpRequestForm;
