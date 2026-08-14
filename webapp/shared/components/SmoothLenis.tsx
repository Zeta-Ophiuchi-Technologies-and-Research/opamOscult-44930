"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root 
    
    options={{
    duration: 2, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential out
    
    // 2. Control input multipliers for weighted deceleration 
    wheelMultiplier: 1.1,
    touchMultiplier: 1.5, // Enhances mobile momentum if smoothTouch is enabled
    
    // 3. Prevent micro-stuttering
    infinite: false,
    orientation: 'vertical', // 'vertical' or 'horizontal'
    gestureOrientation: 'vertical',
    
    // 4. Fine-tune physics boundaries
    smoothWheel: true,
    
    // 5. Set the smoothing factor used by Lenis' internal interpolation.
    lerp: 0.08,
  }}
    >
      {children}
    </ReactLenis>
  );
}
