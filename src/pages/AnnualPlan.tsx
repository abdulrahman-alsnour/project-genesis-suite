import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileCheck, Megaphone, Pencil, BookOpen, Users, Eye } from "lucide-react";

const annualData = [
  { id: 1, department: "Finance", function: "Accounts Payable", startDate: "12/4", endDate: "23/5", auditors: 2, status: "Not Started", supposedProgress: 33, actualProgress: 0, resources: "Co-sourced" },
  { id: 2, department: "IT", function: "Cybersecurity", startDate: "3/11", endDate: "12/12", auditors: 3, status: "In Progress", supposedProgress: 66, actualProgress: 30, resources: "In-House" },
  { id: 3, department: "HR", function: "Recruitment", startDate: "26/7", endDate: "1/9", auditors: 3, status: "Delayed", supposedProgress: 99, actualProgress: 60, resources: "In-House" },
  { id: 4, department: "Operations", function: "Logistics", startDate: "1/3", endDate: "15/4", auditors: 2, status: "Completed", supposedProgress: 100, actualProgress: 100, resources: "Co-sourced" },
  { id: 5, department: "Sales", function: "Marketing", startDate: "5/6", endDate: "20/7", auditors: 4, status: "In Progress", supposedProgress: 50, actualProgress: 42, resources: "In-House" },
];

export default function AnnualPlan() {
  const [selectedYear] = useState("2025");
  const [editAudit, setEditAudit] = useState<typeof annualData[0] | null>(null);
  const overallProgress = Math.round(annualData.reduce((a, b) => a + b.actualProgress, 0) / annualData.length);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Annual Audit Plan</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage annual audit execution</p>
        </div>
        <select className="px-4 py-2 rounded-lg border border-input bg-card text-sm font-medium" defaultValue={selectedYear}>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>

      {/* Progress Overview */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Overall Progress — {selectedYear}</h2>
          <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-3">
          <strong>Note:</strong> Audit plan revised 2 times. Last change: Added IT Cybersecurity audit per board directive.
        </p>
      </div>

      {/* Audit Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Department</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Function</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Duration</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Auditors</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Expected %</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Actual %</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Resources</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {annualData.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{row.department}</td>
                  <td className="px-4 py-3 text-foreground">{row.function}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{row.startDate} — {row.endDate}</td>
                  <td className="px-4 py-3 text-center">{row.auditors}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.supposedProgress}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${row.actualProgress < row.supposedProgress ? "text-destructive" : "text-success"}`}>
                      {row.actualProgress}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${row.resources === "In-House" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                      {row.resources}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" title="LoR Tracker"><FileCheck className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Announce"><Megaphone className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Edit" onClick={() => setEditAudit(row)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Business Understanding"><BookOpen className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Team"><Users className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Audit Dialog */}
      <Dialog open={!!editAudit} onOpenChange={() => setEditAudit(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Audit Record</DialogTitle>
          </DialogHeader>
          {editAudit && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <input defaultValue={editAudit.department} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Function</label>
                  <input defaultValue={editAudit.function} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">No. of Auditors</label>
                  <input type="number" defaultValue={editAudit.auditors} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Resources</label>
                  <select defaultValue={editAudit.resources} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                    <option>In-House</option>
                    <option>Co-sourced</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Start Date</label>
                  <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">End Date</label>
                  <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
              </div>
              <Button className="w-full">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
