import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "@/hooks/useLogoutMutation";

export function Header({ className }: { className?: string }) {
  const { logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between bg-gray-700 h-12 rounded-sm p-4",
        className
      )}
    >
      <div className="text-amber-50 text-3xl">Parking</div>
      <div className="flex gap-6">
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
    </header>
  );
}
