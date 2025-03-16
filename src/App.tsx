import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Emergency from "./pages/Emergency";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import ReliefMap from "./pages/ReliefMap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VolunteerProfile from "./pages/VolunteerProfile";
import VolunteerTasks from "./pages/VolunteerTasks";
import RequestRelief from "./pages/RequestRelief";
import TrackRelief from "./pages/TrackRelief";
import EvacuationRoutes from "./pages/EvacuationRoutes";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Test from "./pages/Test";

// Create a client
const queryClient = new QueryClient();

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.error("Error caught in getDerivedStateFromError:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          maxWidth: '800px', 
          margin: '100px auto', 
          backgroundColor: '#1a1a1a', 
          color: 'white',
          border: '1px solid #FF2E63',
          borderRadius: '8px'
        }}>
          <h1 style={{ color: '#FF2E63', marginBottom: '20px' }}>Something went wrong</h1>
          <p style={{ marginBottom: '20px' }}>Error: {this.state.error && this.state.error.toString()}</p>
          <details style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
            <summary>Error Details</summary>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              backgroundColor: '#4CC9F0',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple fallback component
const SimplePage = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#121212',
    color: 'white'
  }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#4CC9F0' }}>Sarathi AI</h1>
    <p style={{ marginBottom: '2rem' }}>Loading application...</p>
    <div style={{ 
      padding: '20px', 
      border: '1px solid #4CC9F0', 
      borderRadius: '8px',
      maxWidth: '500px',
      backgroundColor: '#1a1a1a'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Troubleshooting Information</h2>
      <p>React version: {React.version}</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      <p>Environment: {import.meta.env.MODE}</p>
    </div>
  </div>
);

const App = () => {
  console.log("App component rendering");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("App useEffect running");
    // Set a timeout to show the simple page for a moment
    // This helps diagnose if the issue is with initial loading or with the routing
    try {
      const timer = setTimeout(() => {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error in App initialization:", error);
      setIsError(true);
      setErrorMessage(error.message || "Unknown error occurred");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    console.log("Rendering SimplePage");
    return <SimplePage />;
  }

  if (isError) {
    console.log("Rendering error page");
    return (
      <div style={{ 
        padding: '20px', 
        maxWidth: '800px', 
        margin: '100px auto', 
        backgroundColor: '#1a1a1a', 
        color: 'white',
        border: '1px solid #FF2E63',
        borderRadius: '8px'
      }}>
        <h1 style={{ color: '#FF2E63', marginBottom: '20px' }}>Initialization Error</h1>
        <p style={{ marginBottom: '20px' }}>The application failed to initialize: {errorMessage}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            backgroundColor: '#4CC9F0',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  console.log("Rendering main app with router");
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Navigate to="/" replace />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/test" element={<Test />} />
              <Route path="/about" element={<About />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/relief-map" element={<ReliefMap />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/volunteer-profile" element={<VolunteerProfile />} />
              <Route path="/volunteer-tasks" element={<VolunteerTasks />} />
              <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
              <Route path="/request-relief" element={<RequestRelief />} />
              <Route path="/track-relief" element={<TrackRelief />} />
              <Route path="/evacuation-routes" element={<EvacuationRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
