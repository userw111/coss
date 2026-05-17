import { cn } from "@coss/ui/lib/utils";
import { useCallback, useState } from "react";
import { CommandSidePanel } from "./components/command-side-panel";
import { NavigationDrawer } from "./components/navigation/navigation-drawer";
import { ObjectHeader } from "./components/page/object-header";
import { PageBody } from "./components/page/page-body";
import { SettingsHeader } from "./components/page/settings-header";
import { mainPageTitle, settingsPageTitle } from "./data/sidebar-data";
import { useCommandSidePanelShortcuts } from "./hooks/use-command-side-panel-shortcuts";
import { ObjectBlankPage } from "./pages/object-blank-page";
import { SettingsBlankPage } from "./pages/settings-blank-page";
import type { DrawerMode, MainPage, SettingsPage } from "./types";

export function App() {
  const [mode, setMode] = useState<DrawerMode>("main");
  const [collapsed, setCollapsed] = useState(false);
  const [mainPage, setMainPage] = useState<MainPage>("campaigns");
  const [settingsPage, setSettingsPage] = useState<SettingsPage>("business");
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [sidePanelSearch, setSidePanelSearch] = useState("");

  const isSettingsMode = mode === "settings";
  const title = isSettingsMode
    ? settingsPageTitle[settingsPage]
    : mainPageTitle[mainPage];

  const closeSidePanel = useCallback(() => setSidePanelOpen(false), []);
  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen((value) => !value);
  }, []);

  useCommandSidePanelShortcuts({
    isOpen: sidePanelOpen,
    onClose: closeSidePanel,
    onToggle: toggleSidePanel,
  });

  const handleMainNavigate = useCallback((page: MainPage) => {
    setMode("main");
    setMainPage(page);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setCollapsed(false);
    setMode("settings");
  }, []);

  return (
    <main className="twenty-shell">
      <div
        className={cn(
          "twenty-page-container",
          isSettingsMode && "twenty-page-container-settings",
        )}
      >
        <NavigationDrawer
          collapsed={collapsed}
          mainPage={mainPage}
          mode={mode}
          onCollapseChange={setCollapsed}
          onMainNavigate={handleMainNavigate}
          onOpenSettings={handleOpenSettings}
          onSettingsExit={() => setMode("main")}
          onSettingsNavigate={setSettingsPage}
          settingsPage={settingsPage}
        />

        <section className="twenty-main-container">
          {isSettingsMode ? (
            <SettingsHeader title={title} />
          ) : (
            <ObjectHeader
              collapsed={collapsed}
              onCollapseChange={setCollapsed}
              onToggleSidePanel={toggleSidePanel}
              sidePanelOpen={sidePanelOpen}
              title={title}
            />
          )}

          <PageBody
            sidePanel={
              isSettingsMode ? undefined : (
                <CommandSidePanel
                  onClose={closeSidePanel}
                  onSearchChange={setSidePanelSearch}
                  open={sidePanelOpen}
                  search={sidePanelSearch}
                />
              )
            }
          >
            {isSettingsMode ? (
              <SettingsBlankPage title={title} />
            ) : (
              <ObjectBlankPage title={title} />
            )}
          </PageBody>
        </section>
      </div>
    </main>
  );
}
