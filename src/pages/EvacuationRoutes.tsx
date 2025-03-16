import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MapPin, Navigation, AlertTriangle, Info, Route } from "lucide-react";
import { Layout } from "@/components/Layout";

const EvacuationRoutes = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">Evacuation Routes</h1>
        <p className="text-lg mb-8">Find safe evacuation routes during emergencies and disasters.</p>
        
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">Route List</TabsTrigger>
            <TabsTrigger value="info">Safety Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Evacuation Map</CardTitle>
                <CardDescription>View and navigate evacuation routes in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted h-[400px] rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                    <p className="text-sm text-muted-foreground mt-2">We're working on implementing a real-time evacuation route map.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Button className="flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    Find Nearest Route
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Report Blocked Route
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Evacuation Routes</CardTitle>
                <CardDescription>List of predefined evacuation routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((route) => (
                    <div key={route} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Route {route}</h3>
                          <p className="text-sm text-muted-foreground">City Center → Eastern Safe Zone</p>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center gap-2 text-sm">
                        <Route className="h-4 w-4" />
                        <span>Distance: 5.2 km</span>
                        <span>•</span>
                        <span>Est. Time: 45 min (walking)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Evacuation Safety Information</CardTitle>
                <CardDescription>Important guidelines for safe evacuation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Info className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Before Evacuation</h3>
                      <p className="text-sm text-muted-foreground">Gather emergency supplies, secure your home, and follow official instructions.</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-4">
                    <Info className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">During Evacuation</h3>
                      <p className="text-sm text-muted-foreground">Stay on designated routes, help others if possible, and keep updated with emergency broadcasts.</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-4">
                    <Info className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">At Evacuation Centers</h3>
                      <p className="text-sm text-muted-foreground">Register with authorities, follow center rules, and stay informed about the situation.</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6">Download Evacuation Guide (PDF)</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EvacuationRoutes; 