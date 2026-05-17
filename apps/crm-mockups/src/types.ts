import type { TablerIcon } from "@tabler/icons-react";
import type { LucideIcon } from "lucide-react";

export type MainPage = "campaigns" | "leads" | "analytics";
export type SettingsPage =
  | "business"
  | "integrations"
  | "subscription"
  | "account";
export type DrawerMode = "main" | "settings";
export type RootFooterItemId = "settings" | "logout";

export type NavigationIcon = LucideIcon;

export type NavigationItemConfig<TId extends string = string> = {
  disabled?: boolean;
  drillIn?: boolean;
  icon: NavigationIcon;
  id: TId;
  label: string;
};

export type SettingsNavigationGroup = {
  items: Array<NavigationItemConfig<SettingsPage>>;
  title?: string;
};

export type CommandAction = {
  hotKeys?: string[];
  icon: TablerIcon;
  id: string;
  label: string;
  tone?: "danger";
};
