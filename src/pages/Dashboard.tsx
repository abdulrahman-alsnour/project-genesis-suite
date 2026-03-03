import { ClipboardList, BarChart3, Users, FileCheck, AlertTriangle, CalendarRange, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";

const quickAccessItems = [
  { label: "Annual Plan", icon: CalendarRange, path: "/annual-plan", color: "bg-primary" },
  { label: "MLP Dashboard", icon: BarChart3, path: "/mlp", color: "bg-accent" },
  { label: "Resolutions", icon: Users, path: "/committee", color: "bg-info" },
  { label: "LoR Tracker", icon: FileCheck, path: "/lor-tracker", color: "bg-warning" },
];

const pendingTasks = [
  { id: 1, auditJob: "Finance - Accounts Payable", task: "Check LoR tracker for review", time: "10:23 AM", date: "12/12/2025" },
  { id: 2, auditJob: "IT - Cybersecurity", task: "Check LoR tracker for review", time: "8:13 AM", date: "10/12/2025" },
  { id: 3, auditJob: "HR - Recruitment", task: "Check observation dashboard for coaching notes", time: "2:56 PM", date: "9/12/2025" },
  { id: 4, auditJob: "Operations - Logistics", task: "Approve business understanding", time: "12:23 PM", date: "1/12/2025" },
  { id: 5, auditJob: "Finance - Accounts Payable", task: "Check follow-up evidence no.4", time: "4:34 PM", date: "29/11/2025" },
];

const stats = [
  { label: "Active Audits", value: "12", change: "+2 this month", icon: ClipboardList, trend: "up" },
  { label: "Pending Tasks", value: "23", change: "5 overdue", icon: Clock, trend: "warning" },
  { label: "Observations", value: "47", change: "8 open", icon: AlertTriangle, trend: "neutral" },
  { label: "Completion Rate", value: "73%", change: "+5% vs last quarter", icon: TrendingUp, trend: "up" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, Admin!</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's an overview of your audit activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-success" : stat.trend === "warning" ? "text-warning" : "text-muted-foreground"}`}>
              {stat.change}
            </p>
          </div>
        ))}
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

      {/* Pending Tasks */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Pending Tasks</h2>
          <span className="text-xs text-muted-foreground">Showing {pendingTasks.length} tasks</span>
        </div>
        <div className="divide-y divide-border">
          {pendingTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
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
