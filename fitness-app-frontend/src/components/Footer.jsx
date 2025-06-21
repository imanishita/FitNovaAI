// src/components/Footer.jsx
import { ExternalLink, Linkedin, Twitter, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent backdrop-blur-md border-t border-white/10 py-6 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Copyright */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © 2025 Manishita Biswas. All rights reserved.
        </div>
        
        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <a 
            href="https://imanishita.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            aria-label="Portfolio"
          >
            <Globe size={18} />
          </a>
          
          <a 
            href="https://linkedin.com/in/imanishita" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          
          <a 
            href="https://twitter.com/imanishita" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;