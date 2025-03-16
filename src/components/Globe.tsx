import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Globe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudRef = useRef<THREE.Mesh | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const markersRef = useRef<THREE.Group>(new THREE.Group());
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 6;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x4CC9F0, 3);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Add point light for the glow effect
    const pointLight = new THREE.PointLight(0x08D9D6, 2, 10);
    pointLight.position.set(-5, 2, 2);
    scene.add(pointLight);

    // Earth geometry and materials
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create a more sophisticated earth material with custom shaders
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x121212,
      emissive: 0x1a1a2e,
      specular: 0x4cc9f0,
      shininess: 15,
      transparent: true,
      opacity: 0.95,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    // Add glowing atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4CC9F0,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add outer energy field
    const energyGeometry = new THREE.SphereGeometry(2.4, 32, 32);
    const energyMaterial = new THREE.MeshBasicMaterial({
      color: 0x08D9D6,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      wireframe: true
    });
    const energyField = new THREE.Mesh(energyGeometry, energyMaterial);
    scene.add(energyField);

    // Add cloud layer
    const cloudGeometry = new THREE.SphereGeometry(2.05, 32, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    cloudRef.current = clouds;

    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });

    // Create random stars
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      
      // Keep stars outside the center area
      if (Math.sqrt(x*x + y*y + z*z) < 10) continue;
      
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Add a holographic circular grid floor below
    const gridGeometry = new THREE.CircleGeometry(5, 64);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x4CC9F0,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      wireframe: true
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = Math.PI / 2;
    grid.position.y = -3;
    scene.add(grid);

    // Add markers group to scene
    scene.add(markersRef.current);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 4;
    controls.maxDistance = 9;
    controlsRef.current = controls;

    // Add disaster markers
    addDisasterMarkers();

    // Handle resizing
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Rotate clouds slightly faster than earth
      if (cloudRef.current) {
        cloudRef.current.rotation.y += 0.0005;
      }

      // Rotate earth
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.0003;
      }

      // Pulse the energy field
      if (energyField) {
        energyField.scale.set(
          1 + Math.sin(Date.now() * 0.0005) * 0.03,
          1 + Math.sin(Date.now() * 0.0005) * 0.03,
          1 + Math.sin(Date.now() * 0.0005) * 0.03
        );
      }

      // Grid animation
      if (grid) {
        grid.rotation.z += 0.001;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // Function to add disaster markers
  const addDisasterMarkers = () => {
    if (!sceneRef.current) return;
    
    // Clear previous markers
    while (markersRef.current.children.length) {
      markersRef.current.remove(markersRef.current.children[0]);
    }
    
    // Example disaster data (in production this would come from an API)
    const disasters = [
      { lat: 19.0760, lon: 72.8777, type: 'flood', severity: 'high' }, // Mumbai
      { lat: 28.6139, lon: 77.2090, type: 'earthquake', severity: 'medium' }, // Delhi
      { lat: 40.7128, lon: -74.0060, type: 'hurricane', severity: 'high' }, // New York
      { lat: 35.6762, lon: 139.6503, type: 'tsunami', severity: 'medium' }, // Tokyo
      { lat: -33.8688, lon: 151.2093, type: 'wildfire', severity: 'low' }, // Sydney
      { lat: 13.0827, lon: 80.2707, type: 'flood', severity: 'high' }, // Chennai
      { lat: -1.2921, lon: 36.8219, type: 'drought', severity: 'medium' }, // Nairobi
    ];

    disasters.forEach((disaster) => {
      // Convert lat/lon to 3D coordinates
      const phi = (90 - disaster.lat) * (Math.PI / 180);
      const theta = (disaster.lon + 180) * (Math.PI / 180);
      
      const x = -(2 * Math.sin(phi) * Math.cos(theta));
      const y = 2 * Math.cos(phi);
      const z = 2 * Math.sin(phi) * Math.sin(theta);
      
      // Create marker
      let markerColor;
      switch (disaster.severity) {
        case 'high':
          markerColor = 0xFF2E63;
          break;
        case 'medium':
          markerColor = 0xF39C12;
          break;
        default:
          markerColor = 0x4CC9F0;
      }
      
      // Create marker group
      const markerGroup = new THREE.Group();
      markerGroup.position.set(x, y, z);
      markerGroup.lookAt(0, 0, 0);
      
      // Create central marker
      const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: markerColor });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      markerGroup.add(marker);
      
      // Add beam effect
      const beamGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 8);
      const beamMaterial = new THREE.MeshBasicMaterial({ 
        color: markerColor,
        transparent: true,
        opacity: 0.7
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.set(0, 0.25, 0);
      beam.rotation.x = Math.PI / 2;
      markerGroup.add(beam);
      
      // Create pulse ring effect
      const ringGeometry = new THREE.RingGeometry(0.06, 0.08, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: markerColor,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      markerGroup.add(ring);
      
      // Add marker group to the markers ref
      markersRef.current.add(markerGroup);
      
      // Animation for the ring (handled through closure)
      const startTime = Math.random() * 1000;
      const animateRing = () => {
        if (!ring || !markerGroup.parent) return;
        
        // Pulse animation
        const scale = 1 + Math.sin((Date.now() + startTime) * 0.005) * 0.5;
        ring.scale.set(scale, scale, scale);
        
        // Opacity animation
        ringMaterial.opacity = 0.7 - (scale - 1) * 0.5;
        
        requestAnimationFrame(animateRing);
      };
      
      animateRing();
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px] md:min-h-[500px]"
    />
  );
};

export default Globe;
