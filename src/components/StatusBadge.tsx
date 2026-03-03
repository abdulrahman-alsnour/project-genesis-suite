import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { className: string }> = {
  "Not Started": { className: "status-badge status-not-started" },
  "Pending": { className: "status-badge status-pending" },
  "In Progress": { className: "status-badge status-in-progress" },
  "Completed": { className: "status-badge status-completed" },
  "Delayed": { className: "status-badge status-delayed" },
  "Received": { className: "status-badge status-completed" },
  "Partially Received": { className: "status-badge status-pending" },
  "N/A": { className: "status-badge status-not-started" },
  "Control Failure": { className: "status-badge status-delayed" },
  "Draft": { className: "status-badge status-pending" },
  "Final": { className: "status-badge status-completed" },
  "Open": { className: "status-badge status-in-progress" },
  "Closed": { className: "status-badge status-completed" },
  "Overdue": { className: "status-badge status-delayed" },
  "Rejected": { className: "status-badge status-delayed" },
  "Incomplete": { className: "status-badge status-delayed" },
  "Partially Done": { className: "status-badge status-pending" },
  "Pending Approval": { className: "status-badge status-pending" },
  "Not due": { className: "status-badge status-not-started" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { className: "status-badge status-not-started" };
  return <span className={config.className}>{status}</span>;
}
