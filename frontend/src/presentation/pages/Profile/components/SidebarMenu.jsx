import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  ShoppingBag,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  Star,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useTranslation } from "../../../../application/context/LanguageContext";
import { cn } from "../../../../utils/tailwind";

const SidebarMenu = ({ onClose }) => {
  const { t } = useTranslation();
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const menuItems = [
    {
      path: "/profile",
      label: t("Profile Overview") || "Profile Overview",
      icon: User,
    },
    {
      path: "/profile/orders",
      label: t("Order History") || "Order History",
      icon: ShoppingBag,
    },
    {
      path: "/profile/payments",
      label: t("Payment Methods") || "Payment Methods",
      icon: CreditCard,
    },
    {
      path: "/profile/addresses",
      label: t("Addresses") || "Addresses",
      icon: MapPin,
    },
    {
      path: "/profile/subscriptions",
      label: t("Subscriptions") || "Subscriptions",
      icon: Star,
    },
    {
      path: "/profile/notifications",
      label: t("Notifications") || "Notifications",
      icon: Bell,
    },
    {
      path: "/profile/security",
      label: t("Security") || "Security",
      icon: Shield,
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-5 w-5" />
          <span>{t("Logout") || "Logout"}</span>
        </button>
      </nav>
    </div>
  );
};

export default SidebarMenu;
