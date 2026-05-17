import { useEffect } from "react";

type UseCommandSidePanelShortcutsOptions = {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
};

export function useCommandSidePanelShortcuts({
  isOpen,
  onClose,
  onToggle,
}: UseCommandSidePanelShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onToggle();
        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onToggle]);
}
