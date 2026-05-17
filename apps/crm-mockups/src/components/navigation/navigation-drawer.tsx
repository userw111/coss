import { cn } from "@coss/ui/lib/utils";
import {
  IconChevronLeft,
  IconChevronRight,
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import {
  accountSwitcherItems,
  rootFooterItems,
  settingsGroups,
  workspaceItems,
} from "../../data/sidebar-data";
import { SidebarSwitcher } from "../../sidebar-switcher";
import type {
  DrawerMode,
  MainPage,
  NavigationIcon,
  SettingsPage,
} from "../../types";

type NavigationDrawerProps = {
  collapsed: boolean;
  mainPage: MainPage;
  mode: DrawerMode;
  onCollapseChange: (value: boolean) => void;
  onMainNavigate: (page: MainPage) => void;
  onOpenSettings: () => void;
  onSettingsExit: () => void;
  onSettingsNavigate: (page: SettingsPage) => void;
  settingsPage: SettingsPage;
};

export function NavigationDrawer({
  collapsed,
  mainPage,
  mode,
  onCollapseChange,
  onMainNavigate,
  onOpenSettings,
  onSettingsExit,
  onSettingsNavigate,
  settingsPage,
}: NavigationDrawerProps) {
  const isSettings = mode === "settings";

  return (
    <aside
      className={cn(
        "twenty-navigation-drawer",
        collapsed && !isSettings && "twenty-navigation-drawer-collapsed",
        isSettings && "twenty-navigation-drawer-settings",
      )}
    >
      {isSettings ? (
        <SettingsDrawerHeader onExit={onSettingsExit} />
      ) : (
        <MainDrawerHeader
          collapsed={collapsed}
          onCollapse={() => onCollapseChange(true)}
        />
      )}

      <div className="twenty-drawer-scroll">
        {isSettings ? (
          <SettingsNavigation
            activePage={settingsPage}
            onNavigate={onSettingsNavigate}
          />
        ) : (
          <MainNavigation
            activePage={mainPage}
            collapsed={collapsed}
            onNavigate={onMainNavigate}
          />
        )}
      </div>

      {isSettings ? (
        <div className="twenty-settings-fixed">
          <NavigationItem
            active={false}
            collapsed={false}
            icon={LogOut}
            label="Log out"
            onClick={() => undefined}
            standalone
          />
        </div>
      ) : (
        <MainDrawerFooter
          collapsed={collapsed}
          mode={mode}
          onOpenSettings={onOpenSettings}
        />
      )}
    </aside>
  );
}

function MainDrawerHeader({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse: () => void;
}) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accountSwitcherItems[0]?.id ?? "",
  );

  return (
    <div className={cn("twenty-drawer-header", collapsed && "is-collapsed")}>
      <div className="twenty-brand-row">
        <div
          className="twenty-brand-lockup"
          title={collapsed ? "Monopaly" : undefined}
        >
          <span className="twenty-brand-logo">
            <img alt="" aria-hidden="true" src="/logo.png" />
          </span>
          {!collapsed && <span className="twenty-brand-label">Monopaly</span>}
        </div>
        {!collapsed && (
          <button
            aria-label="Collapse sidebar"
            className="twenty-light-icon-button twenty-header-collapse-button"
            onClick={onCollapse}
            title="Collapse sidebar"
            type="button"
          >
            <IconLayoutSidebarLeftCollapse size={16} stroke={1.8} />
          </button>
        )}
      </div>

      <div className="twenty-account-switcher-shell">
        <SidebarSwitcher
          collapsed={collapsed}
          emptyLabel="No accounts found"
          items={accountSwitcherItems}
          onSelect={(item) => setSelectedAccountId(item.id)}
          searchPlaceholder="Search accounts..."
          selectedItemId={selectedAccountId}
          selectedLabel="Current account"
        />
      </div>
    </div>
  );
}

function MainNavigation({
  activePage,
  collapsed,
  onNavigate,
}: {
  activePage: MainPage;
  collapsed: boolean;
  onNavigate: (page: MainPage) => void;
}) {
  const activeIndex = workspaceItems.findIndex(
    (item) => activePage === item.id,
  );

  return (
    <div className="twenty-main-scroll-content">
      <section className="twenty-navigation-section">
        <SectionTitle collapsed={collapsed} label="" />
        <div className="twenty-section-items">
          {activeIndex >= 0 ? (
            <span
              aria-hidden="true"
              className="twenty-navigation-active-indicator"
              style={{
                transform: `translate3d(0, ${activeIndex * 37}px, 0)`,
              }}
            />
          ) : null}
          {workspaceItems.map((item) => (
            <NavigationItem
              active={activePage === item.id}
              collapsed={collapsed}
              disabled={item.disabled}
              icon={item.icon}
              key={item.id}
              label={item.label}
              onClick={() => {
                if (!item.disabled) {
                  onNavigate(item.id);
                }
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function MainDrawerFooter({
  collapsed,
  mode,
  onOpenSettings,
}: {
  collapsed: boolean;
  mode: DrawerMode;
  onOpenSettings: () => void;
}) {
  return (
    <div className="twenty-sidebar-footer">
      <div className="twenty-section-items">
        {rootFooterItems.map((item) => (
          <NavigationItem
            active={item.id === "settings" && mode === "settings"}
            collapsed={collapsed}
            drillIn={item.drillIn}
            icon={item.icon}
            key={item.id}
            label={item.label}
            onClick={item.id === "settings" ? onOpenSettings : () => undefined}
            standalone
          />
        ))}
      </div>
    </div>
  );
}

function SettingsNavigation({
  activePage,
  onNavigate,
}: {
  activePage: SettingsPage;
  onNavigate: (page: SettingsPage) => void;
}) {
  return (
    <div className="twenty-settings-scroll-content">
      {settingsGroups.map((group) => (
        <section
          className="twenty-settings-section"
          key={group.title ?? "settings"}
        >
          <SectionTitle collapsed={false} label={group.title ?? ""} />
          <div className="twenty-section-items">
            <span
              aria-hidden="true"
              className="twenty-navigation-active-indicator"
              style={{
                transform: `translate3d(0, ${
                  group.items.findIndex((item) => activePage === item.id) * 37
                }px, 0)`,
              }}
            />
            {group.items.map((item) => (
              <NavigationItem
                active={activePage === item.id}
                collapsed={false}
                icon={item.icon}
                key={item.id}
                label={item.label}
                onClick={() => onNavigate(item.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SettingsDrawerHeader({ onExit }: { onExit: () => void }) {
  return (
    <div className="twenty-settings-header">
      <button
        className="twenty-settings-back-button"
        onClick={onExit}
        type="button"
      >
        <IconChevronLeft size={16} stroke={1.8} />
        <span>Settings</span>
      </button>
    </div>
  );
}

function SectionTitle({
  collapsed,
  label,
}: {
  collapsed: boolean;
  label: string;
}) {
  if (collapsed || !label) {
    return null;
  }

  return (
    <div className="twenty-section-title">
      <div className="twenty-section-title-inner">
        <span>{label}</span>
      </div>
    </div>
  );
}

function NavigationItem({
  active,
  collapsed,
  disabled,
  drillIn,
  icon: Icon,
  label,
  onClick,
  standalone,
}: {
  active: boolean;
  collapsed: boolean;
  disabled?: boolean;
  drillIn?: boolean;
  icon: NavigationIcon;
  label: string;
  onClick: () => void;
  standalone?: boolean;
}) {
  return (
    <button
      aria-current={active ? "location" : undefined}
      aria-disabled={disabled ? true : undefined}
      className={cn(
        "twenty-navigation-item",
        active && "is-active",
        disabled && "is-disabled",
        standalone && active && "is-standalone-active",
      )}
      disabled={disabled}
      onClick={onClick}
      title={collapsed ? label : undefined}
      type="button"
    >
      <span className="twenty-navigation-item-icon">
        <Icon
          className="twenty-navigation-item-svg"
          size={16}
          strokeWidth={2}
        />
      </span>
      <span className="twenty-navigation-item-label" aria-hidden={collapsed}>
        {label}
      </span>
      {drillIn && (
        <span className="twenty-drill-in-icon" aria-hidden={collapsed}>
          <IconChevronRight size={16} stroke={1.8} />
        </span>
      )}
    </button>
  );
}
