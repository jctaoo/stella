import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail } from "lucide-react";
import { SiGithub, SiX, SiRss } from "@icons-pack/react-simple-icons";
import IndicatorText from "@/components/indicator-text";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  isHome?: boolean;
  className?: string;
  currentRoute?: string;
}

export default function SidebarNav({ isHome = false, className = "", currentRoute = "" }: SidebarNavProps) {
  const socialLinks = [
    { icon: SiGithub, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:example@email.com", label: "Email" },
    { icon: SiX, href: "https://twitter.com", label: "Twitter" },
    { icon: SiRss, href: "/rss.xml", label: "RSS" },
  ];

  return (
    <div
      className={cn([
        className,
        isHome ? "md:w-1/2" : "md:w-80",
        "transition-all duration-150",
        "md:relative h-screen",
        "bg-background",
        !isHome && "border-r border-border",
        "w-80 md:flex",
      ])}
    >
      <div className="flex flex-col space-y-5 mt-16 md:mt-0 justify-center mx-auto">
        {/* Blog Title */}
        <div className="flex flex-col items-start space-y-1">
          <a href="/">
            <h1
              className={`font-semibold tracking-wide transition-all duration-150 ${
                isHome ? "text-5xl" : "text-3xl"
              } text-foreground hover:text-primary`}
            >
              Jctaoo.
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
    </div>
  );
}
