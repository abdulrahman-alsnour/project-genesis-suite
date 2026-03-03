import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, Megaphone, Pencil, BookOpen, Users, FileText, Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AuditRow = {
  id: number;
  department: string;
  function: string;
  month: string;
  startDate: string;
  endDate: string;
  auditors: number;
  status: string;
  supposedProgress: number;
  actualProgress: number;
  resources: string;
};

const annualData: AuditRow[] = [
  { id: 1, department: "Finance", function: "Accounts Payable", month: "Apr", startDate: "12/4", endDate: "23/5", auditors: 2, status: "Not Started", supposedProgress: 33, actualProgress: 0, resources: "Co-sourced" },
  { id: 2, department: "IT", function: "Cybersecurity", month: "Nov", startDate: "3/11", endDate: "12/12", auditors: 3, status: "In Progress", supposedProgress: 66, actualProgress: 30, resources: "In-House" },
  { id: 3, department: "HR", function: "Recruitment", month: "Jul", startDate: "26/7", endDate: "1/9", auditors: 3, status: "Delayed", supposedProgress: 99, actualProgress: 60, resources: "In-House" },
  { id: 4, department: "Operations", function: "Logistics", month: "Mar", startDate: "1/3", endDate: "15/4", auditors: 2, status: "Completed", supposedProgress: 100, actualProgress: 100, resources: "Co-sourced" },
  { id: 5, department: "Sales", function: "Marketing", month: "Jun", startDate: "5/6", endDate: "20/7", auditors: 4, status: "In Progress", supposedProgress: 50, actualProgress: 42, resources: "In-House" },
];

const mockAuditors = ["Talal Hosni", "Manal Rebhi", "Ahmad Jalal", "Wajdi Talal"];

export default function AnnualPlan() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("2025");
  const [editAudit, setEditAudit] = useState<AuditRow | null>(null);
  const [teamAssignmentRow, setTeamAssignmentRow] = useState<AuditRow | null>(null);
  const [announcementRow, setAnnouncementRow] = useState<AuditRow | null>(null);
  const [kickOffRow, setKickOffRow] = useState<AuditRow | null>(null);
  const [businessUnderstandingRow, setBusinessUnderstandingRow] = useState<AuditRow | null>(null);
  const overallProgressRaw = annualData.reduce((a, b) => a + b.actualProgress, 0) / annualData.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Annual Audit Plan</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage annual audit execution</p>
        </div>
        <select className="px-4 py-2 rounded-lg border border-input bg-card text-sm font-medium" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      {/* Progress Overview */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Overall Progress — {selectedYear}</h2>
          <span className="text-2xl font-bold text-primary">{overallProgressRaw.toFixed(2)}%</span>
        </div>
        <Progress value={overallProgressRaw} className="h-2" />
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
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Month</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Start/End Date</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">No. of Auditors</th>
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
                  <td className="px-4 py-3 text-muted-foreground text-xs">{row.month}</td>
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
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      <Button variant="ghost" size="sm" title="LoRs" onClick={() => navigate("/lor-tracker")}><FileCheck className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Announce" onClick={() => setAnnouncementRow(row)}><Megaphone className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Edit" onClick={() => setEditAudit(row)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Business Understanding" onClick={() => setBusinessUnderstandingRow(row)}><BookOpen className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Kick-Off Meeting" onClick={() => setKickOffRow(row)}><Calendar className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Team Assignment" onClick={() => setTeamAssignmentRow(row)}><Users className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" title="Report" onClick={() => navigate("/reports")}><FileText className="w-4 h-4" /></Button>
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
                  <label className="text-sm font-medium text-foreground">Audit Month</label>
                  <input type="month" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Start Date</label>
                  <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">End Date</label>
                <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <Button className="w-full">Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Team Assignment Dialog */}
      <Dialog open={!!teamAssignmentRow} onOpenChange={() => setTeamAssignmentRow(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Team Assignment {teamAssignmentRow && `— ${teamAssignmentRow.department} ${teamAssignmentRow.function}`}</DialogTitle>
          </DialogHeader>
          {teamAssignmentRow && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-foreground">Team members (at least one required)</label>
                <input type="text" placeholder="Search and select team members..." className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                <div className="mt-2 flex flex-wrap gap-2">
                  {mockAuditors.slice(0, 2).map((a) => (
                    <span key={a} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{a}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Auditor in charge (required)</label>
                <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  {mockAuditors.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Initial Observations (max 1000 chars)</label>
                <textarea rows={4} maxLength={1000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Enter initial observations or notes..." />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setTeamAssignmentRow(null)}>Cancel</Button>
                <Button>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Audit Announcement Dialog */}
      <Dialog open={!!announcementRow} onOpenChange={() => setAnnouncementRow(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Announcement {announcementRow && `— ${announcementRow.department} ${announcementRow.function}`}</DialogTitle>
          </DialogHeader>
          {announcementRow && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-foreground">To (required)</label>
                <input type="text" placeholder="Search and add primary recipients..." className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">CC</label>
                <input type="text" placeholder="Search and add CC recipients..." className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Subject (required)</label>
                <input type="text" placeholder="Email subject..." className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Details</label>
                <textarea rows={6} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Announcement body (customizable template). A link to the list of requirements is included in the announcement." />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAnnouncementRow(null)}>Cancel</Button>
                <Button>Request Approval</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Kick-Off Meeting Dialog */}
      <Dialog open={!!kickOffRow} onOpenChange={() => setKickOffRow(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kick-Off Meeting {kickOffRow && `— ${kickOffRow.department} ${kickOffRow.function}`}</DialogTitle>
          </DialogHeader>
          {kickOffRow && (
            <Tabs defaultValue="request" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="request">Meeting Request</TabsTrigger>
                <TabsTrigger value="mom">Kick-Off MoM</TabsTrigger>
              </TabsList>
              <TabsContent value="request" className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Subject (required)</label>
                  <input type="text" placeholder="Meeting subject..." className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Attendees (at least one required)</label>
                  <input type="text" placeholder="Search and select attendees..." className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Date (required)</label>
                    <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium text-foreground">Start Time</label>
                      <input type="time" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">End Time</label>
                      <input type="time" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="teams" />
                  <Label htmlFor="teams">Teams Meeting (virtual)</Label>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Meeting Agenda (required)</label>
                  <textarea rows={4} maxLength={2000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Meeting agenda details..." />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setKickOffRow(null)}>Cancel</Button>
                  <Button>Check Approval</Button>
                </div>
              </TabsContent>
              <TabsContent value="mom" className="space-y-4 pt-4">
                <p className="text-xs text-muted-foreground">Meeting request data is read-only here after the meeting.</p>
                <div>
                  <label className="text-sm font-medium text-foreground">Minutes of Meeting (MOM)</label>
                  <div className="mt-1 border border-dashed border-input rounded-lg p-4 text-center text-sm text-muted-foreground">
                    Upload area — drag & drop or click to upload MOM document
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Initial Observations</label>
                  <textarea rows={4} maxLength={2000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Initial observations from the meeting..." />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setKickOffRow(null)}>Cancel</Button>
                  <Button>Save</Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Business Understanding Dialog */}
      <Dialog open={!!businessUnderstandingRow} onOpenChange={() => setBusinessUnderstandingRow(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Business Understanding {businessUnderstandingRow && `— ${businessUnderstandingRow.department} ${businessUnderstandingRow.function}`}</DialogTitle>
          </DialogHeader>
          {businessUnderstandingRow && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Prepared by</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                    {mockAuditors.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 mt-2 text-sm">
                    <input type="checkbox" /> Prepared Done
                  </label>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Reviewed by</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                    {mockAuditors.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 mt-2 text-sm">
                    <input type="checkbox" /> Reviewed Done
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Approved by</label>
                <select className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  {mockAuditors.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <label className="flex items-center gap-2 mt-2 text-sm">
                  <input type="checkbox" /> Approved Done
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Audit Business Summary (required)</label>
                <div className="mt-1 border border-dashed border-input rounded-lg p-4 text-center text-sm text-muted-foreground">
                  Upload business summary document
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Attachments</label>
                <div className="mt-1 border border-dashed border-input rounded-lg p-3 text-center text-sm text-muted-foreground">
                  Upload attachments
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Initial Observations</label>
                <textarea rows={4} maxLength={5000} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Document initial observations..." />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setBusinessUnderstandingRow(null)}>Cancel</Button>
                <Button>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
