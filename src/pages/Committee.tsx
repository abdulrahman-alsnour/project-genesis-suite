import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Calendar, FileText, ChevronDown, ChevronRight } from "lucide-react";

type Resolution = {
  id: number;
  no: number;
  resolution: string;
  status: string;
  expectedCompletionDate: string;
  responsibleDepartment: string;
};

type Meeting = {
  id: number;
  meetingNo: string;
  year: number;
  date: string;
  subject: string;
  attendees: number;
  resolutions: Resolution[];
  status: string;
};

const initialMeetings: Meeting[] = [
  {
    id: 1,
    meetingNo: "1",
    year: 2025,
    date: "Dec 15, 2025",
    subject: "Q4 2025 Audit Committee Meeting",
    attendees: 8,
    status: "Completed",
    resolutions: [
      { id: 1, no: 1, resolution: "Implement MFA for all critical systems", status: "In Progress", expectedCompletionDate: "Mar 30, 2026", responsibleDepartment: "IT Department" },
      { id: 2, no: 2, resolution: "Update disaster recovery plan", status: "In Progress", expectedCompletionDate: "Feb 28, 2026", responsibleDepartment: "IT Department" },
      { id: 3, no: 3, resolution: "Conduct quarterly access reviews", status: "Pending", expectedCompletionDate: "Jan 31, 2026", responsibleDepartment: "HR / IT" },
      { id: 4, no: 4, resolution: "Redesign AP approval workflow", status: "Incomplete", expectedCompletionDate: "Jan 15, 2026", responsibleDepartment: "Finance" },
      { id: 5, no: 5, resolution: "Standardize vendor onboarding", status: "Completed", expectedCompletionDate: "Dec 31, 2025", responsibleDepartment: "Operations" },
    ],
  },
  {
    id: 2,
    meetingNo: "2",
    year: 2026,
    date: "Jan 20, 2026",
    subject: "Annual Audit Plan Review 2026",
    attendees: 10,
    status: "Pending",
    resolutions: [],
  },
  {
    id: 3,
    meetingNo: "3",
    year: 2025,
    date: "Sep 22, 2025",
    subject: "Q3 2025 Audit Committee Meeting",
    attendees: 7,
    status: "Completed",
    resolutions: [
      { id: 6, no: 1, resolution: "Standardize vendor onboarding", status: "Completed", expectedCompletionDate: "Dec 31, 2025", responsibleDepartment: "Operations" },
    ],
  },
];

const departments = ["Finance", "IT", "HR", "Operations", "Sales", "IT Department", "HR / IT"];

export default function Committee() {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [expandedMeetingId, setExpandedMeetingId] = useState<number | null>(1);
  const [addMeetingOpen, setAddMeetingOpen] = useState(false);
  const [addResolutionMeetingId, setAddResolutionMeetingId] = useState<number | null>(null);
  const [newResolution, setNewResolution] = useState({ resolution: "", status: "In Progress", expectedCompletionDate: "", responsibleDepartment: "" });

  const handleAddMeeting = () => {
    const nextNo = Math.max(...meetings.map((m) => parseInt(m.meetingNo, 10)), 0) + 1;
    const year = new Date().getFullYear();
    setMeetings((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        meetingNo: String(nextNo),
        year,
        date: "",
        subject: "",
        attendees: 0,
        status: "Pending",
        resolutions: [],
      },
    ]);
    setAddMeetingOpen(false);
  };

  const handleAddResolution = (meetingId: number) => {
    const meeting = meetings.find((m) => m.id === meetingId);
    if (!meeting) return;
    const nextNo = (meeting.resolutions?.length ?? 0) + 1;
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === meetingId
          ? {
              ...m,
              resolutions: [
                ...(m.resolutions || []),
                {
                  id: Date.now(),
                  no: nextNo,
                  resolution: newResolution.resolution || "(No details)",
                  status: newResolution.status,
                  expectedCompletionDate: newResolution.expectedCompletionDate,
                  responsibleDepartment: newResolution.responsibleDepartment,
                },
              ],
            }
          : m
      )
    );
    setAddResolutionMeetingId(null);
    setNewResolution({ resolution: "", status: "In Progress", expectedCompletionDate: "", responsibleDepartment: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Committee Resolution Tracker</h1>
          <p className="text-sm text-muted-foreground mt-1">Committee meetings and resolution tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" title="Add Meeting" onClick={() => setAddMeetingOpen(true)}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button className="gap-2" onClick={() => setAddMeetingOpen(true)}>
            <Calendar className="w-4 h-4" /> Add Meeting
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Meetings</h2>
        </div>
        <div className="divide-y divide-border">
          {meetings.map((meeting) => (
            <div key={meeting.id}>
              <div
                className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => setExpandedMeetingId(expandedMeetingId === meeting.id ? null : meeting.id)}
              >
                <span className="p-0.5">
                  {expandedMeetingId === meeting.id ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </span>
                <span className="text-sm font-mono text-muted-foreground w-16">{meeting.meetingNo}/{meeting.year}</span>
                <span className="text-sm text-muted-foreground flex-1">{meeting.date}</span>
                <span className="text-sm font-medium text-foreground flex-1">{meeting.subject || "—"}</span>
                <span className="text-sm text-muted-foreground w-24 text-right"># Resolutions: {meeting.resolutions?.length ?? 0}</span>
                <StatusBadge status={meeting.status} />
              </div>
              {expandedMeetingId === meeting.id && (
                <div className="border-t border-border bg-muted/20 px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Resolutions</h3>
                    <Button size="sm" className="gap-1" onClick={() => setAddResolutionMeetingId(meeting.id)}>
                      <Plus className="w-3 h-3" /> Add Resolution
                    </Button>
                  </div>
                  {meeting.resolutions?.length ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-medium text-muted-foreground w-12">No.</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Resolution Details</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Responsible Department</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Expected Completion Date</th>
                          <th className="text-left py-2 font-medium text-muted-foreground w-32">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {meeting.resolutions.map((r) => (
                          <tr key={r.id} className="border-b border-border/50">
                            <td className="py-2 font-mono text-muted-foreground">{r.no}</td>
                            <td className="py-2 text-foreground">{r.resolution}</td>
                            <td className="py-2 text-muted-foreground text-xs">{r.responsibleDepartment}</td>
                            <td className="py-2 text-muted-foreground text-xs">{r.expectedCompletionDate}</td>
                            <td className="py-2"><StatusBadge status={r.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-muted-foreground">No resolutions yet. Click Add Resolution to add one.</p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="text-xs gap-1"><FileText className="w-3 h-3" /> MoM</Button>
                    <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Meeting Dialog */}
      <Dialog open={addMeetingOpen} onOpenChange={setAddMeetingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Date</label>
              <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Subject</label>
              <input type="text" placeholder="Meeting subject..." className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
            </div>
            <Button className="w-full" onClick={handleAddMeeting}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Resolution Dialog */}
      <Dialog open={!!addResolutionMeetingId} onOpenChange={() => setAddResolutionMeetingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Resolution</DialogTitle>
          </DialogHeader>
          {addResolutionMeetingId && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-foreground">Resolution Details (required)</label>
                <textarea rows={4} value={newResolution.resolution} onChange={(e) => setNewResolution((r) => ({ ...r, resolution: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Details of the resolution..." />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Status (required)</label>
                <select value={newResolution.status} onChange={(e) => setNewResolution((r) => ({ ...r, status: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  <option value="Completed">Completed</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Expected Completion Date (required)</label>
                <input type="date" value={newResolution.expectedCompletionDate} onChange={(e) => setNewResolution((r) => ({ ...r, expectedCompletionDate: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Responsible Department (required)</label>
                <select value={newResolution.responsibleDepartment} onChange={(e) => setNewResolution((r) => ({ ...r, responsibleDepartment: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAddResolutionMeetingId(null)}>Cancel</Button>
                <Button onClick={() => handleAddResolution(addResolutionMeetingId)}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
