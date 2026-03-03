import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Eye, FileDown, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mlpItems = [
  { id: 1, title: "Unauthorized access to financial system", responsibleAuditor: "Talal Hosni", status: "Open" },
  { id: 2, title: "Outdated backup recovery procedures", responsibleAuditor: "Manal Rebhi", status: "In Progress" },
  { id: 3, title: "Missing segregation of duties in AP", responsibleAuditor: "Talal Hosni", status: "Open" },
  { id: 4, title: "Incomplete vendor onboarding documentation", responsibleAuditor: "Ahmad Jalal", status: "Closed" },
  { id: 5, title: "No periodic review of user access rights", responsibleAuditor: "Manal Rebhi", status: "Overdue" },
  { id: 6, title: "Policy manual not updated", responsibleAuditor: "Wajdi Talal", status: "Open" },
];

const mockAuditors = ["Talal Hosni", "Manal Rebhi", "Ahmad Jalal", "Wajdi Talal"];
const ITEMS_PER_PAGE = 3;

export default function MLP() {
  const [page, setPage] = useState(0);
  const [selectedMlp, setSelectedMlp] = useState<typeof mlpItems[0] | null>(null);
  const [backgroundEntries, setBackgroundEntries] = useState<{ id: number; details: string }[]>([{ id: 1, details: "" }]);
  const [observationEntries, setObservationEntries] = useState<{ id: number; details: string }[]>([{ id: 1, details: "" }]);

  const totalPages = Math.ceil(mlpItems.length / ITEMS_PER_PAGE);
  const paginatedItems = mlpItems.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  const addBackgroundEntry = () => setBackgroundEntries((prev) => [...prev, { id: Date.now(), details: "" }]);
  const addObservationEntry = () => setObservationEntries((prev) => [...prev, { id: Date.now(), details: "" }]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Management Letter Points</h1>
          <p className="text-sm text-muted-foreground mt-1">Formal audit findings communicated to management. Export as PDF, approval flow.</p>
        </div>
        <Button className="gap-2" onClick={() => setSelectedMlp({ id: 0, title: "", responsibleAuditor: "", status: "Open" })}>
          <Plus className="w-4 h-4" /> Add MLP
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground w-12">No.</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Responsible Auditor</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground w-28">Status</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{item.id}</td>
                  <td className="px-4 py-3 text-foreground">{item.title}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{item.responsibleAuditor}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedMlp(item)}><Eye className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Page {page + 1} of {totalPages}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>

      {/* MLP Detail / Edit Dialog */}
      <Dialog open={!!selectedMlp} onOpenChange={() => setSelectedMlp(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMlp?.id ? "Edit MLP" : "Add MLP"}</DialogTitle>
          </DialogHeader>
          {selectedMlp && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-foreground">Title (required)</label>
                <input type="text" defaultValue={selectedMlp.title} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" placeholder="MLP title" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Responsible Auditor</label>
                <Select defaultValue={selectedMlp.responsibleAuditor}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select auditor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAuditors.map((a) => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Introduction</label>
                <textarea rows={3} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Optional" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Summary of work performed</label>
                <textarea rows={3} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Optional" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Operational Background</label>
                  <Button type="button" variant="ghost" size="sm" className="gap-1 text-xs" onClick={addBackgroundEntry}><Plus className="w-3 h-3" /> Add Background Entry</Button>
                </div>
                {backgroundEntries.map((entry) => (
                  <div key={entry.id} className="flex gap-2 items-start mb-2 p-3 rounded-lg border border-border">
                    <textarea rows={2} defaultValue={entry.details} className="flex-1 text-sm rounded border border-input px-2 py-1" placeholder="Background details" />
                    <Button type="button" variant="ghost" size="sm" className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Observations Table</label>
                  <Button type="button" variant="ghost" size="sm" className="gap-1 text-xs" onClick={addObservationEntry}><Plus className="w-3 h-3" /> Add Observation Entry</Button>
                </div>
                {observationEntries.map((entry) => (
                  <div key={entry.id} className="flex gap-2 items-start mb-2 p-3 rounded-lg border border-border">
                    <textarea rows={2} defaultValue={entry.details} className="flex-1 text-sm rounded border border-input px-2 py-1" placeholder="Observation details" />
                    <Button type="button" variant="ghost" size="sm" className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Notes / Comments</label>
                <textarea rows={2} maxLength={1000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Add comment (threaded replies; not in exported PDF)" />
              </div>
              <div className="flex flex-wrap gap-2 justify-end pt-2">
                <Button variant="outline" className="gap-1"><FileDown className="w-4 h-4" /> Export as PDF</Button>
                <Button variant="outline">Check Approval</Button>
                <Button>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
