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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Test of Controls — Step {step.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Audit Step</label>
              <p className="text-sm text-muted-foreground mt-1">{step.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Control Objective</label>
              <textarea rows={2} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" defaultValue="Ensure proper authorization and approval of transactions." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Sample Size</label>
                <input type="number" defaultValue={25} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Sampling Methodology</label>
                <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  <option>Random Sampling</option>
                  <option>Systematic Sampling</option>
                  <option>Judgmental Sampling</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Test Results</label>
              <textarea rows={3} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" placeholder="Document testing results here..." />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Conclusion</label>
              <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                <option>Effective</option>
                <option>Control Failure</option>
                <option>Partially Effective</option>
                <option>Not Tested</option>
              </select>
            </div>
            <Button className="w-full">Save ToC Details</Button>
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
