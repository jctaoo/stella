import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail } from "lucide-react";
import { SiGithub, SiX, SiRss } from "react-icons/si";
import IndicatorText from "@/components/indicator-text";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import ThemeSwitcher from "@/components/theme-switcher";
import { siteConfig } from "@/siteConfig";

interface SidebarNavProps {
  isHome?: boolean;
  className?: string;
  currentRoute?: string;
  bannerText?: string;
}

export default function SidebarNav({ isHome = false, className = "", currentRoute = "", bannerText }: SidebarNavProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const socialLinks = [
    { icon: SiGithub, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:example@email.com", label: "Email" },
    { icon: SiX, href: "https://twitter.com", label: "Twitter" },
    { icon: SiRss, href: "/rss.xml", label: "RSS" },
  ];

  useEffect(() => {
    const hasShownConfetti = localStorage.getItem("hasShownConfetti");

    if (!hasShownConfetti && titleRef.current) {
      const titleRect = titleRef.current.getBoundingClientRect();
      const x = titleRect.left + titleRect.width / 2;
      const y = titleRect.top + titleRect.height / 2;
      const origin = { x: x / window.innerWidth, y: y / window.innerHeight };

      confetti({
        particleCount: 50,
        angle: 90,
        spread: 100,
        origin: origin,
      });

      localStorage.setItem("hasShownConfetti", "true");
    }
  }, []);

  const showBanner = !!bannerText;

  const { siteName } = siteConfig;

  return (
    <div
      className={cn([
        className,
        isHome ? "w-full md:w-1/2" : "md:w-80",
        "transition-all duration-150",
        "md:relative h-screen",
        (!isHome || showBanner) && "border-r border-border",
        !isHome && "hidden md:flex flex-col",
        isHome && "flex flex-col",
      ])}
    >
      {/* spacer */}
      <div className="flex-1"></div>

      <div className="flex flex-col space-y-5 justify-center mx-auto pr-20 md:pr-0">
        {/* Blog Title */}
        <div className="flex flex-col items-start space-y-1">
          <a href="/">
            <h1
              className={`font-semibold tracking-wide transition-all duration-150 ${
                isHome ? "text-5xl" : "text-3xl"
              } text-foreground hover:text-primary`}
              ref={titleRef}
            >
              {siteName}
            </h1>
          </a>
          {isHome && <h2 className="text-sm text-muted-foreground">A minimal blog built with Astro</h2>}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-row space-x-4">
          <a href="/posts">
            <IndicatorText active={currentRoute.startsWith("/posts")}>文章</IndicatorText>
          </a>
          <a href="/snippets">
            <IndicatorText active={currentRoute.startsWith("/snippets")}>片段</IndicatorText>
          </a>
          <a href="/about">
            <IndicatorText active={currentRoute.startsWith("/about")}>关于</IndicatorText>
          </a>
        </nav>

        {/* Social Media Links */}
        <div className="">
          <TooltipProvider>
            <div className="flex space-x-2 -mx-2">
              {socialLinks.map((link, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="icon"
                        role="link"
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      >
                        <link.icon className="h-4 w-4" />
                      </Button>
                    </a>
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

      {/* spacer */}
      <div className="flex-1"></div>

      {/* Banner and Theme Toggle at Bottom */
      }
      <div className="px-4 py-4 space-y-3">
        {bannerText ? (
          <div className="text-xs border rounded-md px-3 py-2 bg-accent text-accent-foreground">{bannerText}</div>
        ) : null}
        <ThemeSwitcher className="space-x-5" />
      </div>
    </div>
  );
}
