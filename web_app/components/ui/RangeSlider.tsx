"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface RangeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  step?: number;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  value = 1,
  onChange,
  max = 1,
  step = 0.1,
  className
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className={`
        relative
        flex
        items-center
        select-none
        touch-none
        w-full
        h-10
        ${className}
      `}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={max}
      step={step}
      aria-label="Slider"
    >
      <RadixSlider.Track
        className="
          bg-neutral-600
          relative
          grow
          rounded-full
          h-[3px]
        "
      >
        <RadixSlider.Range
          className="
            absolute
            bg-white
            rounded-full
            h-full
          "
        />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="
          block
          w-3
          h-3
          bg-white
          shadow-md
          rounded-full
          hover:bg-neutral-200
          focus:outline-none
          focus:ring-2
          focus:ring-white
          focus:ring-offset-2
          focus:ring-offset-black
          transition
        "
      />
    </RadixSlider.Root>
  );
};

export default RangeSlider;
