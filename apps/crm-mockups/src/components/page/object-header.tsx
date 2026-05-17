import {
  IconBuilding,
  IconCirclePlus,
  IconDotsVertical,
  IconLayoutSidebarRightCollapse,
  IconX,
} from "@tabler/icons-react";

type ObjectHeaderProps = {
  collapsed: boolean;
  onCollapseChange: (value: boolean) => void;
  onToggleSidePanel: () => void;
  sidePanelOpen: boolean;
  title: string;
};

export function ObjectHeader({
  collapsed,
  onCollapseChange,
  onToggleSidePanel,
  sidePanelOpen,
  title,
}: ObjectHeaderProps) {
  const singularTitle =
    title === "Companies" ? "Company" : title.replace(/s$/, "");

  return (
    <header className="twenty-page-header">
      <div className="twenty-page-header-left">
        {collapsed && (
          <button
            aria-label="Expand sidebar"
            className="twenty-light-icon-button"
            onClick={() => onCollapseChange(false)}
            title="Expand sidebar"
            type="button"
          >
            <IconLayoutSidebarRightCollapse size={16} stroke={1.8} />
          </button>
        )}
        <span className="twenty-object-icon">
          <IconBuilding size={16} stroke={1.8} />
        </span>
        <span className="twenty-page-title">{title}</span>
      </div>
      <div className="twenty-page-actions">
        <button
          aria-label={`Create new ${title}`}
          className="twenty-light-button"
          type="button"
        >
          <IconCirclePlus size={16} stroke={1.8} />
          <span>New {singularTitle}...</span>
        </button>
        <button
          aria-label={sidePanelOpen ? "Close side panel" : "Open side panel"}
          className="twenty-command-button"
          onClick={onToggleSidePanel}
          type="button"
        >
          {sidePanelOpen ? (
            <IconX size={16} stroke={1.8} />
          ) : (
            <IconDotsVertical size={16} stroke={1.8} />
          )}
          <span>⌘K</span>
        </button>
      </div>
    </header>
  );
}
