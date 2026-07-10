import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full py-3 px-4 rounded-xl font-semibold tracking-wide transition-all duration-300 active:scale-95 text-sm uppercase",
          variant === "primary" && "bg-brand-neon text-background hover:bg-opacity-90 shadow-[0_0_20px_rgba(204,255,0,0.2)]",
          variant === "secondary" && "bg-surface text-white hover:bg-zinc-800 border border-zinc-800",
          variant === "outline" && "bg-transparent border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-background",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";