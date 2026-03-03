import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

const reports = [
  { id: 1, title: "Finance - Accounts Payable Audit Report", type: "Draft", department: "Finance", date: "Dec 1, 2025", status: "Draft" },
  { id: 2, title: "IT Cybersecurity Assessment Report", type: "Final", department: "IT", date: "Nov 20, 2025", status: "Final" },
  { id: 3, title: "HR Recruitment Process Audit", type: "Draft", department: "HR", date: "Nov 28, 2025", status: "Draft" },
  { id: 4, title: "Operations Logistics Review", type: "Final", department: "Operations", date: "Oct 15, 2025", status: "Final" },
  { id: 5, title: "Sales Marketing Compliance Audit", type: "Draft", department: "Sales", date: "Dec 5, 2025", status: "Draft" },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage audit reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Reports", value: reports.length },
          { label: "Draft", value: reports.filter(r => r.status === "Draft").length },
          { label: "Finalized", value: reports.filter(r => r.status === "Final").length },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Report</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Department</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-center font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{r.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{r.department}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{r.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
