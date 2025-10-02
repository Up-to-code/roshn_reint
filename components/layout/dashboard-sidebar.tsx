"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "@/types";
import {   PanelLeftClose, PanelRightClose } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

 import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
 import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectSwitcher from "@/components/dashboard/project-switcher";
import { UpgradeCard } from "@/components/dashboard/upgrade-card";
import { Icons } from "@/components/shared/icons";
import { Link } from "@/i18n/routing";

interface DashboardSidebarProps {
  links: SidebarNavItem[];
}

export function DashboardSidebar({ links }: DashboardSidebarProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const path = usePathname();
  const { isTablet } = useMediaQuery();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="sticky top-0 h-full">
        <ScrollArea className="h-full overflow-y-auto border-r">
          <aside
            className={cn(
              "hidden h-screen md:block",
              isSidebarExpanded ? "w-[220px] xl:w-[260px]" : "w-[68px]"
            )}
          >
            <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
              <div className="flex h-14 items-center p-4 lg:h-[60px]">
                {isSidebarExpanded && <ProjectSwitcher />}

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-9 lg:size-8"
                  onClick={toggleSidebar}
                >
                  {isSidebarExpanded ? (
                    <PanelLeftClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  ) : (
                    <PanelRightClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  )}
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-8 px-4 pt-4">
                {links.map((section) => (
                  <section
                    key={section.title}
                    className={cn(
                      "flex flex-col gap-0.5",
                      isRTL && "text-right"
                    )}
                  >
                    {isSidebarExpanded ? (
                      <p className="my-4 text-xs text-muted-foreground">
                        {t(section.title)}
                      </p>
                    ) : (
                      <div className="h-4" />
                    )}

                    {section.items.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      return (
                        item.href && (
                          <Fragment key={`link-fragment-${item.title}`}>
                            {isSidebarExpanded ? (
                              <Link
                                href={item.disabled ? "#" : item.href as any}
                                className={cn(
                                  "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
                                  isRTL && "flex-row-reverse",
                                  path === item.href
                                    ? "bg-muted"
                                    : "text-muted-foreground hover:text-accent-foreground",
                                  item.disabled &&
                                    "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground"
                                )}
                              >
                                <Icon className="size-5" />
                                {t(item.title)}
                                {item.badge && (
                                  <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                    {item.badge}
                                  </Badge>
                                )}
                              </Link>
                            ) : (
                              <Tooltip key={`tooltip-${item.title}`}>
                                <TooltipTrigger asChild>
                                  <Link
                                    href={item.disabled ? "#" : item.href as any}
                                    className={cn(
                                      "flex items-center gap-3 rounded-md py-2 text-sm font-medium hover:bg-muted",
                                      isRTL && "flex-row-reverse",
                                      path === item.href
                                        ? "bg-muted"
                                        : "text-muted-foreground hover:text-accent-foreground",
                                      item.disabled &&
                                        "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground"
                                    )}
                                  >
                                    <span className="flex size-full items-center justify-center">
                                      <Icon className="size-5" />
                                    </span>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side={isRTL ? "left" : "right"}>
                                  {t(item.title)}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </Fragment>
                        )
                      );
                    })}
                  </section>
                ))}
              </nav>

              <div className="mt-auto xl:p-4">
                {isSidebarExpanded && <UpgradeCard />}
              </div>
            </div>
          </aside>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}