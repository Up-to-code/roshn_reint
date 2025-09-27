import { IconName } from "@/components/shared/icons";
import { UserRole } from "@prisma/client";

export interface SidebarNavItem {
  title: string; // translation key
  items: {
    href: string;
    icon: IconName;
    title: string; // translation key
    badge?: number;
    authorizeOnly?: UserRole;
    disabled?: boolean;
  }[];
}

// Use translation keys here; the component will call `t(title)` dynamically
export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "sidebar.menu",
    items: [
      { href: "/admin", icon: "briefcase", title: "sidebar.adminPanel", authorizeOnly: UserRole.ADMIN },
      { href: "/dashboard", icon: "dashboard", title: "sidebar.dashboard" },
       {href: "/dashboard/home", icon: "home", title: "sidebar.home"},
      { href: "/dashboard/global", icon: "global", title: "sidebar.global" },
      // { href: "/dashboard/charts", icon: "lineChart", title: "sidebar.charts" },
      // { href: "/admin/orders", icon: "package", title: "sidebar.orders", badge: 2, authorizeOnly: UserRole.ADMIN },
      { href: "/admin/projects", icon: "briefcase", title: "sidebar.projects" },
      { href: "/admin/forms", icon: "post", title: "sidebar.forms" },
      { href: "/admin/blogs", icon: "blog", title: "sidebar.blogs" },
      { href: "/admin/media", icon: "media", title: "sidebar.media" },
    ],
  },
  {
    title: "sidebar.options",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "sidebar.settings" },
      { href: "/", icon: "home", title: "sidebar.homepage" },
      { href: "/docs", icon: "bookOpen", title: "sidebar.documentation" },
      { href: "#", icon: "messages", title: "sidebar.support", authorizeOnly: UserRole.USER, disabled: true },
    ],
  },
];
