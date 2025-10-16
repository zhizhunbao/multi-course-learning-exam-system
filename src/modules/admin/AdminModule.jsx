import React, { useState } from "react";
import { Card, Button, Table, Alert } from "../../../common/modules/Elements";
import UserManagement from "./UserManagement";
import "./AdminModule.css";

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [error, setError] = useState("");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "courses", label: "Course Management", icon: "📚" },
    { id: "exams", label: "Exam Management", icon: "📝" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "System Settings", icon: "⚙️" },
  ];

  const renderDashboard = () => {
    const stats = [
      { label: "Total Users", value: "1,234", change: "+12%" },
      { label: "Active Courses", value: "45", change: "+3%" },
      { label: "Completed Exams", value: "2,567", change: "+8%" },
      { label: "System Uptime", value: "99.9%", change: "+0.1%" },
    ];

    return (
      <div className="admin-dashboard">
        <h2>System Dashboard</h2>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Card key={index} className="stat-card">
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <span
                  className={`stat-change ${
                    stat.change.startsWith("+") ? "positive" : "negative"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="dashboard-content">
          <Card title="Recent Activity" className="activity-card">
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-time">2 hours ago</span>
                <span className="activity-text">
                  New user registered: john.doe@example.com
                </span>
              </div>
              <div className="activity-item">
                <span className="activity-time">4 hours ago</span>
                <span className="activity-text">
                  Course "JavaScript Basics" was updated
                </span>
              </div>
              <div className="activity-item">
                <span className="activity-time">6 hours ago</span>
                <span className="activity-text">
                  Exam "Midterm Test" was completed by 15 students
                </span>
              </div>
            </div>
          </Card>

          <Card title="System Health" className="health-card">
            <div className="health-metrics">
              <div className="metric">
                <span className="metric-label">CPU Usage</span>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: "45%" }} />
                </div>
                <span className="metric-value">45%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Memory Usage</span>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: "67%" }} />
                </div>
                <span className="metric-value">67%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Disk Usage</span>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: "23%" }} />
                </div>
                <span className="metric-value">23%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return <UserManagement />;
      case "courses":
        return <div>Course Management - Coming Soon</div>;
      case "exams":
        return <div>Exam Management - Coming Soon</div>;
      case "reports":
        return <div>Reports - Coming Soon</div>;
      case "settings":
        return <div>System Settings - Coming Soon</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-module">
      {error && <Alert type="error" message={error} dismissible />}

      <div className="admin-header">
        <h1>System Administration</h1>
        <div className="admin-actions">
          <Button variant="primary">Export Data</Button>
          <Button variant="secondary">Backup System</Button>
        </div>
      </div>

      <div className="admin-layout">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="admin-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminModule;
