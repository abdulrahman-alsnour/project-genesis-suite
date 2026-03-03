import { useState } from "react";
import { Plus, Eye, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const auditPlans = [
  { id: 1, name: "2024 - 2026", docsCount: 5 },
  { id: 2, name: "2021 - 2023", docsCount: 3 },
  { id: 3, name: "2018 - 2020", docsCount: 8 },
];

const mockPlanDocs = [
  { id: 1, name: "Risk_Assessment_2024.pdf", size: "1.2 MB", date: "Nov 1, 2024" },
  { id: 2, name: "Scope_Definition.docx", size: "245 KB", date: "Nov 5, 2024" },
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
  const [docsContext, setDocsContext] = useState<{ planId: number; recordId?: number; recordLabel?: string } | null>(null);
  const [planPage, setPlanPage] = useState(0);
  const plansPerPage = 2;
  const sortedPlans = [...auditPlans].sort((a, b) => b.id - a.id);
  const paginatedPlans = sortedPlans.slice(planPage * plansPerPage, planPage * plansPerPage + plansPerPage);

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
          {paginatedPlans.map((plan) => (
            <div key={plan.id} className={`px-6 py-4 flex items-center justify-between transition-colors cursor-pointer ${selectedPlan === plan.id ? "bg-primary/5" : "hover:bg-muted/50"}`}>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground w-6">{plan.id}</span>
                <span className="text-sm font-medium text-foreground">{plan.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={(e) => { e.stopPropagation(); setDocsContext({ planId: plan.id }); }}>
                  <Upload className="w-3 h-3" /> {plan.docsCount} Docs
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPlan(plan.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {sortedPlans.length > plansPerPage && (
          <div className="px-6 py-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Page {planPage + 1} of {Math.ceil(sortedPlans.length / plansPerPage)}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={planPage === 0} onClick={() => setPlanPage((p) => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={planPage >= Math.ceil(sortedPlans.length / plansPerPage) - 1} onClick={() => setPlanPage((p) => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>

      {/* Plan Details */}
      {selectedPlan && (
        <div className="bg-card rounded-xl border border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Plan Details — {auditPlans.find(p => p.id === selectedPlan)?.name}
            </h2>
            <Button size="sm" className="gap-1" onClick={() => setShowAddAudit(true)}>
              <Plus className="w-4 h-4" /> Add Record
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
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">Supporting Documents</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...planDetails].sort((a, b) => a.department.localeCompare(b.department)).map((row) => (
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
                      <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => setDocsContext({ planId: selectedPlan, recordId: row.id, recordLabel: `${row.department} — ${row.function}` })}>
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

      {/* Supporting Documents Library Dialog */}
      <Dialog open={!!docsContext} onOpenChange={() => setDocsContext(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Supporting Documents {docsContext?.recordLabel ? `— ${docsContext.recordLabel}` : docsContext ? `— Plan ${docsContext.planId}` : ""}
            </DialogTitle>
          </DialogHeader>
          {docsContext && (
            <div className="space-y-4 py-4">
              <div className="border border-dashed border-input rounded-lg p-6 text-center text-sm text-muted-foreground">
                Drag & drop files here or click to upload (Word, Excel, PowerPoint, PDF, PNG, JPG, max 10MB)
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Uploaded documents</p>
                <ul className="divide-y divide-border rounded-lg border border-border">
                  {mockPlanDocs.map((doc) => (
                    <li key={doc.id} className="px-4 py-3 flex items-center justify-between">
                      <span className="text-sm text-foreground truncate flex-1">{doc.name}</span>
                      <span className="text-xs text-muted-foreground mx-2">{doc.size}</span>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive h-8 w-8 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
