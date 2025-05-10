import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut, Menu } from "lucide-react";
import { useLogoutMutation } from "@/hooks/useLogoutMutation";
import { useState } from "react";

export function Header({ className }: { className?: string }) {
  const { logout } = useLogoutMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between bg-gray-700 h-12 rounded-sm p-4 relative z-50",
        className
      )}
    >
      <div className="text-amber-50 text-3xl">Parking</div>

      <div className="hidden md:flex gap-6">
        <Link
          to="/parking-spots"
          className={cn("text-lg text-amber-50 font-medium hover:text-black")}
        >
          Парковочные места
        </Link>
        <Link
          to="/my-reservations"
          className={cn("text-lg text-amber-50 font-medium hover:text-black")}
        >
          История
        </Link>
        <button
          className="group text-white hover:text-black transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="text-white group-hover:text-black transition-colors" />
        </button>
      </div>

      <button
        className="md:hidden text-amber-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-700 p-4 md:hidden flex flex-col gap-4 shadow-lg z-50">
          <Link
            to="/parking-spots"
            className="text-lg text-amber-50 font-medium hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Парковочные места
          </Link>
          <Link
            to="/my-reservations"
            className="text-lg text-amber-50 font-medium hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            История
          </Link>
          <button
            className="text-lg text-amber-50 font-medium hover:text-black text-left"
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
          >
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}
