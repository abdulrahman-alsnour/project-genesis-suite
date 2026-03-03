import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, MessageSquare, ChevronDown, ChevronRight, Paperclip } from "lucide-react";

const requirements = [
  { id: 1, requirement: "System access rights for users currently in use", status: "Pending", dateRequested: "November 5, 2025", deadline: "November 20, 2025", type: "General" },
  { id: 2, requirement: "Previous audit reports for the department", status: "Received", dateRequested: "November 5, 2025", deadline: "November 15, 2025", type: "General" },
  { id: 3, requirement: "Organizational chart of the department", status: "Partially Received", dateRequested: "November 8, 2025", deadline: "November 22, 2025", type: "General" },
  { id: 4, requirement: "List of all active vendors and contracts", status: "Received", dateRequested: "November 15, 2025", deadline: "November 25, 2025", type: "General" },
  { id: 5, requirement: "Risk assessment documentation", status: "N/A", dateRequested: "November 19, 2025", deadline: "December 1, 2025", type: "Additional" },
  { id: 6, requirement: "Internal policies and procedures manual", status: "Pending", dateRequested: "November 22, 2025", deadline: "December 5, 2025", type: "General" },
  { id: 7, requirement: "Financial statements for Q1-Q3", status: "Pending", dateRequested: "November 22, 2025", deadline: "December 8, 2025", type: "Additional" },
  { id: 8, requirement: "IT systems access log for last 6 months", status: "Pending", dateRequested: "November 27, 2025", deadline: "December 10, 2025", type: "Additional" },
];

export default function LorTracker() {
  const [activeTab, setActiveTab] = useState<"General" | "Additional">("General");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showAddReq, setShowAddReq] = useState(false);

  const filtered = requirements.filter(r => r.type === activeTab);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">LoR Tracker</h1>
          <p className="text-sm text-muted-foreground mt-1">Sales Marketing — Func 1</p>
        </div>
        <Button className="gap-2" onClick={() => setShowAddReq(true)}>
          <Plus className="w-4 h-4" /> Add Requirement
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {(["General", "Additional"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab} Requirements
          </button>
        ))}
      </div>

      {/* Requirements Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 w-8"></th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ref #</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Requirement</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date Requested</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((req) => (
              <>
                <tr key={req.id} className="hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setExpandedRow(expandedRow === req.id ? null : req.id)}>
                  <td className="px-4 py-3">
                    {expandedRow === req.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{req.id}</td>
                  <td className="px-4 py-3 text-foreground">{req.requirement}</td>
                  <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{req.dateRequested}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{req.deadline}</td>
                </tr>
                {expandedRow === req.id && (
                  <tr key={`${req.id}-detail`}>
                    <td colSpan={6} className="px-6 py-4 bg-muted/20">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3">Attachments</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Paperclip className="w-3.5 h-3.5" />
                              <span>Document_v1.pdf</span>
                              <span className="text-xs">— Nov 5, 2025</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Paperclip className="w-3.5 h-3.5" />
                              <span>Supporting_data.xlsx</span>
                              <span className="text-xs">— Nov 6, 2025</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3">Notes / Comments</h4>
                          <div className="space-y-2">
                            <div className="bg-card rounded-lg p-3 border border-border">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-foreground">Talal Hosni</span>
                                <span className="text-xs text-muted-foreground">Nov 5, 2025 3:17 PM</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Please provide the latest version of this document.</p>
                            </div>
                            <div className="bg-card rounded-lg p-3 border border-border">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-foreground">Manal Rebhi</span>
                                <span className="text-xs text-muted-foreground">Nov 4, 2025 3:19 PM</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Will upload by end of week.</p>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <input placeholder="Add a comment..." className="flex-1 px-3 py-1.5 rounded-lg border border-input bg-background text-xs" />
                            <Button size="sm" variant="outline" className="gap-1 text-xs">
                              <MessageSquare className="w-3 h-3" /> Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Requirement Dialog */}
      <Dialog open={showAddReq} onOpenChange={setShowAddReq}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Requirement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Requirement</label>
              <textarea rows={3} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Describe the required document..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  <option>Pending</option>
                  <option>Received</option>
                  <option>Partially Received</option>
                  <option>N/A</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Deadline Date</label>
                <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Comment</label>
              <input className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" placeholder="Optional comment..." />
            </div>
            <Button className="w-full">Add Requirement</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
