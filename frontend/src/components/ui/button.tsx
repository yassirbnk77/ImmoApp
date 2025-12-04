import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "solid", ...props }, ref) => {
    const baseStyle =
      "inline-flex items-center justify-center rounded-md h-10 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    let colorStyle = "";

    if (variant === "solid") {
      // style noir (par défaut)
      colorStyle = "bg-slate-900 text-white hover:bg-slate-800";
    } else if (variant === "outline") {
      // style blanc avec bordure
      colorStyle =
        "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100";
    }

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${colorStyle} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
