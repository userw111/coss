import { IconChevronDown, IconList } from "@tabler/icons-react";

export function ObjectBlankPage({ title }: { title: string }) {
  return (
    <div className="twenty-object-blank">
      <div className="twenty-view-bar">
        <button className="twenty-view-picker" type="button">
          <IconList size={16} stroke={1.8} />
          <span>All {title}</span>
          <span>· 0</span>
          <IconChevronDown size={14} stroke={1.8} />
        </button>
        <div className="twenty-view-actions">
          <button type="button">Filter</button>
          <button type="button">Sort</button>
          <button type="button">Options</button>
        </div>
      </div>
      <div className="twenty-empty-table">
        <span>No records</span>
      </div>
    </div>
  );
}
