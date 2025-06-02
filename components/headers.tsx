'use client'

import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, BookOpen, Briefcase, GraduationCap, FileText } from "lucide-react";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/ai-tools", label: "AI Tools", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/ai-tools/study-plan", label: "Study Plan", icon: <GraduationCap className="w-4 h-4" /> },
    { href: "/job", label: "Jobs", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/scholarship", label: "Scholarships", icon: <FileText className="w-4 h-4" /> },
    { href: "/resources", label: "Resources", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md w-[95%] max-w-6xl py-3 px-6 rounded-2xl z-50 shadow-lg border border-white/20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href='/' className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Smart Scholar
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isDropdownOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isDropdownOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-gray-200">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div 
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;