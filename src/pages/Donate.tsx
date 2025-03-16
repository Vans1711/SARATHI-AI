import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Layout } from '@/components/Layout';
import { 
  ArrowRight, 
  CheckCircle2, 
  CreditCard, 
  DollarSign, 
  Gift, 
  Heart, 
  Home, 
  LifeBuoy, 
  Link, 
  Shield, 
  Truck, 
  Wallet 
} from 'lucide-react';

const Donate = () => {
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  
  const handleDonationAmountChange = (value: string) => {
    setDonationAmount(value);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount('custom');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = donationAmount === 'custom' ? customAmount : donationAmount;
    
    if (!amount || (donationAmount === 'custom' && !customAmount)) {
      toast({
        title: "Donation Amount Required",
        description: "Please select or enter a donation amount.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isAnonymous && (!donorName || !donorEmail)) {
      toast({
        title: "Information Required",
        description: "Please provide your name and email to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate donation processing
    toast({
      title: "Donation Successful!",
      description: `Thank you for your ${isRecurring ? 'monthly' : 'one-time'} donation of ₹${amount}. Your contribution will help save lives.`,
    });
    
    // Reset form
    setDonationAmount('');
    setCustomAmount('');
    setDonorName('');
    setDonorEmail('');
    setPaymentMethod('card');
    setIsAnonymous(false);
    setIsRecurring(false);
  };
  
  const ongoingCampaigns = [
    {
      title: "Kerala Flood Relief",
      raised: 1250000,
      goal: 2000000,
      donors: 1245,
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Cyclone Amphan Recovery",
      raised: 890000,
      goal: 1500000,
      donors: 876,
      image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Uttarakhand Landslide Relief",
      raised: 650000,
      goal: 1000000,
      donors: 542,
      image: "https://images.unsplash.com/photo-1581335438722-5cf0c9c8c01b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
  ];
  
  const impactStats = [
    {
      icon: <Home className="h-10 w-10 text-neon-blue" />,
      value: "5,280+",
      label: "Families Sheltered"
    },
    {
      icon: <LifeBuoy className="h-10 w-10 text-neon-red" />,
      value: "12,450+",
      label: "Lives Saved"
    },
    {
      icon: <Truck className="h-10 w-10 text-neon-cyan" />,
      value: "85+",
      label: "Tons of Relief Supplies"
    },
    {
      icon: <Heart className="h-10 w-10 text-neon-red" />,
      value: "8,900+",
      label: "Donors"
    }
  ];
  
  const recentTransactions = [
    { name: "Rahul M.", amount: "₹5,000", date: "2 hours ago", verified: true },
    { name: "Anonymous", amount: "₹10,000", date: "5 hours ago", verified: true },
    { name: "Priya S.", amount: "₹2,500", date: "Yesterday", verified: true },
    { name: "Vikram J.", amount: "₹15,000", date: "2 days ago", verified: true },
    { name: "Anonymous", amount: "₹1,000", date: "3 days ago", verified: true }
  ];

  return (
    <Layout>
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Donate to <span className="neon-text-blue">SARATHI AI</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Your contribution helps us provide critical disaster relief and save lives. Every donation is tracked transparently on our blockchain system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="glass-card p-6 rounded-xl neon-border order-2 lg:order-1">
              <Tabs defaultValue="one-time" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="one-time"
                    onClick={() => setIsRecurring(false)}
                    className="data-[state=active]:bg-neon-blue data-[state=active]:text-white"
                  >
                    One-Time Donation
                  </TabsTrigger>
                  <TabsTrigger 
                    value="monthly"
                    onClick={() => setIsRecurring(true)}
                    className="data-[state=active]:bg-neon-blue data-[state=active]:text-white"
                  >
                    Monthly Donation
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="one-time" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Select Donation Amount</Label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {['500', '1000', '2500', '5000', '10000', 'custom'].map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={donationAmount === amount ? "default" : "outline"}
                            onClick={() => handleDonationAmountChange(amount)}
                            className={`h-14 ${
                              donationAmount === amount 
                                ? 'bg-neon-blue text-white' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            {amount === 'custom' ? 'Custom' : `₹${amount}`}
                          </Button>
                        ))}
                      </div>
                      
                      {donationAmount === 'custom' && (
                        <div className="mb-4">
                          <Label htmlFor="customAmount">Enter Amount (₹)</Label>
                          <div className="relative mt-1">
                            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="customAmount"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              className="pl-10 bg-dark-lighter border-white/10 text-white"
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(!isAnonymous)}
                          className="rounded border-white/20 bg-dark-lighter text-neon-blue focus:ring-neon-blue"
                        />
                        <Label htmlFor="anonymous">Donate Anonymously</Label>
                      </div>
                      
                      {!isAnonymous && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="donorName">Your Name</Label>
                            <Input
                              id="donorName"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              className="bg-dark-lighter border-white/10 text-white"
                              placeholder="Enter your name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="donorEmail">Email Address</Label>
                            <Input
                              id="donorEmail"
                              type="email"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              className="bg-dark-lighter border-white/10 text-white"
                              placeholder="Enter your email"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Payment Method</Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-1 md:grid-cols-3 gap-3"
                      >
                        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                          paymentMethod === 'card' ? 'border-neon-blue bg-neon-blue/10' : 'border-white/10'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="cursor-pointer">Credit Card</Label>
                          </div>
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                          paymentMethod === 'upi' ? 'border-neon-blue bg-neon-blue/10' : 'border-white/10'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="cursor-pointer">UPI</Label>
                          </div>
                          <Wallet className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                          paymentMethod === 'crypto' ? 'border-neon-blue bg-neon-blue/10' : 'border-white/10'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="crypto" id="crypto" />
                            <Label htmlFor="crypto" className="cursor-pointer">Crypto</Label>
                          </div>
                          <Link className="h-5 w-5 text-gray-400" />
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white h-12 text-lg"
                      >
                        Donate Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      
                      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
                        <Shield className="h-4 w-4" />
                        <span>Secure payment with blockchain verification</span>
                      </div>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Select Monthly Donation Amount</Label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {['500', '1000', '2500', '5000', '10000', 'custom'].map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={donationAmount === amount ? "default" : "outline"}
                            onClick={() => handleDonationAmountChange(amount)}
                            className={`h-14 ${
                              donationAmount === amount 
                                ? 'bg-neon-blue text-white' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            {amount === 'custom' ? 'Custom' : `₹${amount}`}
                          </Button>
                        ))}
                      </div>
                      
                      {donationAmount === 'custom' && (
                        <div className="mb-4">
                          <Label htmlFor="customAmountMonthly">Enter Monthly Amount (₹)</Label>
                          <div className="relative mt-1">
                            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="customAmountMonthly"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              className="pl-10 bg-dark-lighter border-white/10 text-white"
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="anonymousMonthly"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(!isAnonymous)}
                          className="rounded border-white/20 bg-dark-lighter text-neon-blue focus:ring-neon-blue"
                        />
                        <Label htmlFor="anonymousMonthly">Donate Anonymously</Label>
                      </div>
                      
                      {!isAnonymous && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="donorNameMonthly">Your Name</Label>
                            <Input
                              id="donorNameMonthly"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              className="bg-dark-lighter border-white/10 text-white"
                              placeholder="Enter your name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="donorEmailMonthly">Email Address</Label>
                            <Input
                              id="donorEmailMonthly"
                              type="email"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              className="bg-dark-lighter border-white/10 text-white"
                              placeholder="Enter your email"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Payment Method</Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-1 md:grid-cols-3 gap-3"
                      >
                        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                          paymentMethod === 'card' ? 'border-neon-blue bg-neon-blue/10' : 'border-white/10'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="cardMonthly" />
                            <Label htmlFor="cardMonthly" className="cursor-pointer">Credit Card</Label>
                          </div>
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                          paymentMethod === 'upi' ? 'border-neon-blue bg-neon-blue/10' : 'border-white/10'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="upi" id="upiMonthly" />
                            <Label htmlFor="upiMonthly" className="cursor-pointer">UPI</Label>
                          </div>
                          <Wallet className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        <div className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                          paymentMethod === 'crypto' ? 'border-neon-blue bg-neon-blue/10' : 'border-white/10'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="crypto" id="cryptoMonthly" />
                            <Label htmlFor="cryptoMonthly" className="cursor-pointer">Crypto</Label>
                          </div>
                          <Link className="h-5 w-5 text-gray-400" />
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white h-12 text-lg"
                      >
                        Start Monthly Donation <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      
                      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
                        <Shield className="h-4 w-4" />
                        <span>Secure recurring payment with blockchain verification</span>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Impact</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {impactStats.map((stat, index) => (
                  <div key={index} className="glass-card p-5 rounded-xl text-center">
                    <div className="flex justify-center mb-3">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="glass-card p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Link className="mr-2 h-5 w-5 text-neon-blue" /> Blockchain Verified Donations
                </h3>
                <p className="text-gray-400 mb-4">
                  All donations are recorded on our transparent blockchain ledger, ensuring your contribution is tracked and used for its intended purpose.
                </p>
                <div className="space-y-4">
                  {recentTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-white/10">
                      <div>
                        <div className="font-medium">{tx.name}</div>
                        <div className="text-sm text-gray-400">{tx.date}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold mr-2">{tx.amount}</span>
                        {tx.verified && <CheckCircle2 className="h-4 w-4 text-neon-blue" />}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-white/20 text-white hover:bg-white/10">
                  View All Transactions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Current <span className="neon-text-blue">Relief Campaigns</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ongoingCampaigns.map((campaign, index) => (
              <div key={index} className="glass-card rounded-xl overflow-hidden hover:translate-y-[-5px] transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Raised: ₹{(campaign.raised / 100000).toFixed(1)}L</span>
                      <span>Goal: ₹{(campaign.goal / 100000).toFixed(1)}L</span>
                    </div>
                    <Progress 
                      value={(campaign.raised / campaign.goal) * 100} 
                      className="h-2 bg-white/10"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-400">
                      <span className="text-neon-blue font-bold">{campaign.donors}</span> Donors
                    </div>
                    <div className="text-sm text-gray-400">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% Complete
                    </div>
                  </div>
                  
                  <Button className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white">
                    <Gift className="mr-2 h-4 w-4" /> Donate Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Complete <span className="neon-text-blue">Transparency</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Our blockchain-backed donation system ensures complete transparency in how your contributions are utilized. Track every rupee from donation to deployment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-neon-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Blockchain</h3>
              <p className="text-gray-400">
                All donations are securely recorded on an immutable blockchain ledger, ensuring transparency and accountability.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center mx-auto mb-4">
                <Link className="h-8 w-8 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Your Impact</h3>
              <p className="text-gray-400">
                Follow your donation's journey from receipt to deployment in the field with our real-time tracking system.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 rounded-full bg-neon-red/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-neon-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Impact Reports</h3>
              <p className="text-gray-400">
                Receive detailed reports showing exactly how your donation has helped disaster victims and relief efforts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-gray-500">
          <p>© 2023 SARATHI AI. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Donate; 