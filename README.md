# Maxion — Real-Time Security & Stability for MCP AI Agents

[![CI & Quality](https://github.com/aruuhii2yo/maxion-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/aruuhii2yo/maxion-mcp/actions)
[![Smithery Registry](https://img.shields.io/badge/Smithery-Connected-10b981.svg)](https://smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway)
[![GitHub Release](https://img.shields.io/github/v/release/aruuhii2yo/maxion-mcp?color=blue)](https://github.com/aruuhii2yo/maxion-mcp/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-6366f1.svg)](https://modelcontextprotocol.io)


Give your AI agents autonomy without putting your files, credentials, or computer at risk.

Maxion provides an in-process protective layer that verifies agent actions before they execute—preventing unauthorized commands, catching prompt injection attempts, and keeping your machine cool during long autonomous runs.

This repository provides public documentation and quickstart instructions for connecting to the Maxion gateway.

---

## The Results You Get

- **Prompt Injection Defense** — Evaluates external inputs and incoming text to catch and neutralize malicious prompt injection attempts before they manipulate your tools.
- **Rogue Command Prevention** — Blocks unauthorized shell commands, destructive disk operations, and unintended system modifications before execution.
- **24/7 Hardware Protection** — Actively manages compute intensity during long-running agent loops to prevent thermal throttling, loud fan noise, and system lockups.
- **Local Credential Vaulting** — Keeps your API keys, tokens, and private session memories isolated in a protected local vault where agents cannot leak or expose them.
- **Zero Perceptible Lag** — Executes in the background in microseconds, adding no noticeable delay to your agent's response time.
- **Frictionless MCP Setup** — Works out of the box with Claude Desktop, Cursor, Windsurf, or any MCP-compatible environment.

---

## Built for Every Customer

### 🏢 Engineering Teams & Enterprise
Adopt autonomous agents safely across your organization. Enforce strict tool execution boundaries, prevent data leaks, and maintain full audit visibility without adding slow network hops.

### 💻 Developers & Builders
Run long-running autonomous workflows overnight without babysitting your terminal. Protect your local repositories and environments from runaway loops or unintended deletions.

### 🤝 AI Agencies & Consultancies
Deliver agent workflows to clients with confidence. Ensure customer-facing or internal agents cannot be tricked into executing destructive actions or leaking confidential context.

### ⚡ Power Users & Creators
Run resource-intensive AI agent workflows locally while keeping your machine responsive, cool, and quiet.

---

## Coordinated Protection Layers

| Layer | The Outcome It Delivers |
|---|---|
| **Security Gate** | Intercepts tool calls in real time to filter prompt injections and block unauthorized actions before execution. |
| **Diamonize** | Scans files and running processes for known threat signatures, quarantines anything flagged, and keeps a tamper-evident audit log of every finding. |
| **Maxion V16** | Autonomous hardware governor that dynamically regulates compute load to prevent overheating and system freezes. |
| **Quezar** | Encrypted local vault that isolates sensitive credentials, tokens, and agent state. |

---

## Quick Install

Connect through the Smithery Registry:

```bash
npx -y @smithery/cli install aruuhii2yo/maxion-mcp-gateway
```

Or connect your MCP client (Claude Desktop, Cursor, etc.) directly using the hosted endpoint on the [Smithery page](https://smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway).

Free trial available for every user. Enter a license key to unlock unlimited, permanent access.

---

## Verification & Testing

Tested against 200+ regression checks and adversarial safety simulations on every release to ensure stability and reliable tool execution.

## Links

- **Homepage**: [advancedapparchitect.com](https://advancedapparchitect.com)
- **Smithery Registry**: [smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway](https://smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway)
- **Vendor**: J&K Advanced Technologies
