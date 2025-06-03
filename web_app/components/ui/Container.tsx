import React from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className
}) => {
  return (
    <div
      className={twMerge(
        `
          bg-background
          rounded-lg
          h-fit
          w-full
          border
          border-neutral-800/50
          shadow-sm
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
