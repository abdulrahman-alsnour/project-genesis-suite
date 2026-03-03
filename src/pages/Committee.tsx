import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, FileText } from "lucide-react";

const meetings = [
  { id: 1, date: "Dec 15, 2025", subject: "Q4 2025 Audit Committee Meeting", attendees: 8, resolutions: 5, status: "Completed" },
  { id: 2, date: "Jan 20, 2026", subject: "Annual Audit Plan Review 2026", attendees: 10, resolutions: 0, status: "Pending" },
  { id: 3, date: "Sep 22, 2025", subject: "Q3 2025 Audit Committee Meeting", attendees: 7, resolutions: 4, status: "Completed" },
];

const resolutions = [
  { id: 1, resolution: "Implement MFA for all critical systems", assignee: "IT Department", deadline: "Mar 30, 2026", meeting: "Q4 2025", status: "In Progress" },
  { id: 2, resolution: "Update disaster recovery plan", assignee: "IT Department", deadline: "Feb 28, 2026", meeting: "Q4 2025", status: "In Progress" },
  { id: 3, resolution: "Conduct quarterly access reviews", assignee: "HR / IT", deadline: "Jan 31, 2026", meeting: "Q4 2025", status: "Pending" },
  { id: 4, resolution: "Redesign AP approval workflow", assignee: "Finance", deadline: "Jan 15, 2026", meeting: "Q4 2025", status: "Overdue" },
  { id: 5, resolution: "Standardize vendor onboarding", assignee: "Operations", deadline: "Dec 31, 2025", meeting: "Q3 2025", status: "Completed" },
];

export default function Committee() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Committee</h1>
          <p className="text-sm text-muted-foreground mt-1">Committee meetings and resolution tracking</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Schedule Meeting</Button>
      </div>

      {/* Meetings */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Committee Meetings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meetings.map(m => (
            <div key={m.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{m.date}</span>
                <StatusBadge status={m.status} />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{m.subject}</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{m.attendees} attendees</span>
                <span>{m.resolutions} resolutions</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-xs gap-1 flex-1"><FileText className="w-3 h-3" /> MoM</Button>
                <Button variant="outline" size="sm" className="text-xs flex-1">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resolutions */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Resolution Tracker</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">#</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Resolution</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Assignee</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Meeting</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Deadline</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {resolutions.map(r => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 text-foreground">{r.resolution}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{r.assignee}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{r.meeting}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{r.deadline}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
