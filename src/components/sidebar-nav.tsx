import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Mail, Twitter, Rss, Menu, X } from "lucide-react";

interface SidebarNavProps {
  isHome?: boolean;
  className?: string;
}

export default function SidebarNav({ isHome = false, className = "" }: SidebarNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:example@email.com", label: "Email" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Rss, href: "/rss.xml", label: "RSS" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-background/80 backdrop-blur-sm border border-border"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${className} 
        ${isHome ? 'md:w-80' : 'md:w-20'} 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:relative h-screen flex flex-col justify-center 
        transition-all duration-300 ease-in-out 
        bg-background border-r border-border z-40
        w-80 md:flex
      `}>
        <div className="flex flex-col items-start px-8 space-y-6 mt-16 md:mt-0">
          {/* Blog Title */}
          <div className="flex flex-col items-start space-y-1">
            <h1 className={`font-light tracking-wide cursor-pointer transition-all duration-300 ${
              isHome ? 'text-6xl' : 'text-2xl'
            } text-foreground hover:text-primary`}>
              <a href="/" onClick={() => setMobileMenuOpen(false)}>Jctaoo.</a>
            </h1>
            {isHome && (
              <p className="text-sm text-muted-foreground mt-2">
                A minimal blog built with Astro
              </p>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2">
            <a 
              href="/posts" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              文章
            </a>
            <a 
              href="/snippets" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              片段
            </a>
            <a 
              href="/about" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              关于
            </a>
          </nav>

          {/* Social Media Links */}
          <div className="flex flex-col space-y-4">
            <Separator className="w-12" />
            <TooltipProvider>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          <link.icon className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
}
