import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Layout } from '@/components/Layout';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Heart, 
  MapPin, 
  Medal, 
  ShieldCheck, 
  Truck, 
  Users 
} from 'lucide-react';

const Volunteer = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    availability: '',
    experience: '',
    emergencyContact: '',
    emergencyPhone: '',
    transportation: '',
    additionalInfo: '',
    termsAccepted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, termsAccepted: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const skills = [...prev.skills] as string[];
      if (skills.includes(skill)) {
        return { ...prev, skills: skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...skills, skill] };
      }
    });
  };

  const nextStep = () => {
    if (formStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields to continue.",
          variant: "destructive"
        });
        return;
      }
    }
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Registration Successful!",
      description: "Thank you for volunteering with SARATHI AI. We'll contact you soon.",
    });
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      skills: [],
      availability: '',
      experience: '',
      emergencyContact: '',
      emergencyPhone: '',
      transportation: '',
      additionalInfo: '',
      termsAccepted: false
    });
    setFormStep(1);
  };

  const volunteerBenefits = [
    {
      icon: <Heart className="h-10 w-10 text-neon-red" />,
      title: "Make a Real Impact",
      description: "Your efforts directly help those affected by disasters, potentially saving lives."
    },
    {
      icon: <Users className="h-10 w-10 text-neon-blue" />,
      title: "Join a Community",
      description: "Connect with like-minded individuals committed to making a difference."
    },
    {
      icon: <Medal className="h-10 w-10 text-neon-cyan" />,
      title: "Gain Experience",
      description: "Develop valuable skills in emergency response and disaster management."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-neon-blue" />,
      title: "AI-Powered Support",
      description: "Our AI system helps optimize your volunteer efforts for maximum impact."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Volunteer with <span className="neon-text-blue">SARATHI AI</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Join our network of dedicated volunteers and make a real difference during disaster situations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Volunteer With Us?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {volunteerBenefits.map((benefit, index) => (
                  <div key={index} className="glass-card p-5 rounded-xl hover:translate-y-[-5px] transition-all duration-300">
                    <div className="mb-3">{benefit.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl neon-border">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Volunteer Registration</h2>
                <p className="text-gray-400">Fill out the form below to join our volunteer network.</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                {formStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-neon-blue" /> 
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="bg-dark-lighter border-white/10 text-white"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="bg-dark-lighter border-white/10 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-dark-lighter border-white/10 text-white"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-dark-lighter border-white/10 text-white"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="bg-dark-lighter border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="bg-dark-lighter border-white/10 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="bg-dark-lighter border-white/10 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2 col-span-2 sm:col-span-1">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="bg-dark-lighter border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {formStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Users className="mr-2 h-5 w-5 text-neon-blue" /> 
                      Skills & Availability
                    </h3>
                    
                    <div className="space-y-2">
                      <Label>Skills & Expertise</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "First Aid", "Search & Rescue", "Medical", "Logistics", 
                          "Communications", "Transportation", "Technical", "Cooking"
                        ].map(skill => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`skill-${skill}`} 
                              checked={(formData.skills as string[]).includes(skill)}
                              onCheckedChange={() => handleSkillToggle(skill)}
                            />
                            <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <RadioGroup 
                        value={formData.availability} 
                        onValueChange={(value) => handleSelectChange('availability', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekdays" id="weekdays" />
                          <Label htmlFor="weekdays">Weekdays</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekends" id="weekends" />
                          <Label htmlFor="weekends">Weekends</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="anytime" id="anytime" />
                          <Label htmlFor="anytime">Anytime</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="emergency-only" id="emergency-only" />
                          <Label htmlFor="emergency-only">Emergency Only</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Previous Experience</Label>
                      <Select 
                        value={formData.experience} 
                        onValueChange={(value) => handleSelectChange('experience', value)}
                      >
                        <SelectTrigger className="bg-dark-lighter border-white/10 text-white">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No previous experience</SelectItem>
                          <SelectItem value="some">Some experience (1-2 years)</SelectItem>
                          <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                          <SelectItem value="expert">Expert (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transportation">Transportation</Label>
                      <Select 
                        value={formData.transportation} 
                        onValueChange={(value) => handleSelectChange('transportation', value)}
                      >
                        <SelectTrigger className="bg-dark-lighter border-white/10 text-white">
                          <SelectValue placeholder="Select transportation option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="own-vehicle">Own vehicle</SelectItem>
                          <SelectItem value="public">Public transportation</SelectItem>
                          <SelectItem value="need-transport">Need transportation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {formStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <ShieldCheck className="mr-2 h-5 w-5 text-neon-blue" /> 
                      Emergency Contact & Additional Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="bg-dark-lighter border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="bg-dark-lighter border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="bg-dark-lighter border-white/10 text-white min-h-[100px]"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>
                    
                    <div className="flex items-start space-x-2 pt-4">
                      <Checkbox 
                        id="terms" 
                        checked={formData.termsAccepted}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the terms and conditions, including being contacted for volunteer opportunities and emergency situations.
                      </Label>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  {formStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Back
                    </Button>
                  )}
                  
                  {formStep < 3 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="bg-neon-blue hover:bg-neon-blue/90 text-white ml-auto"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-neon-blue hover:bg-neon-blue/90 text-white ml-auto"
                    >
                      Submit
                    </Button>
                  )}
                </div>
                
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-2">
                    {[1, 2, 3].map(step => (
                      <div 
                        key={step}
                        className={`w-3 h-3 rounded-full ${formStep === step ? 'bg-neon-blue' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Volunteer Opportunities Section */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Current <span className="neon-text-blue">Opportunities</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Flood Relief Coordinator",
                location: "Mumbai, Maharashtra",
                timeCommitment: "10-15 hours/week",
                icon: <MapPin className="h-5 w-5 text-neon-blue" />,
                urgency: "High"
              },
              {
                title: "Medical Volunteer",
                location: "Chennai, Tamil Nadu",
                timeCommitment: "5-10 hours/week",
                icon: <Heart className="h-5 w-5 text-neon-red" />,
                urgency: "Medium"
              },
              {
                title: "Logistics Coordinator",
                location: "Delhi NCR",
                timeCommitment: "8-12 hours/week",
                icon: <Truck className="h-5 w-5 text-neon-cyan" />,
                urgency: "Medium"
              },
              {
                title: "Communications Specialist",
                location: "Remote",
                timeCommitment: "5-8 hours/week",
                icon: <Users className="h-5 w-5 text-neon-blue" />,
                urgency: "Low"
              },
              {
                title: "Emergency Response Team",
                location: "Kolkata, West Bengal",
                timeCommitment: "On-call",
                icon: <ShieldCheck className="h-5 w-5 text-neon-red" />,
                urgency: "High"
              },
              {
                title: "Technical Support",
                location: "Remote",
                timeCommitment: "3-5 hours/week",
                icon: <CheckCircle2 className="h-5 w-5 text-neon-cyan" />,
                urgency: "Low"
              }
            ].map((opportunity, index) => (
              <div key={index} className="glass-card p-6 rounded-xl hover:translate-y-[-5px] transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{opportunity.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    opportunity.urgency === 'High' ? 'bg-neon-red/20 text-neon-red' :
                    opportunity.urgency === 'Medium' ? 'bg-neon-cyan/20 text-neon-cyan' :
                    'bg-neon-blue/20 text-neon-blue'
                  }`}>
                    {opportunity.urgency} Priority
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{opportunity.timeCommitment}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-dark-lighter hover:bg-white/10 border border-white/10">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Volunteer <span className="neon-text-blue">Testimonials</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Being part of SARATHI AI's volunteer network has been incredibly rewarding. The AI-powered coordination makes our efforts so much more effective.",
                name: "Priya Sharma",
                role: "Medical Volunteer",
                image: "https://randomuser.me/api/portraits/women/45.jpg"
              },
              {
                quote: "I've volunteered with many organizations, but none as technologically advanced as SARATHI AI. The platform makes it easy to know exactly where help is needed most.",
                name: "Rahul Patel",
                role: "Logistics Coordinator",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "The real-time updates and AI-powered route optimization have helped our team reach affected areas faster than ever before. It's truly revolutionary.",
                name: "Ananya Desai",
                role: "Emergency Response Team",
                image: "https://randomuser.me/api/portraits/women/63.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <div className="flex flex-col h-full">
                  <div className="mb-6 flex-grow">
                    <p className="text-gray-400 italic">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-neon-blue text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-gray-500">
          <p>© 2023 SARATHI AI. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Volunteer; 