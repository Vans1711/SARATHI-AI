import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  AlertTriangle, 
  Users, 
  Cpu, 
  MapPin, 
  ShieldAlert, 
  Heart,
  Clock,
  BarChart3,
  CheckCircle2,
  Zap,
  Phone,
  MessageSquare,
  Smartphone,
  Brain,
  Truck
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import Globe from '@/components/Globe';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [activeDisaster, setActiveDisaster] = useState(0);
  const [statProgress, setStatProgress] = useState({
    lives: 0,
    relief: 0,
    volunteers: 0,
    coverage: 0
  });

  useEffect(() => {
    console.log('Index component mounted');
    
    // Log any potential errors
    window.addEventListener('error', (event) => {
      console.error('Global error caught:', event.error);
    });
    
    // Animate stats on load
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setStatProgress(prev => {
          const newValues = {
            lives: Math.min(prev.lives + 2, 100),
            relief: Math.min(prev.relief + 1, 100),
            volunteers: Math.min(prev.volunteers + 3, 100),
            coverage: Math.min(prev.coverage + 1.5, 100)
          };
          
          if (Object.values(newValues).every(val => val >= 100)) {
            clearInterval(interval);
          }
          
          return newValues;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }, 500);
    
    // Rotate active disaster
    const disasterInterval = setInterval(() => {
      setActiveDisaster(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => {
      console.log('Index component unmounted');
      window.removeEventListener('error', () => {});
      clearTimeout(timer);
      clearInterval(disasterInterval);
    };
  }, []);

  console.log('Index component rendering');

  const recentDisasters = [
    {
      name: "Kerala Floods",
      location: "Kerala, India",
      affected: "1.8 million",
      status: "Active Relief",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Cyclone Amphan",
      location: "West Bengal, India",
      affected: "4.9 million",
      status: "Recovery Phase",
      image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Uttarakhand Landslides",
      location: "Uttarakhand, India",
      affected: "320,000",
      status: "Emergency Response",
      image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202108/Cham2_1200x768.jpeg?size=1200:675"
    }
  ];

  const impactStats = [
    { label: "Lives Saved", value: "12,450+", progress: statProgress.lives, icon: <Heart className="h-6 w-6 text-neon-red" /> },
    { label: "Relief Delivered", value: "85+ tons", progress: statProgress.relief, icon: <Truck className="h-6 w-6 text-neon-cyan" /> },
    { label: "Volunteers", value: "8,900+", progress: statProgress.volunteers, icon: <Users className="h-6 w-6 text-neon-blue" /> },
    { label: "Area Coverage", value: "78%", progress: statProgress.coverage, icon: <MapPin className="h-6 w-6 text-neon-red" /> }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute left-1/4 top-1/3 w-1/2 h-1/3 rounded-full bg-neon-blue opacity-5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/3 w-1/3 h-1/2 rounded-full bg-neon-red opacity-5 blur-3xl"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="neon-text-blue">SARATHI</span> AI
            </h1>
            <p className="text-gray-400 text-lg">
              AI-powered disaster relief coordination platform designed to save lives and optimize resource allocation during emergencies.
            </p>
            <div className="flex justify-center mt-8 gap-4">
              <Link to="/relief-map">
                <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white">
                  View Relief Map <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/emergency">
                <Button variant="destructive" className="bg-[#FF2E63] hover:bg-[#FF2E63]/90 sos-button">
                  <AlertTriangle className="mr-2 h-4 w-4" /> Emergency SOS
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Intelligent Disaster Response</h2>
              <p className="text-gray-400 mb-6">
                SARATHI AI leverages cutting-edge artificial intelligence to coordinate relief efforts, connect victims with resources, and save lives during critical emergencies.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center mt-1">
                    <Brain className="h-5 w-5 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI-Powered Decision Making</h3>
                    <p className="text-gray-400">Advanced algorithms analyze disaster data in real-time to optimize resource allocation and response strategies.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-neon-red/20 flex items-center justify-center mt-1">
                    <Smartphone className="h-5 w-5 text-neon-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Mobile SOS System</h3>
                    <p className="text-gray-400">Emergency alerts with precise location tracking to quickly dispatch help where it's needed most.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center mt-1">
                    <MessageSquare className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Real-time Communication</h3>
                    <p className="text-gray-400">Seamless coordination between victims, volunteers, and relief agencies through our integrated platform.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center h-[400px] relative animate-slide-in-right">
              <Globe />
            </div>
          </div>
        </div>
      </section>

      {/* Active Disasters Section */}
      <section className="py-16 px-4 bg-dark-lighter relative overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Active <span className="neon-text-blue">Disaster Zones</span>
          </h2>
          
          <div className="relative h-[400px] rounded-xl overflow-hidden glass-card">
            {recentDisasters.map((disaster, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === activeDisaster ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${disaster.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full ${disaster.status.includes('Emergency') ? 'bg-neon-red animate-pulse' : 'bg-neon-blue'} mr-2`}></div>
                    <span className="text-sm font-medium text-white/80">{disaster.status}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{disaster.name}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-neon-blue mr-2" />
                      <span className="text-white/80">{disaster.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-neon-red mr-2" />
                      <span className="text-white/80">{disaster.affected} affected</span>
                    </div>
                  </div>
                  <Link to="/relief-map">
                    <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white">
                      View Relief Efforts <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {recentDisasters.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-3 h-3 rounded-full transition-colors ${index === activeDisaster ? 'bg-neon-blue' : 'bg-white/30'}`}
                  onClick={() => setActiveDisaster(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="neon-text-blue">Impact</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-xl hover-lift">
                <div className="flex items-center mb-4">
                  <div className="mr-3">{stat.icon}</div>
                  <h3 className="text-xl font-bold">{stat.label}</h3>
                </div>
                <div className="text-3xl font-bold mb-3">{stat.value}</div>
                <Progress value={stat.progress} className="h-2 bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg hover-lift">
              <div className="w-12 h-12 rounded-full bg-[#4CC9F0]/20 flex items-center justify-center mb-4">
                <MapPin className="text-[#4CC9F0]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Mapping</h3>
              <p className="text-gray-400">Interactive maps showing disaster zones, relief centers, and evacuation routes.</p>
              <Link to="/relief-map" className="text-neon-blue hover:underline mt-4 inline-block">
                Explore Maps <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg hover-lift">
              <div className="w-12 h-12 rounded-full bg-[#4CC9F0]/20 flex items-center justify-center mb-4">
                <Users className="text-[#4CC9F0]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Volunteer Coordination</h3>
              <p className="text-gray-400">Efficiently manage and deploy volunteers where they're needed most.</p>
              <Link to="/volunteer" className="text-neon-blue hover:underline mt-4 inline-block">
                Join Volunteers <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg hover-lift">
              <div className="w-12 h-12 rounded-full bg-[#4CC9F0]/20 flex items-center justify-center mb-4">
                <Cpu className="text-[#4CC9F0]" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-400">Predictive analytics to optimize resource allocation and response strategies.</p>
              <Link to="/about" className="text-neon-blue hover:underline mt-4 inline-block">
                Learn More <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            How <span className="neon-text-blue">SARATHI AI</span> Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="h-8 w-8 text-neon-blue" />
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold">1</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Disaster Detection</h3>
              <p className="text-gray-400 text-center">AI systems monitor multiple data sources to detect disasters as they occur.</p>
              <div className="hidden md:block absolute top-1/2 right-[-30px] w-[60px] h-[2px] bg-neon-blue/30 z-10"></div>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="h-8 w-8 text-neon-blue" />
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold">2</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Data Analysis</h3>
              <p className="text-gray-400 text-center">Our AI analyzes the severity, affected areas, and resource requirements.</p>
              <div className="hidden md:block absolute top-1/2 right-[-30px] w-[60px] h-[2px] bg-neon-blue/30 z-10"></div>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-8 w-8 text-neon-blue" />
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold">3</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Resource Mobilization</h3>
              <p className="text-gray-400 text-center">Volunteers, supplies, and emergency services are coordinated and deployed.</p>
              <div className="hidden md:block absolute top-1/2 right-[-30px] w-[60px] h-[2px] bg-neon-blue/30 z-10"></div>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <CheckCircle2 className="h-8 w-8 text-neon-blue" />
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold">4</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Relief Delivery</h3>
              <p className="text-gray-400 text-center">Optimized routes ensure rapid delivery of aid to those who need it most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute left-1/4 top-1/3 w-1/2 h-1/3 rounded-full bg-neon-red opacity-5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/3 w-1/3 h-1/2 rounded-full bg-neon-blue opacity-5 blur-3xl"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="glass-card p-8 md:p-12 rounded-xl neon-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-gray-400 mb-6">
                  Join our network of volunteers, donate to support our mission, or learn more about how SARATHI AI is revolutionizing disaster response.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/volunteer">
                    <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white">
                      <Users className="mr-2 h-4 w-4" /> Become a Volunteer
                    </Button>
                  </Link>
                  <Link to="/donate">
                    <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                      <Heart className="mr-2 h-4 w-4" /> Donate Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 animate-pulse">
                  <Phone className="h-10 w-10 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Emergency Hotline</h3>
                <p className="text-2xl font-bold text-neon-blue">1800-SARATHI</p>
                <p className="text-gray-400 mt-2">Always ready to respond</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
