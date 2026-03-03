import { Button } from "@/components/ui/button";
import { Plus, Building2, ChevronRight } from "lucide-react";
import { useState } from "react";

const departments = [
  { id: 1, name: "Finance", functions: ["Accounts Payable", "Accounts Receivable", "Treasury", "Financial Reporting"] },
  { id: 2, name: "Information Technology", functions: ["Cybersecurity", "Infrastructure", "Applications", "Data Management"] },
  { id: 3, name: "Human Resources", functions: ["Recruitment", "Payroll", "Training & Development", "Compliance"] },
  { id: 4, name: "Operations", functions: ["Logistics", "Procurement", "Quality Control", "Maintenance"] },
  { id: 5, name: "Sales & Marketing", functions: ["Sales Operations", "Marketing", "Customer Relations", "Business Development"] },
];

export default function AuditUniverse() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Universe</h1>
          <p className="text-sm text-muted-foreground mt-1">Master list of auditable entities — departments and functions</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Add Department</Button>
      </div>

      <div className="space-y-3">
        {departments.map(dept => (
          <div key={dept.id} className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === dept.id ? null : dept.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-foreground">{dept.name}</h3>
                  <p className="text-xs text-muted-foreground">{dept.functions.length} functions</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expanded === dept.id ? "rotate-90" : ""}`} />
            </button>
            {expanded === dept.id && (
              <div className="border-t border-border px-6 py-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Functions</span>
                  <Button size="sm" variant="ghost" className="text-xs gap-1"><Plus className="w-3 h-3" /> Add Function</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {dept.functions.map((fn, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-muted/50 text-sm text-foreground">
                      <span className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-xs font-mono text-primary">{i + 1}</span>
                      {fn}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
