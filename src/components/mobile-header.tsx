import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, Menu, X } from "lucide-react";
import { SiGithub, SiX, SiRss } from "@icons-pack/react-simple-icons";
import IndicatorText from "@/components/indicator-text";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ThemeSwitcher from "@/components/theme-switcher";
import { siteConfig } from "@/siteConfig";

interface MobileHeaderProps {
  isHome?: boolean;
  currentRoute?: string;
}

export default function MobileHeader({ isHome = false, currentRoute = "" }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const routeTitle = (() => {
    if (currentRoute.startsWith("/posts")) return "文章";
    if (currentRoute.startsWith("/snippets")) return "片段";
    if (currentRoute.startsWith("/about")) return "关于";
    return null;
  })();

  const socialLinks = [
    { icon: SiGithub, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:example@email.com", label: "Email" },
    { icon: SiX, href: "https://twitter.com", label: "Twitter" },
    { icon: SiRss, href: "/rss.xml", label: "RSS" },
  ];

  const { siteName } = siteConfig;

  if (isHome) return <></>;

  return (
    <>
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-12 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full px-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground">{siteName}</span>
            {routeTitle ? <span className="text-sm text-muted-foreground">/ {routeTitle}</span> : null}
          </a>
          <Button variant="ghost" size="icon" aria-label="打开菜单" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Drawer direction="left" open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerContent className="h-screen w-[85%] max-w-xs p-0 data-[vaul-drawer-direction=left]:border-r">
          <DrawerHeader className="h-12 px-4 border-b flex flex-row items-center justify-between">
            <DrawerTitle asChild>
              <a href="/" onClick={() => setIsMenuOpen(false)} className="text-base font-semibold text-foreground">
                {siteName}
              </a>
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" aria-label="关闭菜单">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            <nav className="flex flex-col gap-3">
              <a href="/posts" onClick={() => setIsMenuOpen(false)} className="text-sm">
                <IndicatorText active={currentRoute.startsWith("/posts")}>文章</IndicatorText>
              </a>
              <a href="/snippets" onClick={() => setIsMenuOpen(false)} className="text-sm">
                <IndicatorText active={currentRoute.startsWith("/snippets")}>片段</IndicatorText>
              </a>
              <a href="/about" onClick={() => setIsMenuOpen(false)} className="text-sm">
                <IndicatorText active={currentRoute.startsWith("/about")}>关于</IndicatorText>
              </a>
            </nav>

            <div>
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

          <DrawerFooter className="px-4 py-4 border-t">
            <ThemeSwitcher className="flex w-full items-center justify-between" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
