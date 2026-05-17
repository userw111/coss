export function SettingsBlankPage({ title }: { title: string }) {
  return (
    <div className="twenty-settings-blank">
      <h1>{title}</h1>
      <div className="twenty-settings-placeholder">
        <span>This page is intentionally blank for the mockup shell.</span>
      </div>
    </div>
  );
}
