import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-1 text-[0.8125rem] font-semibold text-[var(--color-text-primary)] tracking-wide transition-colors uppercase shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
