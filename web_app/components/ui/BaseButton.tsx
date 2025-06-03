import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
            w-full
            rounded-full
            bg-gradient2
            border
            border-transparent
            px-3
            py-3
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-tertiary
            font-bold
            hover:opacity-75
            transition
          `,
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BaseButton.displayName = "BaseButton";

export default BaseButton;
