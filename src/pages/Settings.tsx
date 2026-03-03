import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, UserCog } from "lucide-react";

const mockUsers = ["Talal Hosni", "Manal Rebhi", "Ahmad Jalal", "Wajdi Talal"];

const initialDelegations = [
  { id: 1, delegateFrom: "Talal Hosni", delegateTo: "Manal Rebhi", startDate: "2025-12-20", endDate: "2026-01-05" },
];

export default function Settings() {
  const [delegations, setDelegations] = useState(initialDelegations);
  const [addDelegationOpen, setAddDelegationOpen] = useState(false);
  const [form, setForm] = useState({ delegateFrom: "", delegateTo: "", startDate: "", endDate: "" });

  const today = new Date().toISOString().slice(0, 10);

  const handleAddDelegation = () => {
    if (!form.delegateFrom || !form.delegateTo || !form.startDate || !form.endDate) return;
    if (form.startDate < today) return;
    setDelegations((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ delegateFrom: "", delegateTo: "", startDate: "", endDate: "" });
    setAddDelegationOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">System and user settings (Admin/Director)</p>
      </div>

      {/* Delegation (Out of Office) */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Delegation (Out of Office)</h2>
          </div>
          <Button size="sm" className="gap-1" onClick={() => setAddDelegationOpen(true)}>
            <Plus className="w-4 h-4" /> Add Delegation
          </Button>
        </div>
        <p className="px-6 py-3 text-sm text-muted-foreground">
          Assign tasks and permissions from one user to another for a date range. Only one active delegation per user. Start date cannot be before today.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Delegate From</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Delegate To</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Start Date</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">End Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {delegations.map((d) => (
                <tr key={d.id} className="hover:bg-muted/30">
                  <td className="px-6 py-3 text-foreground">{d.delegateFrom}</td>
                  <td className="px-6 py-3 text-foreground">{d.delegateTo}</td>
                  <td className="px-6 py-3 text-muted-foreground">{d.startDate}</td>
                  <td className="px-6 py-3 text-muted-foreground">{d.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={addDelegationOpen} onOpenChange={setAddDelegationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Delegation (Out of Office)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Delegate From</label>
              <select
                value={form.delegateFrom}
                onChange={(e) => setForm((f) => ({ ...f, delegateFrom: e.target.value }))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">Select employee out of office</option>
                {mockUsers.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Delegate To</label>
              <select
                value={form.delegateTo}
                onChange={(e) => setForm((f) => ({ ...f, delegateTo: e.target.value }))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">Select employee to delegate to</option>
                {mockUsers.filter((u) => u !== form.delegateFrom).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Start Date</label>
              <input
                type="date"
                min={today}
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">End Date</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
              />
            </div>
            <Button className="w-full" onClick={handleAddDelegation}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
