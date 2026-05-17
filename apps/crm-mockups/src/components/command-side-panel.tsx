import { cn } from "@coss/ui/lib/utils";
import { IconX } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { commandActions } from "../data/command-actions";
import type { CommandAction } from "../types";

type CommandSidePanelProps = {
  onClose: () => void;
  onSearchChange: (value: string) => void;
  open: boolean;
  search: string;
};

export function CommandSidePanel({
  onClose,
  onSearchChange,
  open,
  search,
}: CommandSidePanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredActions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return commandActions;
    }

    return commandActions.filter((action) =>
      action.label.toLowerCase().includes(normalizedSearch),
    );
  }, [search]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setActiveIndex(0);

    const animationFrame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [open]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveIndex(0);
    onSearchChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (!filteredActions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % filteredActions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index === 0 ? filteredActions.length - 1 : index - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={cn("twenty-side-panel-gap", open && "is-open")}
      />
      <aside
        aria-hidden={!open}
        aria-label="Command menu"
        className={cn("twenty-side-panel-wrapper", open && "is-open")}
      >
        <div className="twenty-side-panel" data-side-panel="">
          <div className="twenty-side-panel-topbar">
            <div className="twenty-side-panel-topbar-content">
              <button
                aria-label="Close side panel"
                className="twenty-light-icon-button twenty-side-panel-close"
                onClick={onClose}
                type="button"
              >
                <IconX size={16} stroke={1.8} />
              </button>
              <input
                className="twenty-side-panel-input"
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Type anything..."
                ref={inputRef}
                tabIndex={open ? 0 : -1}
                type="text"
                value={search}
              />
            </div>
          </div>

          <div className="twenty-side-panel-list-scroll">
            <div className="twenty-side-panel-list">
              <div className="twenty-command-group-label">Other</div>
              {filteredActions.length > 0 ? (
                filteredActions.map((action, index) => (
                  <CommandMenuAction
                    action={action}
                    active={index === activeIndex}
                    key={action.id}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                ))
              ) : (
                <div className="twenty-command-empty">No results found</div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function CommandMenuAction({
  action,
  active,
  onMouseEnter,
}: {
  action: CommandAction;
  active: boolean;
  onMouseEnter: () => void;
}) {
  const Icon = action.icon;
  const hotKeys = action.hotKeys;

  return (
    <button
      className={cn(
        "twenty-command-menu-item",
        active && "is-active",
        action.tone === "danger" && "is-danger",
      )}
      onMouseEnter={onMouseEnter}
      type="button"
    >
      <span className="twenty-command-menu-left">
        <span className="twenty-command-menu-icon">
          <Icon size={16} stroke={1.8} />
        </span>
        <span className="twenty-command-menu-label">{action.label}</span>
      </span>
      {hotKeys ? (
        <span className="twenty-command-hotkeys">
          {hotKeys.map((hotKey, index) => (
            <span
              className="twenty-command-hotkey-fragment"
              key={`${action.id}-${hotKey}`}
            >
              <kbd>{hotKey}</kbd>
              {index < hotKeys.length - 1 && <span>then</span>}
            </span>
          ))}
        </span>
      ) : null}
    </button>
  );
}
