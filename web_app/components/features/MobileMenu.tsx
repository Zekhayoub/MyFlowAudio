import React from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLogout,
  onLogin,
  onRegister,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-end">
      <div className="bg-white w-60 p-6 shadow-lg h-full flex flex-col gap-4">
        <button className="mb-4 self-end text-gray-500" onClick={onClose}>
          ✕
        </button>
        <Link href="/liked" className="text-lg font-medium hover:text-blue-600" onClick={onClose}>
          Liked Songs
        </Link>
        <Link href="/account" className="text-lg font-medium hover:text-blue-600" onClick={onClose}>
          Profil
        </Link>
        {isLoggedIn ? (
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="text-lg font-medium hover:text-blue-600 bg-transparent border-none outline-none cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                onLogin();
                onClose();
              }}
              className="text-lg font-medium hover:text-blue-600 bg-transparent border-none outline-none cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => {
                onRegister();
                onClose();
              }}
              className="text-lg font-medium hover:text-blue-600 bg-transparent border-none outline-none cursor-pointer"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
