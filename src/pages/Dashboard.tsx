import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Users, FileCheck, CalendarRange, Filter } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const departments = ["Finance", "IT", "HR", "Operations", "Sales"];
const quickAccessItems = [
  { label: "Annual Plan", icon: CalendarRange, path: "/annual-plan", color: "bg-primary" },
  { label: "MLP", icon: BarChart3, path: "/mlp", color: "bg-accent" },
  { label: "Committee Resolutions", icon: Users, path: "/committee", color: "bg-info" },
  { label: "LoR Tracker", icon: FileCheck, path: "/lor-tracker", color: "bg-warning" },
];

const pendingTasks = [
  { id: 1, auditJob: "Finance - Accounts Payable", task: "Check LoR tracker for review", time: "10:23 AM", date: "12/12/2025", path: "/lor-tracker" },
  { id: 2, auditJob: "IT - Cybersecurity", task: "Check LoR tracker for review", time: "8:13 AM", date: "10/12/2025", path: "/lor-tracker" },
  { id: 3, auditJob: "HR - Recruitment", task: "Check observation dashboard for coaching notes", time: "2:56 PM", date: "9/12/2025", path: "/observations" },
  { id: 4, auditJob: "Operations - Logistics", task: "Approve business understanding", time: "12:23 PM", date: "1/12/2025", path: "/annual-plan" },
  { id: 5, auditJob: "Finance - Accounts Payable", task: "Check follow-up evidence no.4", time: "4:34 PM", date: "29/11/2025", path: "/reports" },
];

const lorPastDueData = [{ name: "On Time", value: 78, color: "hsl(var(--success))" }, { name: "Delayed", value: 22, color: "hsl(var(--destructive))" }];
const resourcesData = [{ name: "In-House", value: 65, color: "hsl(var(--primary))" }, { name: "Co-sourced", value: 35, color: "hsl(var(--accent))" }];
const auditJobsStatusData = [
  { name: "Completed", value: 28, color: "hsl(var(--success))" },
  { name: "In Progress", value: 12, color: "hsl(var(--info))" },
  { name: "Delayed", value: 3, color: "hsl(var(--destructive))" },
  { name: "Pending Approval", value: 5, color: "hsl(var(--warning))" },
];
const lorSubmissionByDept = [
  { department: "Finance", received: 45, pending: 12, partiallyReceived: 8, rejected: 2 },
  { department: "IT", received: 38, pending: 15, partiallyReceived: 5, rejected: 1 },
  { department: "HR", received: 52, pending: 6, partiallyReceived: 4, rejected: 0 },
];
const observationRatesData = [
  { department: "Finance", critical: 1, high: 4, medium: 8, low: 6, scopeLimiting: 0 },
  { department: "IT", critical: 2, high: 3, medium: 10, low: 5, scopeLimiting: 0 },
  { department: "HR", critical: 0, high: 2, medium: 6, low: 4, scopeLimiting: 0 },
];
const followUpStatusData = [
  { department: "Finance", completed: 12, incomplete: 2, inProgress: 5, notDue: 8 },
  { department: "IT", completed: 8, incomplete: 3, inProgress: 4, notDue: 6 },
  { department: "HR", completed: 10, incomplete: 1, inProgress: 3, notDue: 4 },
];
const auditorWorkloadData = [
  { auditor: "Talal Hosni", tasks: 18 },
  { auditor: "Manal Rebhi", tasks: 14 },
  { auditor: "Ahmad Jalal", tasks: 12 },
  { auditor: "Wajdi Talal", tasks: 9 },
];
const tasksPerAuditor = [
  { auditor: "Talal Hosni", assigned: 18, completed: 15, late: 2 },
  { auditor: "Manal Rebhi", assigned: 14, completed: 12, late: 1 },
  { auditor: "Ahmad Jalal", assigned: 12, completed: 11, late: 0 },
  { auditor: "Wajdi Talal", assigned: 9, completed: 8, late: 1 },
];

const chartConfig = {
  received: { label: "Received", color: "hsl(var(--success))" },
  pending: { label: "Pending", color: "hsl(var(--warning))" },
  partiallyReceived: { label: "Partially Received", color: "hsl(var(--info))" },
  rejected: { label: "Rejected", color: "hsl(var(--destructive))" },
  critical: { label: "Critical", color: "hsl(var(--destructive))" },
  high: { label: "High", color: "hsl(var(--warning))" },
  medium: { label: "Medium", color: "hsl(var(--info))" },
  low: { label: "Low", color: "hsl(var(--muted-foreground))" },
  completed: { label: "Completed", color: "hsl(var(--success))" },
  incomplete: { label: "Incomplete", color: "hsl(var(--destructive))" },
  inProgress: { label: "In Progress", color: "hsl(var(--info))" },
  notDue: { label: "Not Due", color: "hsl(var(--muted-foreground))" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [deptFilter, setDeptFilter] = useState<string[]>(["Finance", "IT", "HR"]);
  const [lorStatusFilter, setLorStatusFilter] = useState<string>("received");
  const [observationFilter, setObservationFilter] = useState<string>("critical");
  const [followUpFilter, setFollowUpFilter] = useState<string>("completed");

  const keyMetrics = [
    { label: "Total Audit Jobs", value: "48" },
    { label: "Total MLPs", value: "23" },
    { label: "Total Resolutions", value: "34" },
    { label: "LOR Completion", value: "156/198" },
  ];

  const teamKpis = [
    { label: "Total Tasks (Assigned | Month)", value: "53", trend: "+12% vs last month" },
    { label: "Average Utilization Score", value: "78%", trend: "Target 80%" },
    { label: "% Tasks Completed on Time", value: "87%", trend: "+5% vs last month" },
    { label: "Most Utilized Auditor", value: "Talal Hosni" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Central hub for audit activities and key metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Department filter</span>
          <select
            className="px-3 py-2 rounded-lg border border-input bg-card text-sm min-w-[160px]"
            value={deptFilter[0]}
            onChange={(e) => setDeptFilter([e.target.value])}
          >
            <option value="All">All departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <Button size="sm" className="gap-1">
            <Filter className="w-4 h-4" /> Apply
          </Button>
        </div>
      </div>

      {/* Key Audit Metrics */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Key Audit Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyMetrics.map((m) => (
            <div key={m.label} className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm font-medium text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">LOR Past Due</h3>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <PieChart>
              <Pie data={lorPastDueData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2}>
                {lorPastDueData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <p className="text-xs text-muted-foreground text-center mt-1">Total requirements: 198</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <PieChart>
              <Pie data={resourcesData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2}>
                {resourcesData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Audit Jobs Status</h3>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <PieChart>
              <Pie data={auditJobsStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2}>
                {auditJobsStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>

      {/* LOR Submission & Observation & Follow-up */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">LOR Submission Status by Department</h3>
          <select className="mb-2 text-xs border border-input rounded px-2 py-1" value={lorStatusFilter} onChange={(e) => setLorStatusFilter(e.target.value)}>
            <option value="received">Received</option>
            <option value="pending">Pending</option>
            <option value="partiallyReceived">Partially Received</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={lorSubmissionByDept} margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={lorStatusFilter} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Observation Rates by Department</h3>
          <select className="mb-2 text-xs border border-input rounded px-2 py-1" value={observationFilter} onChange={(e) => setObservationFilter(e.target.value)}>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={observationRatesData} margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={observationFilter} fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Follow-Up Status by Department</h3>
          <select className="mb-2 text-xs border border-input rounded px-2 py-1" value={followUpFilter} onChange={(e) => setFollowUpFilter(e.target.value)}>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="inProgress">In Progress</option>
            <option value="notDue">Not Due</option>
          </select>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={followUpStatusData} margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={followUpFilter} fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Team Performance Analytics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {teamKpis.map((kpi) => (
            <div key={kpi.label} className="border border-border rounded-lg p-4">
              <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
              <p className="text-xl font-bold text-foreground mt-1">{kpi.value}</p>
              {kpi.trend && <p className="text-xs text-muted-foreground mt-0.5">{kpi.trend}</p>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Auditor Workload Distribution</h3>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={auditorWorkloadData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="auditor" tick={{ fontSize: 10 }} width={75} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Tasks" />
              </BarChart>
            </ChartContainer>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Tasks Per Auditor</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">Auditor</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Assigned</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Completed</th>
                    <th className="text-right py-2 font-medium text-destructive">Late</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksPerAuditor.map((row) => (
                    <tr key={row.auditor} className="border-b border-border/50">
                      <td className="py-2 text-foreground">{row.auditor}</td>
                      <td className="py-2 text-right text-muted-foreground">{row.assigned}</td>
                      <td className="py-2 text-right text-muted-foreground">{row.completed}</td>
                      <td className="py-2 text-right text-destructive font-medium">{row.late}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickAccessItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Pending Tasks - click navigates to corresponding page */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Pending Tasks</h2>
          <span className="text-xs text-muted-foreground">Click a task to open the corresponding page</span>
        </div>
        <div className="divide-y divide-border">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(task.path)}
              onKeyDown={(e) => e.key === "Enter" && navigate(task.path)}
              className="px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground w-6">#{task.id}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{task.task}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.auditJob}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{task.date}</p>
                <p className="text-xs text-muted-foreground">{task.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
