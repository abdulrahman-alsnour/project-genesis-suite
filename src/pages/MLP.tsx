import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";

const mlpItems = [
  { id: 1, observation: "Unauthorized access to financial system", category: "Access Control", risk: "High", recommendation: "Implement multi-factor authentication", actionPlan: "IT to deploy MFA by Q1 2026", owner: "IT Department", dueDate: "Mar 30, 2026", status: "Open" },
  { id: 2, observation: "Outdated backup recovery procedures", category: "Business Continuity", risk: "Medium", recommendation: "Update and test disaster recovery plan", actionPlan: "Quarterly DR testing schedule", owner: "IT Department", dueDate: "Feb 28, 2026", status: "In Progress" },
  { id: 3, observation: "Missing segregation of duties in AP", category: "Financial Controls", risk: "High", recommendation: "Redesign approval workflow", actionPlan: "Finance to restructure AP process", owner: "Finance", dueDate: "Jan 31, 2026", status: "Open" },
  { id: 4, observation: "Incomplete vendor onboarding documentation", category: "Procurement", risk: "Low", recommendation: "Create standardized vendor checklist", actionPlan: "Procurement team to develop template", owner: "Operations", dueDate: "Dec 31, 2025", status: "Closed" },
  { id: 5, observation: "No periodic review of user access rights", category: "Access Control", risk: "Critical", recommendation: "Implement quarterly access reviews", actionPlan: "HR & IT joint quarterly review", owner: "HR / IT", dueDate: "Nov 30, 2025", status: "Overdue" },
];

const riskColors: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive",
  High: "bg-warning/15 text-warning",
  Medium: "bg-info/15 text-info",
  Low: "bg-muted text-muted-foreground",
};

export default function MLP() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Management Letter Points</h1>
          <p className="text-sm text-muted-foreground mt-1">Formal audit findings communicated to management</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Add MLP</Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">#</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Observation</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Risk</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Recommendation</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Owner</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Due</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mlpItems.map(item => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{item.id}</td>
                  <td className="px-4 py-3 text-foreground max-w-[200px] truncate" title={item.observation}>{item.observation}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{item.category}</td>
                  <td className="px-4 py-3"><span className={`status-badge ${riskColors[item.risk]}`}>{item.risk}</span></td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate text-xs" title={item.recommendation}>{item.recommendation}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{item.owner}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{item.dueDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-center"><Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
