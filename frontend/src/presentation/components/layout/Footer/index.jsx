import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Github } from "lucide-react";
import {useTranslation} from "../../../../application/context/LanguageContext";
import { routePaths } from "../../../../routers";

const Footer = ({ }) => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 py-12 text-gray-400 md:py-16">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{t("About Us")}</h3>
            <p className="mt-4">
              AllNutrition provides premium sports nutrition products for
              athletes and fitness enthusiasts.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to={routePaths.shop.path} className="transition-colors hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to={routePaths.about.path}
                  className="transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={routePaths.contact.path}
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>Email: info@allnutrition.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Fitness Street</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-white"
                aria-label="Github"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p>&copy; 2024 AllNutrition. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;