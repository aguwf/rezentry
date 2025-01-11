import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { FC } from "react";
import { useRef } from "react";

interface NaturalFloatingProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yDistance?: number;
  rotationDegree?: number;
  delay?: number;
}

const NaturalFloating: FC<NaturalFloatingProps> = ({ 
  children, 
  className,
  duration = 3,
  yDistance = 20,
  rotationDegree = 2,
  delay = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add slight randomization to make each instance unique
    const randomOffset = Math.random() * 0.5;
    const finalDuration = duration + randomOffset;
    const finalDelay = delay + randomOffset;

    // Create a timeline for smooth animation
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: finalDelay
    });

    // Add animations to the timeline with randomized values
    tl.to(element, {
      y: yDistance,
      rotation: rotationDegree,
      duration: finalDuration,
      ease: "sine.inOut"
    })
    .to(element, {
      y: -yDistance,
      rotation: -rotationDegree,
      duration: finalDuration,
      ease: "sine.inOut"
    });
  }, [duration, yDistance, rotationDegree, delay]);

  return (
    <div
      className={className}
      ref={elementRef} 
      style={{ 
        display: 'inline-block',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default NaturalFloating;