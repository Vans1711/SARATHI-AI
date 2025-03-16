import React, { useState } from 'react';
import { AlertTriangle, X, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export const SOSButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setStep(1);
    setIsSuccess(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Reset form after a delay
    setTimeout(() => {
      setStep(1);
      setLocation('');
      setPhone('');
      setDescription('');
      setIsSuccess(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <>
      <Button 
        onClick={handleOpenDialog}
        className="sos-button text-white font-bold"
        size="lg"
      >
        <AlertTriangle className="mr-2 h-5 w-5" />
        SOS Emergency
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-card border-white/10 text-white max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-neon-red" />
                Emergency SOS
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCloseDialog}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-gray-400">
              {isSuccess 
                ? "Your emergency alert has been sent. Help is on the way."
                : "Send an emergency alert to nearby rescue teams."}
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Alert Sent Successfully</h3>
              <p className="text-gray-400 mb-6">
                Your emergency alert has been dispatched to all nearby rescue teams. 
                Stay in your current location if safe. Help is on the way.
              </p>
              <Button 
                onClick={handleCloseDialog}
                className="bg-neon-blue hover:bg-neon-blue/90 text-white"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
              {step === 1 && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 bg-dark-lighter border-white/10 text-white"
                        required
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="mt-1 text-xs border-neon-blue text-neon-blue hover:bg-neon-blue/10"
                    >
                      <MapPin className="mr-1 h-3 w-3" />
                      Use Current Location
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 bg-dark-lighter border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Emergency Details</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="description"
                        placeholder="Describe your emergency situation"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="pl-10 min-h-[100px] bg-dark-lighter border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:space-x-0">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep}
                    className="border-white/10 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                )}
                
                <Button 
                  type={step === 3 ? "submit" : "button"}
                  disabled={isSubmitting}
                  className={step === 3 ? "bg-neon-red hover:bg-neon-red/90 text-white" : "bg-neon-blue hover:bg-neon-blue/90 text-white"}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : step === 3 ? (
                    <>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Send SOS Alert
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
