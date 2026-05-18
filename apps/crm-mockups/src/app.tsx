import { cn } from "@coss/ui/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { CommandSidePanel } from "./components/command-side-panel";
import { LeadDetailSidePanel } from "./components/lead-detail-side-panel";
import { NavigationDrawer } from "./components/navigation/navigation-drawer";
import { ObjectHeader } from "./components/page/object-header";
import { PageBody } from "./components/page/page-body";
import { SettingsHeader } from "./components/page/settings-header";
import { crmLeads } from "./data/crm-prototype-data";
import { mainPageTitle, settingsPageTitle } from "./data/sidebar-data";
import { useCommandSidePanelShortcuts } from "./hooks/use-command-side-panel-shortcuts";
import { CrmHomePage } from "./pages/crm-home-page";
import { PipelinePage } from "./pages/pipeline-page";
import { SettingsBlankPage } from "./pages/settings-blank-page";
import type { DrawerMode, MainPage, SettingsPage } from "./types";

type SidePanelMode = "command" | "lead" | null;
type RenderedSidePanelMode = Exclude<SidePanelMode, null>;

export function App() {
  const [mode, setMode] = useState<DrawerMode>("main");
  const [collapsed, setCollapsed] = useState(false);
  const [mainPage, setMainPage] = useState<MainPage>("home");
  const [settingsPage, setSettingsPage] = useState<SettingsPage>("business");
  const [sidePanelMode, setSidePanelMode] = useState<SidePanelMode>(null);
  const [renderedSidePanelMode, setRenderedSidePanelMode] =
    useState<RenderedSidePanelMode | null>(null);
  const [sidePanelClosing, setSidePanelClosing] = useState(false);
  const [sidePanelSearch, setSidePanelSearch] = useState("");
  const closeTimerRef = useRef<number | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>(
    crmLeads[0]?.id,
  );

  const isSettingsMode = mode === "settings";
  const title = isSettingsMode
    ? settingsPageTitle[settingsPage]
    : mainPageTitle[mainPage];
  const commandPanelOpen = sidePanelMode === "command";
  const sidePanelOpen = sidePanelMode !== null;
  const sidePanelVisible = sidePanelOpen || sidePanelClosing;
  const activeSidePanelMode = sidePanelMode ?? renderedSidePanelMode;
  const selectedLead = crmLeads.find((lead) => lead.id === selectedLeadId);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const closeSidePanel = useCallback(() => {
    if (sidePanelMode !== null) {
      setSidePanelClosing(true);

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      closeTimerRef.current = window.setTimeout(() => {
        setSidePanelClosing(false);
        closeTimerRef.current = null;
      }, 300);
    }

    setSidePanelMode(null);
  }, [sidePanelMode]);

  const toggleCommandPanel = useCallback(() => {
    if (sidePanelMode === "command") {
      closeSidePanel();
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setSidePanelClosing(false);
    setRenderedSidePanelMode("command");
    setSidePanelMode("command");
  }, [closeSidePanel, sidePanelMode]);

  useCommandSidePanelShortcuts({
    isOpen: sidePanelMode !== null,
    onClose: closeSidePanel,
    onToggle: toggleCommandPanel,
  });

  const handleMainNavigate = useCallback((page: MainPage) => {
    setMode("main");
    setMainPage(page);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setCollapsed(false);
    setMode("settings");
  }, []);

  const handleLeadSelect = useCallback((leadId: string) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setSidePanelClosing(false);
    setSelectedLeadId(leadId);
    setRenderedSidePanelMode("lead");
    setSidePanelMode("lead");
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
              onToggleSidePanel={toggleCommandPanel}
              sidePanelOpen={commandPanelOpen}
              title={title}
            />
          )}

          <PageBody
            sidePanelOpen={sidePanelVisible}
            sidePanel={
              isSettingsMode ||
              activeSidePanelMode === null ? undefined : activeSidePanelMode ===
                "command" ? (
                <CommandSidePanel
                  closing={sidePanelClosing}
                  onClose={closeSidePanel}
                  onSearchChange={setSidePanelSearch}
                  open={sidePanelOpen}
                  search={sidePanelSearch}
                />
              ) : (
                <LeadDetailSidePanel
                  closing={sidePanelClosing}
                  lead={selectedLead}
                  onClose={closeSidePanel}
                  open={sidePanelOpen}
                />
              )
            }
          >
            {isSettingsMode ? (
              <SettingsBlankPage title={title} />
            ) : mainPage === "home" ? (
              <CrmHomePage onLeadSelect={handleLeadSelect} />
            ) : mainPage === "pipeline" ? (
              <PipelinePage
                onLeadSelect={handleLeadSelect}
                selectedLeadId={selectedLeadId}
              />
            ) : (
              <CrmHomePage onLeadSelect={handleLeadSelect} />
            )}
          </PageBody>
        </section>
      </div>
    </main>
  );
}
