import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div 
      className={`w-full max-w-[1440px] mx-auto px-4 md:px-16 lg:px-20 xl:px-24 ${className}`}
    >
      {children}
    </div>
  );
}