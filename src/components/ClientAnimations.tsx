"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ClientAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fadeIn" | "slideUp" | "scale" | "none";
  delay?: number;
}

export default function ClientAnimations({ 
  children, 
  className = "", 
  animationType = "fadeIn",
  delay = 0 
}: ClientAnimationsProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay }
    },
    none: {
      initial: {},
      animate: {},
      transition: {}
    }
  };

  const animation = animations[animationType];

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  );
}
