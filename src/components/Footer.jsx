import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-5 border-t border-gray-800">
      <div className="container mx-auto px-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Dashboard. All rights reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
