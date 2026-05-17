export function SettingsHeader({ title }: { title: string }) {
  return (
    <header className="twenty-page-header twenty-settings-page-header">
      <div className="twenty-settings-breadcrumb">
        <span>User</span>
        <span>/</span>
        <strong>{title}</strong>
      </div>
      <div className="twenty-page-actions" />
    </header>
  );
}
