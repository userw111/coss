"use client";

import { cn } from "@coss/ui/lib/utils";
import { Building2, Check, ChevronsUpDown, Plus, Search } from "lucide-react";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from "motion/react";
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const typographyRoleClasses = {
  label: "text-[14px] font-medium leading-[20px] tracking-normal",
};

export interface SidebarSwitcherItem {
  description?: string;
  disabled?: boolean;
  href?: string;
  id: string;
  label: string;
  icon?: ReactNode;
  searchText?: string;
  visualKey?: string;
}

interface SidebarSwitcherProps {
  addLabel?: string | undefined;
  collapsed: boolean;
  emptyLabel?: string | undefined;
  items: SidebarSwitcherItem[];
  onAdd?: (() => void) | undefined;
  onSelect: (item: SidebarSwitcherItem) => Promise<void> | void;
  searchPlaceholder?: string | undefined;
  selectedItemId: string;
  selectedLabel?: string | undefined;
}

export function SidebarSwitcher({
  addLabel,
  collapsed,
  emptyLabel = "No items found",
  items,
  onAdd,
  onSelect,
  searchPlaceholder = "Search...",
  selectedItemId,
  selectedLabel = "Current selection",
}: SidebarSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSwitching, setIsSwitching] = useState(false);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selectedItem =
    items.find((item) => item.id === selectedItemId) ?? items[0];
  const selectedVisualKey = getVisualKey(selectedItem);
  const showSearch = items.length >= 5;
  const canOpen = items.length > 1 || Boolean(onAdd && addLabel);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      if (item.id === selectedItem?.id) return false;
      if (!query) return true;
      return getSearchText(item).includes(query);
    });
  }, [items, search, selectedItem?.id]);

  const close = useCallback(() => {
    setOpen(false);
    setSearch("");
  }, []);
  const focusSearch = useCallback(() => {
    window.requestAnimationFrame(() => searchRef.current?.focus());
  }, []);
  const openSwitcher = useCallback(() => {
    setOpen(true);
    focusSearch();
  }, [focusSearch]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      close();
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [close]);

  const handleToggleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!canOpen) return;

    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openSwitcher();
    }
    if (event.key === "Escape") close();
  };

  const handleSelect = async (item: SidebarSwitcherItem) => {
    if (item.disabled || item.id === selectedItemId || isSwitching) return;

    setIsSwitching(true);
    try {
      await onSelect(item);
      close();
    } finally {
      setIsSwitching(false);
    }
  };

  if (!selectedItem) return null;

  if (collapsed) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="mb-3 flex justify-center">
          <div
            aria-label={`${selectedLabel}: ${selectedItem.label}`}
            className="grid size-9 place-content-center overflow-hidden rounded-full bg-[#ebebeb] font-semibold text-[#171717] text-xs"
            title={selectedItem.label}
          >
            <AnimatedSwitcherAvatar
              item={selectedItem}
              visualKey={selectedVisualKey}
            />
          </div>
        </div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative mb-4" ref={rootRef}>
        <style>
          {`
            @keyframes sidebar-switcher-panel-in {
              from {
                opacity: 0;
                transform: translateY(-6px) scaleY(0.98);
              }
              to {
                opacity: 1;
                transform: translateY(0) scaleY(1);
              }
            }

            @keyframes sidebar-switcher-item-in {
              from {
                opacity: 0;
                transform: translateX(-8px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes sidebar-switcher-search-in {
              from {
                opacity: 0;
                transform: translateY(-3px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "relative flex h-14 w-full items-center gap-2.5 overflow-hidden border border-[#e5e5e5] bg-[#f5f5f5] p-2.5 text-left transition-[background-color,border-color,box-shadow] duration-150",
            canOpen ? "hover:bg-[#f0f0f0]" : "cursor-default",
            open
              ? "rounded-t-xl rounded-b-none border-b-[#e8e8e8] shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
              : "rounded-xl",
          )}
          disabled={isSwitching}
          onClick={() => {
            if (!canOpen) return;

            if (open) {
              close();
              return;
            }

            openSwitcher();
          }}
          onKeyDown={handleToggleKeyDown}
          type="button"
        >
          <span className="relative grid size-8 shrink-0 place-content-center">
            <AnimatedSwitcherAvatar
              item={selectedItem}
              visualKey={selectedVisualKey}
            />
          </span>
          <span
            className={cn(
              "relative min-w-0 flex-1 overflow-hidden text-[#171717]",
              typographyRoleClasses.label,
            )}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <m.span
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="block truncate"
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : -7,
                  filter: "blur(2px)",
                }}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 7,
                  filter: "blur(2px)",
                }}
                key={selectedVisualKey}
                transition={{
                  duration: reduceMotion ? 0 : 0.34,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {selectedItem.label}
              </m.span>
            </AnimatePresence>
          </span>
          {canOpen ? (
            <ChevronsUpDown
              className={cn(
                "size-3.5 shrink-0 text-[#737373] transition-transform duration-200",
                open ? "rotate-180" : null,
              )}
            />
          ) : null}
        </button>

        {open && canOpen ? (
          <div
            className="absolute top-full right-0 left-0 z-50 overflow-hidden rounded-b-xl border border-[#e5e5e5] border-t-0 bg-[#f5f5f5] shadow-[0_12px_28px_rgba(15,23,42,0.1)]"
            role="listbox"
            style={{
              animation:
                "sidebar-switcher-panel-in 180ms cubic-bezier(0.22,1,0.36,1) both",
              transformOrigin: "top center",
            }}
          >
            {showSearch ? (
              <div
                className="border-[#e8e8e8] border-b p-2"
                style={{
                  animation:
                    "sidebar-switcher-search-in 180ms cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                <label className="flex items-center gap-2 rounded-lg bg-[#ebebeb] px-2.5 py-1.5">
                  <Search className="size-3.5 shrink-0 text-[#737373]" />
                  <input
                    className="min-w-0 flex-1 bg-transparent text-[#171717] text-[13px] outline-none placeholder:text-[#a3a3a3]"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={searchPlaceholder}
                    ref={searchRef}
                    value={search}
                  />
                </label>
              </div>
            ) : null}

            <div className="max-h-[22rem] overflow-y-auto p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filteredItems.map((item, index) => (
                <button
                  aria-disabled={item.disabled || undefined}
                  aria-selected={item.id === selectedItemId}
                  className={cn(
                    "flex h-14 w-full items-center gap-2.5 rounded-lg p-2.5 text-left transition-colors",
                    item.disabled
                      ? "cursor-not-allowed opacity-55"
                      : "hover:bg-[#f0f0f0]",
                  )}
                  disabled={item.disabled || isSwitching}
                  key={item.id}
                  onClick={() => void handleSelect(item)}
                  role="option"
                  style={{
                    animation: `sidebar-switcher-item-in 220ms cubic-bezier(0.22,1,0.36,1) ${
                      30 + index * 20
                    }ms both`,
                  }}
                  type="button"
                >
                  <SidebarSwitcherAvatar item={item} />
                  <span className="grid min-w-0 flex-1 gap-0.5">
                    <span className="truncate font-medium text-[#171717] text-sm">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="truncate font-medium text-[#737373] text-xs">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  {item.id === selectedItemId ? (
                    <Check className="size-4 shrink-0 text-[#171717]" />
                  ) : null}
                </button>
              ))}

              {filteredItems.length === 0 && items.length > 1 ? (
                <div className="p-3 text-[#737373] text-sm">{emptyLabel}</div>
              ) : null}

              {onAdd && addLabel ? (
                <button
                  className="flex h-14 w-full items-center gap-2.5 rounded-lg bg-[#f5f5f5] px-2.5 py-2 text-left transition-colors hover:bg-[#f0f0f0]"
                  onClick={() => {
                    close();
                    onAdd();
                  }}
                  style={{
                    animation: `sidebar-switcher-item-in 220ms cubic-bezier(0.22,1,0.36,1) ${
                      30 + filteredItems.length * 20
                    }ms both`,
                  }}
                  type="button"
                >
                  <span className="grid size-8 shrink-0 place-content-center rounded-full border-2 border-[#d4d4d4] border-dashed">
                    <Plus className="size-3.5 text-[#737373]" />
                  </span>
                  <span className="font-medium text-[#525252] text-sm">
                    {addLabel}
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </LazyMotion>
  );
}

function SidebarSwitcherAvatar({ item }: { item: SidebarSwitcherItem }) {
  return (
    <span className="grid size-8 shrink-0 place-content-center overflow-hidden rounded-full bg-[#ebebeb] font-semibold text-[#171717] text-xs">
      {item.icon ?? getInitials(item.label)}
    </span>
  );
}

function AnimatedSwitcherAvatar({
  item,
  visualKey,
}: {
  item: SidebarSwitcherItem;
  visualKey: string;
}) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <m.span
        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        className="grid size-8 shrink-0 place-content-center overflow-hidden rounded-full bg-[#ebebeb] font-semibold text-[#171717] text-xs"
        exit={{ opacity: 0, scale: 0.9, rotate: -3, y: -2 }}
        initial={{ opacity: 0, scale: 0.92, rotate: 3, y: 2 }}
        key={visualKey}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        {item.icon ?? getInitials(item.label)}
      </m.span>
    </AnimatePresence>
  );
}

function getVisualKey(item: SidebarSwitcherItem | undefined) {
  return item?.visualKey ?? `${item?.id ?? "missing"}:${item?.label ?? ""}`;
}

function getSearchText(item: SidebarSwitcherItem) {
  return [item.label, item.description, item.searchText, item.href]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getInitials(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  return initials || <Building2 className="size-4" />;
}
