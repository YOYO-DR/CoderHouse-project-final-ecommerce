import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Dumbbell, Menu, X, Globe, User, LogOut, Settings, Package } from "lucide-react";
import { ThemeToggle } from "../../common/ThemeToggle";
import { useCartStore } from "../../../hooks/useCartStore";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { cn } from "../../../../utils/tailwind";
import { useTranslation } from "../../../../application/context/LanguageContext";
import { routePaths } from "../../../../routers";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const { language, setLanguage, t } = useTranslation();

  const navigateUrls = [
  { name: "Home", url: routePaths.home.path },
  { name: "Shop", url: routePaths.shop.path },
  { name: "About", url: routePaths.about.path },
  { name: "Contact", url: routePaths.contact.path },
];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    if (isMenuOpen || isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/75 backdrop-blur-lg dark:bg-gray-950/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={routePaths.home.path} className="flex items-center space-x-2">
          <Dumbbell className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">AllNutrition</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          {navigateUrls.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "transition-colors hover:text-blue-600 px-3 py-2 rounded-lg",
                location.pathname === item.url
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              {t(item.name)}
            </Link>
          ))}
        </div>

        {/* Actions (Theme, Cart, Auth) */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />

          {/* Cart */}
          <Link to={routePaths.cart.path} className="relative">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            to={routePaths.profile_overview.path}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="My Account"
          >
            <User className="h-6 w-6" />
          </Link>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Globe className="h-6 w-6" />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700">
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("es")}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Español
                </button>
              </div>
            )}
          </div>

          {/* User Menu / Login/Register (Desktop) */}
          <div className="hidden md:flex items-center space-x-3 pl-4">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-semibold text-white">
                    {getInitials(user?.firstName || user?.email)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.firstName || "Usuario"}
                  </span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 z-50">
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-2">
                      <Link
                        to={routePaths.profile_overview.path}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>{t("My Profile")}</span>
                      </Link>
                      <Link
                        to={routePaths.profile_order_history.path}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="h-4 w-4" />
                        <span>{t("My Orders")}</span>
                      </Link>
                      <Link
                        to={routePaths.profile_security_settings.path}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>{t("Settings")}</span>
                      </Link>
                    </div>
                    <div className="border-t dark:border-gray-700 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t("Logout")}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to={routePaths.login.path}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
                >
                  {t("Login")}
                </Link>
                <Link
                  to={routePaths.register.path}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t("Register")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-x-0 top-16 z-50 border-b bg-white/90 backdrop-blur-lg transition-all duration-300 dark:bg-gray-950/75 md:hidden",
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="container px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navigateUrls.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className={cn(
                  "transition-colors hover:text-blue-600 px-3 py-2 rounded-lg",
                  location.pathname === item.url
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-white font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}

            {/* Separador */}
            <div className="border-t border-gray-300 dark:border-gray-700 my-2"></div>

            {/* User Menu / Login/Register (Mobile) */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-semibold text-white">
                      {getInitials(user?.firstName || user?.email)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to={routePaths.profile_overview.path}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>{t("My Profile")}</span>
                </Link>
                <Link
                  to={routePaths.profile_order_history.path}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  <span>{t("My Orders")}</span>
                </Link>
                <Link
                  to={routePaths.profile_security_settings.path}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  <span>{t("Settings")}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t("Logout")}</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to={routePaths.login.path}
                  className="text-center py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("Login")}
                </Link>
                <Link
                  to={routePaths.register.path}
                  className="text-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("Register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
