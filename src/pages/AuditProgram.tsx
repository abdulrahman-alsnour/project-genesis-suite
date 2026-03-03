import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, ChevronRight, ChevronDown, MessageSquare } from "lucide-react";

interface Step {
  id: string;
  name: string;
  status: string;
  children?: Step[];
}

const programSteps: Step[] = [
  { id: "A", name: "Review access control policies", status: "Control Failure", children: [] },
  {
    id: "B", name: "Evaluate transaction processing controls", status: "In Progress",
    children: [
      { id: "B.1", name: "Test input validation controls", status: "Completed" },
      {
        id: "B.2", name: "Test processing accuracy", status: "Pending",
        children: [
          { id: "B.2.1", name: "Verify calculation logic", status: "Completed" },
          { id: "B.2.2", name: "Test exception handling", status: "Pending" },
        ],
      },
    ],
  },
  { id: "C", name: "Assess segregation of duties", status: "Completed", children: [] },
  { id: "D", name: "Review change management procedures", status: "Not Started", children: [] },
  { id: "E", name: "Test backup and recovery procedures", status: "Pending", children: [] },
];

function StepRow({ step, depth = 0 }: { step: Step; depth?: number }) {
  const [expanded, setExpanded] = useState(true);
  const [showToC, setShowToC] = useState(false);
  const hasChildren = step.children && step.children.length > 0;

  return (
    <>
      <tr className="hover:bg-muted/30 transition-colors border-b border-border">
        <td className="px-4 py-3" style={{ paddingLeft: `${16 + depth * 24}px` }}>
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button onClick={() => setExpanded(!expanded)} className="p-0.5">
                {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>
            ) : (
              <span className="w-5" />
            )}
            <span className="font-mono text-xs text-muted-foreground">{step.id}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-foreground">{step.name}</td>
        <td className="px-4 py-3"><StatusBadge status={step.status} /></td>
        <td className="px-4 py-3">
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setShowToC(true)}>View ToC</Button>
        </td>
      </tr>
      {expanded && hasChildren && step.children!.map(child => (
        <StepRow key={child.id} step={child} depth={depth + 1} />
      ))}

      <Dialog open={showToC} onOpenChange={setShowToC}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Test of Controls — Step {step.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Audit Step</label>
              <p className="text-sm text-muted-foreground mt-1">{step.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Requirement (mandatory)</label>
              <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                <option>Search requirement from LoR...</option>
                <option>System access rights for users</option>
                <option>Previous audit reports</option>
                <option>Organizational chart</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Auditor (required)</label>
                <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  <option>Talal Hosni</option>
                  <option>Manal Rebhi</option>
                  <option>Ahmad Jalal</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Reviewer (required)</label>
                <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  <option>Manal Rebhi</option>
                  <option>Talal Hosni</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Attachments</label>
              <div className="mt-1 border border-dashed border-input rounded-lg p-3 text-center text-xs text-muted-foreground">Upload supporting documents</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Test Start Date (required)</label>
                <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Review Date</label>
                <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Expected Completion Date (required)</label>
                <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Actual Completion Date</label>
                <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Status (required)</label>
              <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                <option>Pending</option>
                <option>Partially Done</option>
                <option>Completed</option>
                <option>Control Failure</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Test Objectives (required)</label>
              <textarea rows={2} maxLength={2000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Test objectives..." />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Sampling Methodology Justification (required)</label>
              <textarea rows={2} maxLength={2000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Sampling methodology..." />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Test Results (required)</label>
              <textarea rows={3} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Document testing results here..." />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Initial Observations</label>
              <textarea rows={2} maxLength={2000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Initial observations..." />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Notes / Comments</label>
              <textarea rows={2} maxLength={1000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Add comment (threaded replies)..." />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Save ToC Details</Button>
              <Button variant="outline" className="flex-1">Submit for review</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AuditProgram() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Program</h1>
          <p className="text-sm text-muted-foreground mt-1">Sales Marketing — Func 1</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Add Step</Button>
      </div>

      {/* Steps Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground w-32">Step</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground w-40">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground w-28">ToC Details</th>
            </tr>
          </thead>
          <tbody>
            {programSteps.map(step => (
              <StepRow key={step.id} step={step} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes & Observations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Notes / Comments</h3>
          <div className="space-y-3 mb-4">
            {[
              { author: "Talal Hosni", text: "Need to retest Step A after control remediation", date: "Nov 5, 2025 3:17 PM" },
              { author: "Manal Rebhi", text: "Step B.2 samples have been collected", date: "Nov 4, 2025 3:19 PM" },
            ].map((n, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{n.author}</span>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{n.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input placeholder="Add a note..." className="flex-1 px-3 py-1.5 rounded-lg border border-input bg-background text-xs" />
            <Button size="sm" variant="outline" className="gap-1 text-xs"><MessageSquare className="w-3 h-3" /> Send</Button>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Initial Observations</h3>
          <textarea
            rows={5}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none"
            defaultValue="1. Access control policy not updated since 2022.&#10;2. Three transactions found without proper authorization.&#10;3. Backup restoration test has not been performed in the last 12 months."
          />
          <Button size="sm" className="mt-3">Save Observations</Button>
        </div>
      </div>
    </div>
  );
}
