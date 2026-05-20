"use client"

import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Key, 
  Wifi,
  Globe,
  Lock,
  TrendingUp,
  Activity,
  Eye
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data
const securityScore = 85
const threatStats = {
  blocked: 147,
  detected: 23,
  resolved: 120
}

const recentAlerts = [
  { id: 1, type: "warning", title: "Suspicious Login Attempt", time: "2 min ago", location: "Unknown IP (Russia)" },
  { id: 2, type: "info", title: "Password Updated", time: "1 hour ago", location: "Your device" },
  { id: 3, type: "danger", title: "Malware Blocked", time: "3 hours ago", location: "Downloaded file" },
  { id: 4, type: "success", title: "Security Scan Complete", time: "5 hours ago", location: "All systems" },
]

const securityChecks = [
  { label: "Password Strength", status: "good", value: 92 },
  { label: "Two-Factor Auth", status: "enabled", value: 100 },
  { label: "Network Security", status: "good", value: 88 },
  { label: "Device Protection", status: "warning", value: 65 },
]

function getAlertIcon(type: string) {
  switch (type) {
    case "danger":
      return <AlertTriangle className="h-4 w-4 text-destructive" />
    case "warning":
      return <Eye className="h-4 w-4 text-cyber-warning" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-cyber-success" />
    default:
      return <Activity className="h-4 w-4 text-primary" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "good":
    case "enabled":
      return "text-cyber-success"
    case "warning":
      return "text-cyber-warning"
    case "danger":
      return "text-destructive"
    default:
      return "text-muted-foreground"
  }
}

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Security Dashboard</h1>
        <p className="text-muted-foreground">Monitor your cybersecurity status in real-time</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Security Score */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Security Score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">{securityScore}</span>
              <span className="text-muted-foreground mb-1">/100</span>
            </div>
            <Progress value={securityScore} className="mt-3 h-2" />
          </CardContent>
        </Card>

        {/* Threats Blocked */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyber-success" />
              Threats Blocked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-cyber-success">{threatStats.blocked}</span>
              <span className="text-cyber-success text-sm mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        {/* Threats Detected */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-cyber-warning" />
              Active Threats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-cyber-warning">{threatStats.detected}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Require attention</p>
          </CardContent>
        </Card>

        {/* Issues Resolved */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Issues Resolved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-foreground">{threatStats.resolved}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
                <CardDescription>Latest security events and notifications</CardDescription>
              </div>
              <Link href="/dashboard/alerts">
                <Button variant="outline" size="sm" className="border-border hover:bg-secondary">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-start gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Security Status</CardTitle>
            <CardDescription>System protection overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityChecks.map((check, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{check.label}</span>
                    <span className={`text-sm font-medium capitalize ${getStatusColor(check.status)}`}>
                      {check.status}
                    </span>
                  </div>
                  <Progress 
                    value={check.value} 
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2 border-border hover:bg-secondary hover:border-primary/50"
          >
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-sm">Run Scan</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2 border-border hover:bg-secondary hover:border-primary/50"
          >
            <Key className="h-6 w-6 text-primary" />
            <span className="text-sm">Password Check</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2 border-border hover:bg-secondary hover:border-primary/50"
          >
            <Wifi className="h-6 w-6 text-primary" />
            <span className="text-sm">Network Scan</span>
          </Button>
          <Link href="/dashboard/assistant" className="w-full">
            <Button 
              variant="outline" 
              className="h-auto py-4 w-full flex flex-col items-center gap-2 border-border hover:bg-secondary hover:border-primary/50"
            >
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-sm">Ask Assistant</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
