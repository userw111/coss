import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  Inbox,
  LogOut,
  Megaphone,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import type { SidebarSwitcherItem } from "../sidebar-switcher";
import type {
  MainPage,
  NavigationItemConfig,
  RootFooterItemId,
  SettingsNavigationGroup,
  SettingsPage,
} from "../types";

export const workspaceItems: Array<NavigationItemConfig<MainPage>> = [
  { icon: Megaphone, id: "campaigns", label: "Campaigns" },
  { disabled: true, icon: Inbox, id: "leads", label: "Leads" },
  { disabled: true, icon: BarChart3, id: "analytics", label: "Analytics" },
];

export const rootFooterItems: Array<NavigationItemConfig<RootFooterItemId>> = [
  {
    drillIn: true,
    icon: Settings,
    id: "settings",
    label: "Settings",
  },
  { icon: LogOut, id: "logout", label: "Log out" },
];

export const accountSwitcherItems: SidebarSwitcherItem[] = [
  {
    description: "Workspace",
    icon: <BriefcaseBusiness className="size-4" strokeWidth={2} />,
    id: "h2o",
    label: "h2o",
    searchText: "workspace h2o",
    visualKey: "workspace:h2o",
  },
  {
    description: "Workspace",
    icon: <Building2 className="size-4" strokeWidth={2} />,
    id: "summit-roofing",
    label: "Summit Roofing",
    searchText: "workspace summit roofing",
    visualKey: "workspace:summit-roofing",
  },
  {
    description: "Platform",
    icon: <ShieldCheck className="size-4" strokeWidth={2} />,
    id: "monopaly-admin",
    label: "Monopaly Admin",
    searchText: "platform monopaly admin",
    visualKey: "platform:monopaly-admin",
  },
];

export const settingsGroups: SettingsNavigationGroup[] = [
  {
    items: [
      { icon: Building2, id: "business", label: "Business" },
      { icon: Megaphone, id: "integrations", label: "Integrations" },
      { icon: CreditCard, id: "subscription", label: "Subscription" },
      { icon: User, id: "account", label: "Account" },
    ],
  },
];

export const mainPageTitle: Record<MainPage, string> = {
  analytics: "Analytics",
  campaigns: "Campaigns",
  leads: "Leads",
};

export const settingsPageTitle: Record<SettingsPage, string> = {
  account: "Account",
  business: "Business",
  integrations: "Integrations",
  subscription: "Subscription",
};
