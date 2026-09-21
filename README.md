# Maxion V16 — Efficiency engine with thermal spike prevention during high throughput. Higher throughput, lower temps.
# Quezar Storage — Space-saving offline compression with microsecond processing speeds.
# Diamonize LSA — Digital security with microsecond in-process threat detection.

<p align="center">
  <img src="docs/assets/logo.jpg" alt="Maxion MCP Gateway" width="120" style="border-radius: 20px; box-shadow: 0 0 30px rgba(56,189,248,0.4);" />
</p>

<p align="center">
  <img src="docs/assets/hero_banner.jpg" alt="Maxion MCP Gateway Architecture" width="100%" style="border-radius: 12px;" />
</p>

[![CI & Quality](https://github.com/aruuhii2yo/maxion-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/aruuhii2yo/maxion-mcp/actions)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Maxion%20Action-blueviolet?logo=github)](https://github.com/marketplace/actions/maxion-ai-security-energy-governor)
[![Smithery](https://img.shields.io/badge/Smithery-Listed-10b981.svg)](https://smithery.ai/server/aruuhii2yo/maxion-mcp)
[![GitHub Release](https://img.shields.io/github/v/release/aruuhii2yo/maxion-mcp?color=blue)](https://github.com/aruuhii2yo/maxion-mcp/releases)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-lightgrey.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-6366f1.svg)](https://modelcontextprotocol.io)

> **Every unconstrained AI agent loop is a power bill waiting to happen.** Maxion fixes that — and protects your machine while it does.

Maxion is a zero-trust MCP gateway and GitHub Action that gives your AI agents autonomous compute pacing, real-time threat interception, and AES-256-GCM encrypted state vaulting — all running in-process at microsecond latency (12–23 µs measured per check).

---

## ⚡ The Energy Problem Nobody Talks About

When you leave an AI agent running overnight, it pushes your CPU to 100% thermal saturation. Your fan screams. Your laptop throttles. Your cloud bill spikes. Your SSD wears out faster from log bloat.

Maxion solves all of it:

- **Autonomous Thermal Governor** — dynamically paces compute to keep your processor in its peak energy-efficiency window. No more jet-engine fan noise. No more thermal throttling mid-task.
- **Storage Compaction** — Quezar compresses structured telemetry with Zstandard dictionaries. Measured 8–12.7× on structured data (JSON, SQL, logs), lower on already-compressed or high-entropy data. Reduces SSD write amplification and I/O power draw.
- **In-Process Execution (Microsecond Latency)** — runs entirely in-process. Zero network hops. Zero cloud API roundtrips. Zero energy wasted on guardrail latency.
- **Instant Cryptographic Shredding** — purge a vault sector instantly without slow, wear-inducing multi-pass disk wiping.

---

## The Results You Get

- **Prompt Injection Defense** — catches and neutralizes malicious prompt injection before it manipulates your tools
- **Rogue Command Prevention** — blocks unauthorized shell commands and destructive disk operations before execution
- **24/7 Hardware & Energy Protection** — autonomous thermal pacing prevents overheating, fan roar, and excessive power draw during long agent runs
- **Local Encrypted Vaulting** — API keys and session memories hardware-sealed where agents cannot leak them
- **Storage Compaction** — measured **8–12.7× on structured data** (1.3× on high-entropy data), up to ~92% size reduction
- **In-Process Execution** — microsecond detection with no perceptible latency added to streaming token responses
- **Frictionless MCP Setup** — works out of the box with Claude Desktop, Cursor, Windsurf, or any MCP-compatible client

---

## ⚡ Empirical Performance & Energy Efficiency

### In-Process Latency (Microsecond Detection, Measured)
* **Cloud Guardrail APIs** (AWS Bedrock, Azure AI Content Safety): **150ms – 350ms per tool call** — 150,000–350,000µs of wasted energy per request
* **Maxion In-Process Gate**: **12–23 µs per check** (measured, 10,000 iterations) — roughly **10,000× faster** than a 250 ms cloud roundtrip, with zero network overhead

### Thermodynamic Compute Pacing & Power Savings
* Eliminates thermal throttling caused by unconstrained 100% CPU saturation
* Eliminates jet-engine fan noise on developer laptops during overnight agent runs
* Reduces cloud CI/CD compute burn from runaway recursive agent loops
* Keeps processors in their peak energy-efficiency curve — faster *and* cooler

### Zero-Copy Non-Blocking Pipeline
* Asynchronous zero-copy architecture streams tool payloads at native memory speed
* Handles high-volume parallel multi-agent swarms without CPU thread starvation

---

## 💾 Quezar Storage Vault: Zstandard Compression + AES-256-GCM

### RFC 8878 Zstandard Dictionary Acceleration
* Pre-trained dictionaries tuned for LLM tool invocations, audit events, and JSON schemas
* Measured **8–12.7× on structured data** (JSON, SQL, Nginx logs); roughly comparable to gzip -9 on the same datasets, with encryption included
* Up to ~92% size reduction on structured data — extends SSD lifespan, cuts I/O power during long agent runs

### AES-256-GCM Authenticated Envelope Sealing
* 256-bit keys, 96-bit CSPRNG IVs per sector, 128-bit GCM authentication tags
* Tamper-evident: any bit modification triggers immediate authentication failure
* Instant cryptographic shredding — no slow multi-pass disk wiping required

### Zero External Dependencies
* 100% in-process. No Redis, MongoDB, PostgreSQL, or SQLite required.

---

## 📊 Benchmark Comparison

| Metric | Unmanaged MCP | Cloud Guardrail API | Maxion |
| :--- | :--- | :--- | :--- |
| **Execution Latency** | 0 ms (no protection) | 150–350 ms (cloud roundtrip) | **12–23 µs (measured)** |
| **Energy / Thermals** | Runaway heat & fan roar | High cloud CPU billing | **Autonomous energy pacing** |
| **Storage Footprint** | Bloated JSON (MBs/GBs) | Uncompressed in cloud | **8–12.7× on structured data** |
| **Secret Protection** | Plaintext in config/memory | Plaintext transit to cloud | **AES-256-GCM vault** |
| **External Dependencies** | None | External SaaS accounts | **100% in-process** |

---

## Built For

### 🏢 Engineering Teams & Enterprise
Enforce strict tool execution boundaries and prevent data leaks without slow network hops or ballooning cloud compute bills.

### 💻 Developers & Builders
Run long autonomous workflows overnight without babysitting your terminal or destroying your laptop's thermals.

### ⚡ Power Users & Creators
Run resource-intensive AI agent workloads locally while keeping your machine responsive, cool, quiet, and power-efficient.

---

## Coordinated Protection Layers

| Layer | What It Does |
|---|---|
| **Governor** | Dynamically paces compute load to prevent thermal throttling, fan roar, and energy waste |
| **Diamonize** | Scans files and processes for threat signatures; keeps a tamper-evident audit log |
| **Quezar** | Local encrypted vault — Zstandard compression + AES-256-GCM |
| **Security Gate** | Intercepts every tool call in ~12–23 µs to filter injections and block unauthorized actions |

---

## 💰 Pricing — Maxion V16

**No free trials.** Pure operational defense with predictable, honest economics:

- **Introductory Pass**: **$1 for the first 5 hours** of full agent compute protection and thermal pacing.
- **Standard Access**: **$5 flat**. Every $5 should be $5 — zero hidden fees, zero cloud token markups.
- **Risk-Free Guarantee**: Backed by our **30-Day 100% Money-Back Guarantee**.

---

## Quick Install

### 1. In GitHub Actions (GitHub Marketplace)

Add Maxion to any `.github/workflows/*.yml` pipeline to scan for prompt injections and pace compute:

```yaml
- name: Maxion AI Security & Energy Governor
  uses: aruuhii2yo/maxion-mcp@v1.0.0
  with:
    fail-on-threat: 'true'
    energy-pacing: 'true'
```

### 2. Via Smithery (Desktop MCP Clients)

```bash
npx -y @smithery/cli install aruuhii2yo/maxion-mcp-gateway
```

### 3. Direct MCP Config (Claude Desktop, Cursor, Windsurf, etc.)

```json
{
  "mcpServers": {
    "maxion": {
      "command": "npx",
      "args": ["-y", "github:aruuhii2yo/maxion-mcp"],
      "env": {
        "MAXION_GATEWAY_URL": "https://your-gateway-host.example.com/mcp"
      }
    }
  }
}
```

`MAXION_GATEWAY_URL` is required — it points the bridge at the gateway you
want to reach. There is no default endpoint, so set this to your own
deployment. If it is unset, the bridge tells you so rather than failing
with an opaque error.

---

## Links

- **Live Product Page**: [aruuhii2yo.github.io/maxion-mcp](https://aruuhii2yo.github.io/maxion-mcp/)
- **Smithery Listing**: [smithery.ai/server/aruuhii2yo/maxion-mcp-gateway](https://smithery.ai/server/aruuhii2yo/maxion-mcp-gateway)
- **GitHub Marketplace**: [github.com/marketplace/actions/maxion-ai-security-energy-governor](https://github.com/marketplace/actions/maxion-ai-security-energy-governor)
- **Vendor**: J&K Advanced Technologies
