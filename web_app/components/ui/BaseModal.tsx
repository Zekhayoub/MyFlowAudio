import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface BaseModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            bg-background/90
            backdrop-blur-sm
            fixed
            inset-0
            animate-fadeIn
            transition-opacity
            duration-500
          "
        />
        <Dialog.Content
          className="
            fixed
            drop-shadow-lg
            border
            border-button_and_input
            top-[50%]
            left-[50%]
            max-h-[95vh]
            h-full
            w-full
            md:w-[95vw]
            md:max-w-[900px]
            translate-x-[-50%]
            translate-y-[-50%]
            rounded-2xl
            bg-modal
            p-[40px]
            focus:outline-none
            animate-slideIn
            transition-all
            duration-700
          "
        >
          <Dialog.Title
            className="
              text-2xl
              text-center
              font-bold
              mb-6
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
              mb-6
              text-base
              leading-relaxed
              text-center
            "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
                text-secondary
                hover:text-primary
                absolute
                top-[15px]
                right-[15px]
                inline-flex
                h-[30px]
                w-[30px]
                items-center
                justify-center
                rounded-full
                transition
                duration-300
              "
            >
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BaseModal;
