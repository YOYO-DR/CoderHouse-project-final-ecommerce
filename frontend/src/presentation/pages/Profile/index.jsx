import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SidebarMenu from "./components/SidebarMenu";
import { Menu, X } from "lucide-react";

const ProfileLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Menu Toggle */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Account
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg bg-white p-2 shadow-md dark:bg-gray-800"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Sidebar */}
          <aside
            className={`
              ${isMobileMenuOpen ? "block" : "hidden"}
              md:col-span-3 md:block lg:col-span-2
            `}
          >
            <SidebarMenu onClose={() => setIsMobileMenuOpen(false)} />
          </aside>

          {/* Main Content */}
          <main className="md:col-span-9 lg:col-span-10">
            <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
