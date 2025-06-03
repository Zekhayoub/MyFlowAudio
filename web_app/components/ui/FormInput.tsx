import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        `
          flex
          w-full
          rounded-md
          bg-button_and_input
          border
          border-transparent
          px-3
          py-3
          text-sm
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          placeholder:text-secondary
          disabled:cursor-not-allowed
          disabled:opacity-50
          focus:outline-none
        `,
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
