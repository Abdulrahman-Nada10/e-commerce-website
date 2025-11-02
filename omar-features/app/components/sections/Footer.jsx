'use client';
import { Mail, Instagram, Twitter, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const linkGroups = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'Best Sellers', 'Sale', 'Categories'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Affiliates'],
  },
  {
    title: 'Support',
    links: ['Contact Us', 'FAQ', 'Shipping', 'Returns & Exchanges'],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#060010] text-white pt-16 border-t border-t-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          
          <div className="col-span-2">
            <h3 className="text-3xl font-bold text-white mb-3 tracking-wider font-['Poppins']">
              Shop<span className="text-[#4EC5F5]">ylx</span>
            </h3>
            <p className="font-normal text-white/70 max-w-sm font-['Poppins'] text-sm">
              Your premium destination for the latest trends in e-commerce. Discover the best, delivered to your door.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Mail" className="text-white hover:text-[#4EC5F5] transition duration-600">
                <Mail size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-white hover:text-[#4EC5F5] transition duration-600">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-white hover:text-[#4EC5F5] transition duration-600">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          {linkGroups.map((group) => (
            <div key={group.title} className="col-span-1">
              <h4 className="font-medium text-lg mb-4 text-[#4EC5F5] font-['Poppins']">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                 <motion.li 
        key={link}
        whileHover={{ x: 5, color: '#4EC5F5' }} 
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
                    <a href="#" className="text-white/70 hover:text-[#4EC5F5] transition duration-200 font-normal text-sm font-['Poppins']">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm">

          <p className="text-white/50 font-normal mb-3 md:mb-0 font-['Poppins']">
            &copy; {new Date().getFullYear()} Shopylx. All rights reserved.
          </p>
               
        </div>
      </div>
    </footer>
  );
};

export default Footer;