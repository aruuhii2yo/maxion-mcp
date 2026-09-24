# Maxion V16 — Efficiency engine designed to prevent thermal spikes during high throughput.
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

> **Every unconstrained AI agent loop is a power bill waiting to happen.** Maxion is built to rein that in — and to protect your machine while it does.

Maxion is a zero-trust MCP gateway that gives your AI agents compute pacing, real-time threat interception, and AES-256-GCM encrypted state vaulting — all running in-process at microsecond latency (**12–67 µs measured per check**, median ~26 µs). See [Verified Test Results](#-verified-test-results) for exactly what has and hasn't been measured.

---

## ⚡ The Energy Problem Nobody Talks About

When you leave an AI agent running overnight, it pushes your CPU to 100% thermal saturation. Your fan screams. Your laptop throttles. Your cloud bill spikes. Your SSD wears out faster from log bloat.

What Maxion does about it:

- **Autonomous Thermal Governor** — paces compute to keep your processor out of thermal throttling during long runs. *(Control logic is tested; the effect on real hardware has not been measured yet — see below.)*
- **Storage Compaction** — Quezar compresses structured telemetry with Zstandard dictionaries. Measured 8–12.7× on structured data (JSON, SQL, logs), lower on already-compressed or high-entropy data — so far less gets written to disk.
- **In-Process Execution (Microsecond Latency)** — runs entirely in-process. Zero network hops. Zero cloud API roundtrips.
- **Instant Cryptographic Shredding** — purge a vault sector instantly without slow, wear-inducing multi-pass disk wiping.

---

## The Results You Get

- **Prompt Injection Defense** — catches known prompt-injection patterns before they manipulate your tools (54/54 on our adversarial suite)
- **Rogue Command Prevention** — blocks unauthorized shell commands and destructive disk operations before execution
- **Hardware-Aware Pacing** — paces compute during long agent runs to reduce overheating and throttling
- **Local Encrypted Vaulting** — API keys and session memories encrypted with AES-256-GCM where agents cannot read them
- **Storage Compaction** — measured **8–12.7× on structured data** (1.3× on high-entropy data), up to ~92% size reduction
- **In-Process Execution** — microsecond detection with no perceptible latency added to streaming token responses
- **Frictionless MCP Setup** — works with Claude Desktop, Cursor, Windsurf, or any MCP-compatible client

---

## ⚡ Performance

### In-Process Latency (Measured)
* **Cloud Guardrail APIs** (AWS Bedrock, Azure AI Content Safety): **150ms – 350ms per tool call**
* **Maxion In-Process Gate**: **12–67 µs per check** (four runs of 10,000 checks, median ~26 µs) — roughly **3,700–20,000× faster** than a 250 ms cloud roundtrip, with zero network overhead

### Compute Pacing — What It Is Designed To Do
* Pace execution duty cycles so sustained agent load doesn't drive the CPU into thermal throttling
* Brake hard on thermal bursts and release with hysteresis, so it doesn't oscillate
* Cut the compute burned by runaway recursive agent loops

---

## ✅ Verified Test Results

Measured on an **Intel Core i5-7200U laptop (2 cores / 4 threads, 8 GB RAM, Windows 10 Home, Node.js 24)**, September 22–23, 2026. Internal test suite run by J&K Advanced Technologies — **not independently audited**. The host was under memory pressure, so numbers vary run to run; we report ranges, not best cases.

### Diamonize security gate — latency
| Runs | Checks per run | Average per check | Budget (50 µs) |
| :--- | :--- | :--- | :--- |
| 4 | 10,000 | **12.3, 23.2, 28.1, 67.1 µs** | 3 of 4 within; one run over budget under host load |

### Diamonize — adversarial red-team suite: **54 / 54 passed, 0 bypasses**
| Attack vector | Result |
| :--- | :--- |
| Prompt-injection & destructive payloads | 18 / 18 blocked |
| Unauthorized binary execution | 3 / 3 blocked |
| High-frequency dispatch bursts | 3 / 3 paced |
| Quarantine tampering | 4 / 4 neutralized |
| Vault ciphertext / auth-tag tampering | fails closed |
| Audit log hash chain (tamper + stripped-genesis detection) | verified |

This is a regression suite of *known* attack patterns. It shows those are stopped; it does not prove protection against novel attacks.

### Quezar — compression with AES-256-GCM (same data, three compressors)
| Dataset | Quezar | gzip -9 | Brotli -11 |
| :--- | :--- | :--- | :--- |
| JSON API payload (60.5 KB) | **12.7×** | 13.7× | 19.2× |
| SQL dump (25.7 KB) | **11.8×** | 10.2× | 13.9× |
| Nginx access logs (23.5 KB) | **10.8×** | 11.8× | 16.7× |
| JavaScript source (9.2 KB) | **8.3×** | 8.3× | 10.3× |
| Markdown (4.8 KB) | **3.9×** | 4.0× | 5.2× |
| High-entropy base64 (15.6 KB) | **1.33×** | 1.33× | 1.33× |

Quezar's ratios are comparable to gzip -9 and below Brotli -11 — the difference is that authenticated encryption comes included. Store → retrieve integrity: **6/6 byte-exact** on every run since Sept 23. (One earlier run showed 2 mismatches, traced to a response-routing bug in the engine IPC layer under timeout and fixed the same day.)

### Maxion V16 governor
| Test | Result |
| :--- | :--- |
| Control logic, simulated temperatures (brake at ≥82 °C from an 85 °C burst, hold at 79 °C, release at ≤77 °C) | 5 / 5 pass |
| Host compute throughput | ~159,000 primes/sec, ±65% run-to-run variance |
| Thermal / power effect on real hardware | **Not measured** — the test laptop exposes no thermal sensor to user-space software |

### Not yet verified
- Energy, power, or cost savings of any kind (no measurement exists yet)
- Thermal benefit on real hardware
- The Rust Criterion.rs micro-benchmark suite (configured, not yet run)
- Any third-party or independent audit

---

## 💾 Quezar Storage Vault: Zstandard Compression + AES-256-GCM

### RFC 8878 Zstandard Dictionary Acceleration
* Pre-trained dictionaries tuned for LLM tool invocations, audit events, and JSON schemas
* Measured **8–12.7× on structured data** (JSON, SQL, Nginx logs); comparable to gzip -9 on the same datasets, with encryption included
* Up to ~92% size reduction on structured data

### AES-256-GCM Authenticated Envelope Sealing
* 256-bit keys, 96-bit CSPRNG IVs per sector, 128-bit GCM authentication tags
* Tamper-evident: any bit modification triggers immediate authentication failure (verified in the red-team suite)
* Instant cryptographic shredding — no slow multi-pass disk wiping required

### Zero External Dependencies
* 100% in-process. No Redis, MongoDB, PostgreSQL, or SQLite required.

---

## 📊 Benchmark Comparison

| Metric | Unmanaged MCP | Cloud Guardrail API | Maxion |
| :--- | :--- | :--- | :--- |
| **Execution Latency** | 0 ms (no protection) | 150–350 ms (cloud roundtrip) | **12–67 µs (measured)** |
| **Energy / Thermals** | Runaway heat & fan roar | High cloud CPU billing | **Compute pacing (effect not yet measured)** |
| **Storage Footprint** | Bloated JSON (MBs/GBs) | Uncompressed in cloud | **8–12.7× on structured data** |
| **Secret Protection** | Plaintext in config/memory | Plaintext transit to cloud | **AES-256-GCM vault** |
| **External Dependencies** | None | External SaaS accounts | **100% in-process** |

---

## Built For

### 🏢 Engineering Teams & Enterprise
Enforce strict tool execution boundaries and prevent data leaks without slow network hops or ballooning cloud compute bills.

### 💻 Developers & Builders
Run long autonomous workflows overnight without babysitting your terminal.

### ⚡ Power Users & Creators
Run resource-intensive AI agent workloads locally with compute pacing built in.

---

## Coordinated Protection Layers

| Layer | What It Does |
|---|---|
| **Governor** | Paces compute load, designed to prevent thermal throttling during long agent runs |
| **Diamonize** | Scans files and processes for threat signatures; keeps a tamper-evident audit log |
| **Quezar** | Local encrypted vault — Zstandard compression + AES-256-GCM |
| **Security Gate** | Intercepts every tool call in ~12–67 µs to filter injections and block unauthorized actions |

---

## 💰 Pricing — Maxion V16

**Dead-simple pricing. No free trials.**

- **Hourly Access**: **$2.50 / hour** — [purchase hourly](https://architectura18.gumroad.com/l/ygbwen)
- **Maxion Monthly**: **$20 / month** — [get Maxion Monthly](https://architectura18.gumroad.com/l/komab)
- **Risk-Free Guarantee**: Backed by our **30-Day 100% Money-Back Guarantee**.

---

## Quick Install

### 1. In GitHub Actions (GitHub Marketplace)

Add Maxion to any `.github/workflows/*.yml` pipeline to scan your repository for known prompt-injection phrases:

```yaml
- name: Maxion Prompt-Injection Scan
  uses: aruuhii2yo/maxion-mcp@v1.0.4
  with:
    fail-on-threat: 'true'
```

The Action scans entirely inside the runner. It does not pace the runner or measure energy; earlier versions printed energy and disk-write figures that were not measurements, and v1.0.4 removes them.

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
deployment. If it is unset, the bridge still starts and tells your MCP client
exactly what to set, rather than failing with an opaque error.

---

## Links

- **Live Product Page**: [aruuhii2yo.github.io/maxion-mcp](https://aruuhii2yo.github.io/maxion-mcp/)
- **Smithery Listing**: [smithery.ai/server/aruuhii2yo/maxion-mcp-gateway](https://smithery.ai/server/aruuhii2yo/maxion-mcp-gateway)
- **GitHub Marketplace**: [github.com/marketplace/actions/maxion-ai-security-energy-governor](https://github.com/marketplace/actions/maxion-ai-security-energy-governor)
- **Vendor**: J&K Advanced Technologies
