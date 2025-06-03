import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarLinkProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
          flex
          flex-row
          h-auto
          items-center
          w-full
          gap-x-4
          text-md
          font-medium
          cursor-pointer
          hover:text-primary
          transition
          text-secondary
          py-1
        `,
        active && "text-primary",
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarLink;
