import { useState } from "react";
import { Plus, Eye, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const auditPlans = [
  { id: 1, name: "2024 - 2026", docsCount: 5 },
  { id: 2, name: "2021 - 2023", docsCount: 3 },
  { id: 3, name: "2018 - 2020", docsCount: 8 },
];

const planDetails = [
  { id: 1, department: "Finance", function: "Accounts Payable", years: { 2024: true, 2025: false, 2026: true } },
  { id: 2, department: "IT", function: "Cybersecurity", years: { 2024: false, 2025: true, 2026: false } },
  { id: 3, department: "HR", function: "Recruitment", years: { 2024: true, 2025: true, 2026: false } },
  { id: 4, department: "Operations", function: "Logistics", years: { 2024: false, 2025: false, 2026: true } },
  { id: 5, department: "Sales", function: "Marketing", years: { 2024: true, 2025: false, 2026: true } },
];

export default function AuditPlans() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(1);
  const [showAddAudit, setShowAddAudit] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Plans</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage multi-year audit plans and assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Audit Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">From Year</label>
                  <input type="number" defaultValue={2027} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">To Year</label>
                  <input type="number" defaultValue={2029} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
              </div>
              <Button className="w-full">Create Plan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans List */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Plans List</h2>
        </div>
        <div className="divide-y divide-border">
          {auditPlans.map((plan) => (
            <div key={plan.id} className={`px-6 py-4 flex items-center justify-between transition-colors cursor-pointer ${selectedPlan === plan.id ? "bg-primary/5" : "hover:bg-muted/50"}`}>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground w-6">{plan.id}</span>
                <span className="text-sm font-medium text-foreground">{plan.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <Upload className="w-3 h-3" /> {plan.docsCount} Docs
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPlan(plan.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Details */}
      {selectedPlan && (
        <div className="bg-card rounded-xl border border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Plan Details — {auditPlans.find(p => p.id === selectedPlan)?.name}
            </h2>
            <Button size="sm" className="gap-1" onClick={() => setShowAddAudit(true)}>
              <Plus className="w-4 h-4" /> Add Audit
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">ID</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Department</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Function</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">2024</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">2025</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">2026</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">Documents</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {planDetails.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-mono text-muted-foreground">{row.id}</td>
                    <td className="px-6 py-3 font-medium text-foreground">{row.department}</td>
                    <td className="px-6 py-3 text-foreground">{row.function}</td>
                    <td className="px-6 py-3 text-center">
                      <input type="checkbox" defaultChecked={row.years[2024]} className="rounded border-input" />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <input type="checkbox" defaultChecked={row.years[2025]} className="rounded border-input" />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <input type="checkbox" defaultChecked={row.years[2026]} className="rounded border-input" />
                    </td>
                    <td className="px-6 py-3 text-center">
                      <Button variant="ghost" size="sm" className="text-xs gap-1">
                        <Upload className="w-3 h-3" /> Library
                      </Button>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Audit Dialog */}
      <Dialog open={showAddAudit} onOpenChange={setShowAddAudit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Audit Record</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Department</label>
              <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                <option>Select Department</option>
                <option>Finance</option>
                <option>IT</option>
                <option>HR</option>
                <option>Operations</option>
                <option>Sales</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Function</label>
              <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                <option>Select Function</option>
                <option>Operations</option>
                <option>Management</option>
                <option>Compliance</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Applicable Years</label>
              <div className="flex gap-4 mt-2">
                {[2024, 2025, 2026].map(y => (
                  <label key={y} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-input" /> {y}
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-medium text-foreground mb-2">Assign Weights</h4>
              <div className="space-y-2">
                {["Initial Requirements", "Kick-off Meeting", "Business Understanding", "Audit Program", "Reporting"].map((phase, i) => (
                  <div key={phase} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{phase}</span>
                    <input type="number" defaultValue={[10, 10, 10, 36, 34][i]} className="w-20 px-2 py-1 rounded border border-input bg-background text-sm text-right" />
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full">Add Record</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
