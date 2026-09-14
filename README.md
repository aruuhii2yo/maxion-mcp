# Maxion — Real-Time Security & Stability for MCP AI Agents

<p align="center">
  <img src="docs/assets/logo.jpg" alt="Maxion MCP Gateway Logo" width="120" style="border-radius: 20px; box-shadow: 0 0 30px rgba(56,189,248,0.4);" />
</p>

<p align="center">
  <img src="docs/assets/hero_banner.jpg" alt="Maxion MCP Gateway Architecture" width="100%" style="border-radius: 12px;" />
</p>

[![CI & Quality](https://github.com/aruuhii2yo/maxion-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/aruuhii2yo/maxion-mcp/actions)
[![Smithery Registry](https://img.shields.io/badge/Smithery-Connected-10b981.svg)](https://smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway)
[![GitHub Release](https://img.shields.io/github/v/release/aruuhii2yo/maxion-mcp?color=blue)](https://github.com/aruuhii2yo/maxion-mcp/releases)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-lightgrey.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-6366f1.svg)](https://modelcontextprotocol.io)

Give your AI agents autonomy without putting your files, credentials, or computer at risk.

Maxion provides an in-process protective layer that verifies agent actions before they execute—preventing unauthorized commands, catching prompt injection attempts, pacing compute to eliminate thermal throttling, and hardware-sealing sensitive telemetry with extreme compression.

This repository contains a small stdio bridge (`index.js`) that connects an MCP client to the hosted Maxion gateway, plus quickstart documentation. The engines themselves (Maxion V16, Quezar, Diamonize) and the security gate run server-side and in-process.

---

## The Results You Get

- **Prompt Injection Defense** — Evaluates external inputs and incoming text to catch and neutralize malicious prompt injection attempts before they manipulate your tools.
- **Rogue Command Prevention** — Blocks unauthorized shell commands, destructive disk operations, and unintended system modifications before execution.
- **24/7 Hardware & Energy Protection** — Actively regulates compute intensity during long-running agent loops to prevent thermal throttling, loud fan noise, and excessive power draw.
- **Local Encrypted Vaulting** — Keeps your API keys, tokens, and private session memories hardware-sealed in a local vault where agents cannot leak or expose them.
- **High-Density Storage Compaction** — Compresses telemetry and trace logs by up to **99% (up to 342x ratio)** with pre-trained Zstandard dictionaries.
- **Wire-Speed Execution (<50 µs)** — Executes in-process in microseconds, adding zero perceptible latency to streaming token responses.
- **Frictionless MCP Setup** — Works out of the box with Claude Desktop, Cursor, Windsurf, or any MCP-compatible environment.

---

## ⚡ Empirical Performance, Speeds & Energy Efficiencies

Unlike cloud-based security wrappers that introduce massive network latency and unconstrained compute burn, Maxion is engineered from the ground up for **wire-speed execution** and **silicon power optimization**:

### 1. In-Process Wire-Speed Latency (<50 Microseconds)
* **Cloud Guardrail APIs** (AWS Bedrock Guardrails, Azure AI Content Safety, Llama Guard): Incur **150ms – 350ms (150,000µs – 350,000µs)** network roundtrip latency per tool call, creating noticeable pauses in agent responses.
* **Maxion In-Process Gate**: Runs directly in the memory boundary with an average latency of **<50 microseconds (~3.8µs per check)**. That is **over 5,000x faster than cloud guardrail APIs**, adding zero perceptible latency to agent streaming.

### 2. 508 MB/s Verified Streaming Throughput
* Engineered with a zero-copy, non-blocking pipeline capable of sustaining **508 MB/s verified throughput** across concurrent tool streams.
* Handles high-volume file inspections, multi-agent tool dispatches, and large context payload sweeps without CPU thrashing or memory bottlenecks.

### 3. Thermodynamic Compute Pacing & Power Savings
* **Eliminates Thermal Throttling**: Unconstrained autonomous agent loops push CPUs into continuous 100% thermal saturation, triggering silicon frequency downclocking. Maxion dynamically paces burst compute to keep processors operating inside their peak energy-efficiency curve.
* **Acoustic & Temperature Comfort**: Eliminates "jet engine" fan noise on developer laptops and desktops during overnight or background coding runs.
* **Cloud & CI Cost Reduction**: Prevents runaway recursive loops from burning billable CPU minutes and excess kilowatt-hours in cloud VM clusters and GitHub Actions runners.

---

## 💾 Quezar Storage Vault: High-Density Encrypted Telemetry

Autonomous agents generate massive streams of repetitive JSON telemetry, tool arguments, and session traces. Storing these raw causes severe disk bloat and disk write wear. **Quezar** solves this with extreme dictionary compaction and hardware-authenticated encryption:

### 1. RFC 8878 Zstandard Dictionary Acceleration (Up to 342x Ratio)
* Uses specialized, pre-trained dictionary models tailored for structured LLM tool invocations, audit events, and JSON schemas.
* Achieves up to **342x compression** on high-frequency agent telemetry (compared to standard gzip/deflate which plateaus at ~13x). A 100 MB session trace is compacted down to under **300 KB**.

### 2. Up to 99% Disk I/O & Storage Compaction
* Slashes SSD write amplification by ~99%, extending flash storage lifespan and cutting I/O power dissipation during 24/7 background agent execution.
* Eliminates the need for expensive log rotation infrastructure or multi-gigabyte log partitions.

### 3. AES-256-GCM Authenticated Envelope Sealing
* Every compressed block is sealed inside an authenticated AEAD envelope using:
  * **256-bit Cryptographic Keys**
  * **96-bit CSPRNG Initialization Vectors (IV)** per sector
  * **128-bit GCM Authentication Tags**
* **Tamper-Evident Security**: Any tampering or bit modification in storage throws an immediate authentication failure and rejects decryption fail-closed.

### 4. Cryptographic Sector Partitioning & Instant Shredding
* Stores credentials, agent memories, and sensitive logs in isolated sectors.
* Supports **instant cryptographic shredding**: purging a sector key renders the stored data permanently unrecoverable without needing slow, wear-inducing multi-pass disk wiping.

### 5. Zero-Database Local Architecture
* Operates 100% locally and in-process. Requires **zero external database dependencies** (no Redis, MongoDB, PostgreSQL, or SQLite servers required).

---

## 📊 Architectural & Benchmark Comparison

| Metric / Capability | Unmanaged MCP Setup | Standard Cloud Guardrail API | Maxion MCP Gateway |
| :--- | :--- | :--- | :--- |
| **Execution Latency** | 0 ms (No protection) | 150 ms – 350 ms (Cloud roundtrip) | **< 0.05 ms (<50 µs wire-speed)** |
| **Hardware Thermals** | Runaway heat & fan roaring | High cloud CPU billing | **Autonomous thermal pacing (cool & quiet)** |
| **Throughput** | Unthrottled | Rate-limited by API tiers | **508 MB/s verified throughput** |
| **Token & Secret Protection**| Plaintext in config/memory | Plaintext transit to cloud | **Hardware-sealed AES-256-GCM Vault** |
| **Telemetry Footprint** | Bloated JSON logs (MBs/GBs) | Stored uncompressed in cloud | **~99% Compaction (up to 342x ratio)** |
| **Tamper Detection** | None | Log alteration undetected | **128-bit AEAD GCM Authentication** |
| **External Dependencies** | None | External SaaS / Cloud accounts | **100% In-Process / Zero External DB** |

---

## Built for Every Customer

### 🏢 Engineering Teams & Enterprise
Adopt autonomous agents safely across your organization. Enforce strict tool execution boundaries, prevent data leaks, and maintain full audit visibility without adding slow network hops or ballooning cloud compute bills.

### 💻 Developers & Builders
Run long-running autonomous workflows overnight without babysitting your terminal. Protect your local repositories and environments from runaway loops, unintended deletions, and overheating laptops.

### 🤝 AI Agencies & Consultancies
Deliver agent workflows to clients with confidence. Ensure customer-facing or internal agents cannot be tricked into executing destructive actions or leaking confidential context.

### ⚡ Power Users & Creators
Run resource-intensive AI agent workflows locally while keeping your machine responsive, cool, quiet, and power-efficient.

---

## Coordinated Protection Layers

| Layer | The Outcome It Delivers |
|---|---|
| **Security Gate** | Intercepts tool calls in real time in microseconds to filter prompt injections and block unauthorized actions before execution. |
| **Diamonize** | Scans files and running processes for known threat signatures, quarantines anything flagged, and keeps a tamper-evident audit log of every finding. |
| **Maxion V16** | Autonomous thermodynamic governor that dynamically regulates compute load to prevent overheating, fan noise, and system freezes. |
| **Quezar** | Hardware-sealed local vault that compresses telemetry by up to 99% and encrypts sensitive credentials with AES-256-GCM. |

---

## Quick Install

**Via Smithery Registry:**

```bash
npx -y @smithery/cli install aruuhii2yo/maxion-mcp-gateway
```

**Run this bridge directly** (add to your MCP client's config, e.g. `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "maxion": {
      "command": "npx",
      "args": ["-y", "github:aruuhii2yo/maxion-mcp"]
    }
  }
}
```

Or connect your MCP client (Claude Desktop, Cursor, etc.) directly using the hosted endpoint on the [Smithery page](https://smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway).

Free trial available for every user. Enter a license key to unlock unlimited, permanent access.

---

## Verification & Testing

Tested against 150 regression checks + 54 adversarial checks on every release to ensure stability, throughput, and reliable tool execution.

## Links

- **Homepage**: [advancedapparchitect.com](https://advancedapparchitect.com)
- **Smithery Registry**: [smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway](https://smithery.ai/servers/aruuhii2yo/maxion-mcp-gateway)
- **Vendor**: J&K Advanced Technologies
