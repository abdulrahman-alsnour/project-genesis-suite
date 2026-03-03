import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileText, Download, Eye, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const reports = [
  { id: 1, title: "Finance - Accounts Payable Audit Report", department: "Finance", date: "Dec 1, 2025", status: "Draft" },
  { id: 2, title: "IT Cybersecurity Assessment Report", department: "IT", date: "Nov 20, 2025", status: "Final" },
  { id: 3, title: "HR Recruitment Process Audit", department: "HR", date: "Nov 28, 2025", status: "Draft" },
];

const observationDistribution = [
  { name: "Critical", value: 2, color: "hsl(var(--destructive))" },
  { name: "High", value: 5, color: "hsl(var(--warning))" },
  { name: "Medium", value: 8, color: "hsl(var(--info))" },
  { name: "Low", value: 4, color: "hsl(var(--muted-foreground))" },
];

const reportObservations = [
  { id: 1, no: 1, title: "Unauthorized access to financial system", significance: "High", qualified: true, followUpStatus: "In Progress" },
  { id: 2, no: 2, title: "Outdated backup recovery procedures", significance: "Medium", qualified: true, followUpStatus: "Not due" },
  { id: 3, no: 3, title: "Missing segregation of duties in AP", significance: "High", qualified: false, followUpStatus: "Overdue" },
];

const chartConfig = {
  Critical: { label: "Critical" },
  High: { label: "High" },
  Medium: { label: "Medium" },
  Low: { label: "Low" },
};

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);
  const [observationFilter, setObservationFilter] = useState<"all" | "qualified">("all");
  const [expandedObsId, setExpandedObsId] = useState<number | null>(null);
  const [retrieveInitialOpen, setRetrieveInitialOpen] = useState(false);

  const filteredObservations = observationFilter === "qualified" ? reportObservations.filter((o) => o.qualified) : reportObservations;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage audit reports with executive summary, observations, and appendices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Reports", value: reports.length },
          { label: "Draft", value: reports.filter((r) => r.status === "Draft").length },
          { label: "Finalized", value: reports.filter((r) => r.status === "Final").length },
        ].map((s) => (
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
                      <Button variant="ghost" size="sm" onClick={() => setSelectedReport(r)}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Detail Dialog - Executive Summary / Observations / Appendices */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title}</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <Tabs defaultValue="executive" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="executive">Executive Summary</TabsTrigger>
                <TabsTrigger value="observations">Observations</TabsTrigger>
                <TabsTrigger value="appendices">Appendices</TabsTrigger>
              </TabsList>
              <TabsContent value="executive" className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Background (required)</label>
                  <textarea rows={3} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Audit background..." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Summary of Work (required)</label>
                  <textarea rows={3} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Summary of work performed..." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Scope of Work (required)</label>
                  <textarea rows={3} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Audit scope..." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Time Frame (required)</label>
                  <textarea rows={2} maxLength={2000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Audit time frame..." />
                </div>
                <p className="text-xs text-muted-foreground">Report content is autosaved. You can switch tabs without losing data.</p>
              </TabsContent>
              <TabsContent value="observations" className="space-y-4 pt-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="gap-1" onClick={() => setRetrieveInitialOpen(true)}>Retrieve Initial Observations</Button>
                    <Button size="sm" className="gap-1"><Plus className="w-4 h-4" /> Add Observation</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Filter:</span>
                    <button className={`text-sm px-2 py-1 rounded ${observationFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted"}`} onClick={() => setObservationFilter("all")}>All</button>
                    <button className={`text-sm px-2 py-1 rounded ${observationFilter === "qualified" ? "bg-primary text-primary-foreground" : "bg-muted"}`} onClick={() => setObservationFilter("qualified")}>Qualified only</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Observations Distribution</h4>
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                      <PieChart>
                        <Pie data={observationDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                          {observationDistribution.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                    <p className="text-xs text-muted-foreground text-center">Total: {reportObservations.length} observations</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Observation list</h4>
                    {filteredObservations.map((obs) => (
                      <div key={obs.id} className="border border-border rounded-lg overflow-hidden">
                        <div
                          className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/50"
                          onClick={() => setExpandedObsId(expandedObsId === obs.id ? null : obs.id)}
                        >
                          <div className="flex items-center gap-2">
                            {expandedObsId === obs.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            <span className="text-sm font-medium">#{obs.no} {obs.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${obs.significance === "High" ? "bg-warning/15 text-warning" : "bg-info/15 text-info"}`}>{obs.significance}</span>
                            {obs.qualified ? <span className="text-xs text-success">Qualified</span> : <span className="text-xs text-muted-foreground">Disqualified</span>}
                          </div>
                        </div>
                        {expandedObsId === obs.id && (
                          <div className="border-t border-border px-4 py-3 space-y-3 bg-muted/20">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Observation description</label>
                              <p className="text-sm mt-0.5">Description and recommendations (filled by auditors).</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Action Plan / Response</label>
                              <p className="text-sm mt-0.5">Filled by department user.</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Responsibility / Timeline</label>
                              <p className="text-sm mt-0.5">Filled by department user.</p>
                            </div>
                            <div className="flex gap-4 text-xs">
                              <span><strong>Due Date:</strong> 10/2026</span>
                              <span><strong>Follow-up Status:</strong> <StatusBadge status={obs.followUpStatus} /></span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Internal Board</Button>
                              <Button size="sm" variant="outline">External Board</Button>
                            </div>
                            <Tabs defaultValue="details" className="w-full">
                              <TabsList className="h-8">
                                <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
                                <TabsTrigger value="followup" className="text-xs">Follow-up</TabsTrigger>
                              </TabsList>
                              <TabsContent value="followup" className="pt-2">
                                <p className="text-xs text-muted-foreground">Observation Follow-up updates (filled by department user). Due Date read-only. Status: Not due, Overdue, In Progress, Completed.</p>
                              </TabsContent>
                            </Tabs>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Button size="sm" variant="outline">Check Approval</Button>
              </TabsContent>
              <TabsContent value="appendices" className="pt-4">
                <p className="text-sm text-muted-foreground mb-3">Attachments library for the report.</p>
                <div className="border border-dashed border-input rounded-lg p-6 text-center text-sm text-muted-foreground">
                  Drag & drop or click to upload appendices (Word, Excel, PowerPoint, PDF, images, max 10MB)
                </div>
                <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
                  <li className="px-4 py-3 text-sm text-muted-foreground">No appendices uploaded yet.</li>
                </ul>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Retrieve Initial Observations Dialog */}
      <Dialog open={retrieveInitialOpen} onOpenChange={setRetrieveInitialOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Audit Initial Observations</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Initial observations from Team Assignment, Business Understanding, Kick-off Meeting, LoR Tracker, Audit Program, ToC. Select which to convert into formal audit observations.</p>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {["Team Assignment: Initial note on access controls", "LoR Tracker: Missing policy document", "Audit Program: Control gap in Step B.2"].map((text, i) => (
              <label key={i} className="flex items-center gap-2 p-2 rounded border border-border cursor-pointer hover:bg-muted/50">
                <input type="checkbox" />
                <span className="text-sm">{text}</span>
              </label>
            ))}
          </div>
          <Button className="w-full" onClick={() => setRetrieveInitialOpen(false)}>Add selected as observations</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
