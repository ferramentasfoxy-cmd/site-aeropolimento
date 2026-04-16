'use client';
import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hoverConfig = { x: 0, y: 0 };
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      isHovering = true;
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const x = (clientX - (rect.left + rect.width / 2)) * 0.4; // Magnético Range X
      const y = (clientY - (rect.top + rect.height / 2)) * 0.4; // Magnético Range Y

      // Anima o container
      gsap.to(container, {
        x: x,
        y: y,
        duration: 1,
        ease: "power3.out",
      });
      
      // Anima levemente o texto internamente em paralaxe inverso
      if (textRef.current) {
         gsap.to(textRef.current, {
           x: x * 0.5,
           y: y * 0.5,
           duration: 1,
           ease: "power3.out"
         });
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)", // Rebote elástico premium Apple
      });
      if (textRef.current) {
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
     }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="inline-block cursor-pointer w-fit">
      <Button {...props} className={cn("relative overflow-hidden group", className)}>
        <span ref={textRef} className="relative z-10 flex items-center">
          {children}
        </span>
        <div className="absolute inset-0 z-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </Button>
    </div>
  );
}
