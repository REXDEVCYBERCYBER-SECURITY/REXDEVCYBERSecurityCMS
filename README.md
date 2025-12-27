# REXDEVCYBERSecurityCMS
![REXDEVCYBER Logo](https://i.postimg.cc/S2fJ0yjj/LOGO-REXDEV-512-X512.png)

A sophisticated cybersecurity-themed CMS and community hub with AI-powered vulnerability scanning, writing assistance, and collaboration tools.

A high-performance cybersecurity information hub and network database portal built for real-time vulnerability investigation and secure connection management.


# 🛡️ REXDEVCYBER Security CMS

A sophisticated, AI-augmented cybersecurity content management system and vulnerability research platform. Designed for high-clearance security teams to audit source code, draft intelligence reports, and monitor system-wide threat vectors.

## 🚀 Core Features

### 🔍 Vulnerability Matrix (Security Hub)
The crown jewel of the platform. Using the **Gemini 3 Pro** engine, the Security Hub performs deep forensic analysis on source code to detect complex logic flaws.
- **Deep Tier Auditing**: Beyond simple linting, it maps vulnerabilities to CWE IDs.
- **Attack Scenario Simulation**: Generates step-by-step hypothetical breach scenarios.
- **Automated Patch Generation**: Provides production-ready, secure refactors for detected flaws.
- **Visual Severity Indicators**: High-contrast HUD for critical, high, medium, and low risk vectors.

### ✍️ Drafting Room (Smart CMS)
A distraction-free terminal-inspired editor for technical writers and researchers.
- **AI Polish**: Enhances technical precision and professional tone using LLM-driven grammar correction.
- **Eye-Care Mode**: Toggle between high-contrast and low-light themes for long research sessions.
- **Auto-Sync**: Secure local buffer syncing with encrypted node status.

### 📊 Intelligence Dashboard
Real-time visualization of network health and blocked intrusion attempts.
- **Threat History**: Area charts tracking blocked vectors over time.
- **Resource Metrics**: Monitoring system node usage and active surveillance points.
- **Health Score**: A dynamic heuristic score based on the current audit findings buffer.

### 📋 Ops Board (Workflow)
Kanban-style task management tailored for security sprints.
- **Research Lifecycle**: Track tasks from Backlog through Security Audit to Resolution.
- **Clearance Gating**: Editing restricted to Admin and Editor roles.

## 🔐 Clearance Levels (RBAC)

The system implements strict **Role-Based Access Control**:
- **ADMIN**: Unrestricted access to Security Hub (Scanner), System Config, and all editing tools.
- **EDITOR**: Access to Drafting Room and Ops Board; restricted from Security Hub and System Settings.
- **VIEWER**: Read-only access to intelligence reports and the general dashboard.

## 🛠️ Tech Stack

- **Frontend**: React 19 (ESM)
- **Styling**: Tailwind CSS (Cyberpunk/Terminal Aesthetic)
- **Icons**: Lucide React
- **Visualization**: Recharts
- **Intelligence**: Google Gemini API (`@google/genai`)
  - `gemini-3-pro-preview` for complex auditing.
  - `gemini-3-flash-preview` for rapid text processing.

## ⚙️ Configuration

The application requires a valid Gemini API Key injected via the environment:
```env
API_KEY=your_google_ai_studio_key
```

## 📜 Operational Directive

All AI-generated patches provided by the **Vulnerability Matrix** must undergo manual peer validation and automated regression testing before merging into production environments. The AI serves as a Tier-1 analyst to accelerate human decision-making.

---
*REXDEXCYBER - Securing the Digital Frontier with Heuristic Intelligence.*
