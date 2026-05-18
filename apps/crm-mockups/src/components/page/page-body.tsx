import { cn } from "@coss/ui/lib/utils";
import type { ReactNode } from "react";

type PageBodyProps = {
  children: ReactNode;
  sidePanel?: ReactNode;
  sidePanelOpen?: boolean;
};

export function PageBody({
  children,
  sidePanel,
  sidePanelOpen = false,
}: PageBodyProps) {
  return (
    <div className={cn("twenty-page-body", sidePanelOpen && "has-side-panel")}>
      <div className="twenty-page-main-container">
        <div className="twenty-page-panel">{children}</div>
      </div>
      {sidePanel}
    </div>
  );
}
