import type { ReactNode } from "react";

type PageBodyProps = {
  children: ReactNode;
  sidePanel?: ReactNode;
};

export function PageBody({ children, sidePanel }: PageBodyProps) {
  return (
    <div className="twenty-page-body">
      <div className="twenty-page-panel">{children}</div>
      {sidePanel}
    </div>
  );
}
