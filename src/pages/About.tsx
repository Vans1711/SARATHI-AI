import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Brain, 
  Cpu, 
  Globe, 
  Heart, 
  LifeBuoy, 
  Lightbulb, 
  Shield, 
  Smartphone, 
  Zap 
} from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="neon-text-blue">SARATHI AI</span>
            </h1>
            <p className="text-gray-400 text-lg">
              An AI-powered disaster relief coordination platform designed to save lives and optimize resource allocation during emergencies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-400 mb-6">
                SARATHI AI was created with a singular purpose: to revolutionize disaster response by leveraging cutting-edge artificial intelligence to coordinate relief efforts, connect victims with resources, and save lives during critical emergencies.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why We Built This</h2>
              <p className="text-gray-400 mb-6">
                Traditional disaster response systems often struggle with coordination, real-time data processing, and resource allocation. We built SARATHI AI to address these challenges by creating an intelligent system that can process vast amounts of information, make smart decisions, and connect those in need with those who can help—all in real-time.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/volunteer">
                  <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white transition-all duration-300">
                    <Heart className="mr-2 h-4 w-4" /> Join Our Mission
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all duration-300">
                    <Shield className="mr-2 h-4 w-4" /> Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="order-1 md:order-2 glass-card p-6 rounded-xl neon-border">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-dark-lighter">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-neon-blue/10 animate-pulse flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-neon-blue/20 animate-pulse flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-neon-blue/30 animate-pulse flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-neon-blue flex items-center justify-center text-white">
                          <Brain size={40} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key <span className="neon-text-blue">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="h-10 w-10 text-neon-blue" />,
                title: "AI-Powered Analysis",
                description: "Our advanced AI algorithms analyze disaster data in real-time to identify patterns, predict outcomes, and optimize resource allocation."
              },
              {
                icon: <AlertTriangle className="h-10 w-10 text-neon-red" />,
                title: "Smart SOS Filtering",
                description: "AI scans social media, WhatsApp & SMS help requests to filter fake or duplicate alerts using Natural Language Processing."
              },
              {
                icon: <Globe className="h-10 w-10 text-neon-cyan" />,
                title: "Interactive Relief Map",
                description: "Real-time visualization of affected areas, response teams, and available resources for optimal coordination."
              },
              {
                icon: <Smartphone className="h-10 w-10 text-neon-blue" />,
                title: "Offline Emergency System",
                description: "USSD-based & SMS Emergency System for network blackout zones, ensuring help reaches even in connectivity-challenged areas."
              },
              {
                icon: <Zap className="h-10 w-10 text-neon-cyan" />,
                title: "Route Optimization",
                description: "AI calculates fastest, safest routes for rescue teams in real-time, avoiding blocked roads using satellite data."
              },
              {
                icon: <Lightbulb className="h-10 w-10 text-neon-red" />,
                title: "Early Warning System",
                description: "Predictive analytics to forecast potential disasters and send alerts to help communities prepare in advance."
              },
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-xl hover:translate-y-[-5px] transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="neon-text-blue">Team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Vanshika Tyagi",
                role: "AI Research Lead"
              },
              {
                name: "Sneha Negi",
                role: "Emergency Response Expert"
              },
              {
                name: "Tanisha Bhatnagar",
                role: "UX/UI Designer"
              }
            ].map((member, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center hover:translate-y-[-5px] transition-all duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 neon-border bg-neon-blue/20 flex items-center justify-center">
                  <Cpu className="h-12 w-12 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-neon-blue">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Making a <span className="neon-text-blue">Difference</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Whether you're a volunteer, donor, or someone in need of assistance, SARATHI AI is here to connect and coordinate disaster relief efforts efficiently.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/volunteer">
              <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white transition-all duration-300">
                <LifeBuoy className="mr-2 h-4 w-4" /> Volunteer Now
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all duration-300">
                <Heart className="mr-2 h-4 w-4" /> Donate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About; 