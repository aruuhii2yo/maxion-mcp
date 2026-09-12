# Maxion — Zero-Trust Security Gateway for MCP Agents

Maxion is an in-process security layer that inspects every AI-agent tool call before it executes — no network round-trip to a cloud LLM judge, ~15 µs measured p50 versus 150–500 ms for that approach.

This repository is the public listing and documentation front door for Maxion. The gateway itself is closed-source; this repo does not contain the engine implementation.

## What it does

- **Prompt injection detection** — use-vs-mention suppression, localized-density scoring that resists RAG dilution, and evasion coverage for leetspeak, spaced-letter, ROT13, and base64 payloads.
- **Honeypot decoys** — tools designed to look attractive to a hijacked agent; touching one taints the session and is logged, without executing anything real.
- **Attestation fencing** — high-privilege operations require Ed25519 attestation (~160 µs), so a compromised agent can't forge its way into them.

## Engines behind the gate

| Engine | Purpose |
|---|---|
| **Maxion V16** | Autonomous hardware governor — paces compute against live CPU temperature and package power. |
| **Quezar** | AES-256-GCM authenticated encrypted sector storage with Zstandard dictionary compaction and one-way SHA-256 key fingerprints. |
| **Diamonize LSA** | YARA-X host scanning with a tamper-evident SHA-256 hash-chain audit ledger. |

## Install

Maxion is distributed through Smithery:

```bash
npx -y @smithery/cli install aruuhii2yo/maxion-mcp-gateway
```

Or connect any MCP-compatible client (Claude Desktop, Cursor, Windsurf) directly to the hosted endpoint listed on the [Smithery page](https://smithery.ai/server/aruuhii2yo/maxion-mcp-gateway).

Supports Streamable HTTP, SSE, and stdio transports. Free trial per module; a Gumroad license key unlocks continued use after the trial.

## Testing

150 regression checks and 54 adversarial red-team checks run against every release.

## License

Proprietary — see [LICENSE](LICENSE). Source code is not distributed; this repository documents the public interface only.

## Links

- Homepage: [advancedapparchitect.com](https://advancedapparchitect.com)
- Smithery listing: [smithery.ai/server/aruuhii2yo/maxion-mcp-gateway](https://smithery.ai/server/aruuhii2yo/maxion-mcp-gateway)
- Vendor: J&K Advanced Technologies
