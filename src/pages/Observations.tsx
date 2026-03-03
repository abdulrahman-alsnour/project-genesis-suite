import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

const observations = [
  { id: 1, title: "Unauthorized access to financial system", severity: "High", status: "Open", department: "Finance", dateIdentified: "Nov 10, 2025", dueDate: "Dec 15, 2025", auditor: "Talal Hosni" },
  { id: 2, title: "Outdated backup recovery procedures", severity: "Medium", status: "In Progress", department: "IT", dateIdentified: "Nov 12, 2025", dueDate: "Dec 20, 2025", auditor: "Manal Rebhi" },
  { id: 3, title: "Missing segregation of duties in AP", severity: "High", status: "Open", department: "Finance", dateIdentified: "Nov 15, 2025", dueDate: "Jan 5, 2026", auditor: "Talal Hosni" },
  { id: 4, title: "Incomplete vendor onboarding documentation", severity: "Low", status: "Closed", department: "Operations", dateIdentified: "Oct 20, 2025", dueDate: "Nov 20, 2025", auditor: "Ahmad Jalal" },
  { id: 5, title: "No periodic review of user access rights", severity: "Critical", status: "Overdue", department: "IT", dateIdentified: "Nov 5, 2025", dueDate: "Nov 25, 2025", auditor: "Manal Rebhi" },
  { id: 6, title: "Policy manual not updated for 2 years", severity: "Medium", status: "In Progress", department: "HR", dateIdentified: "Nov 18, 2025", dueDate: "Dec 30, 2025", auditor: "Wajdi Talal" },
];

const severityColors: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive",
  High: "bg-warning/15 text-warning",
  Medium: "bg-info/15 text-info",
  Low: "bg-muted text-muted-foreground",
};

export default function Observations() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Observations</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage audit observations across all audits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          <Button className="gap-2"><Plus className="w-4 h-4" /> Add Observation</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total", value: observations.length, cls: "text-foreground" },
          { label: "Open", value: observations.filter(o => o.status === "Open").length, cls: "text-info" },
          { label: "In Progress", value: observations.filter(o => o.status === "In Progress").length, cls: "text-warning" },
          { label: "Overdue", value: observations.filter(o => o.status === "Overdue").length, cls: "text-destructive" },
          { label: "Closed", value: observations.filter(o => o.status === "Closed").length, cls: "text-success" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center">
            <p className={`text-2xl font-bold ${s.cls}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Observation</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Significance</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Department</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Due Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {observations.map((obs) => (
                <tr key={obs.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{obs.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{obs.title}</td>
                  <td className="px-4 py-3">
                    <span className={`status-badge ${severityColors[obs.severity]}`}>{obs.severity}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={obs.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{obs.department}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{obs.dueDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{obs.auditor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
