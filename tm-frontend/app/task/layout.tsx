

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Task Manager</nav>

      {children}
    </div>
  );
}
