#!/usr/bin/env node
// Maxion MCP Gateway — stdio bridge.
//
// This is a thin, real MCP server: it speaks stdio to the client (Claude
// Desktop, Cursor, any MCP host) and forwards every request to the hosted
// Maxion gateway over Streamable HTTP. The actual engines (Maxion V16,
// Quezar, Diamonize) and the security gate run server-side.
//
// Set MAXION_GATEWAY_URL to the gateway you want to reach, e.g.
//   MAXION_GATEWAY_URL=https://your-host.example.com/mcp
//
// There is deliberately no baked-in default. A hardcoded endpoint that
// stops serving /mcp produces a confusing 404 for every caller; requiring
// an explicit URL fails loudly and tells you what to set instead.

'use strict';

const readline = require('readline');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const GATEWAY_URL = process.env.MAXION_GATEWAY_URL;

const CONFIG_HELP =
  'MAXION_GATEWAY_URL is not set. Point it at a Maxion gateway endpoint, e.g.\n' +
  '  MAXION_GATEWAY_URL=https://your-host.example.com/mcp\n' +
  'See https://github.com/aruuhii2yo/maxion-mcp for hosting options.';

function forward(jsonRpcRequest) {
  return new Promise((resolve, reject) => {
    const target = new URL(GATEWAY_URL);
    const lib = target.protocol === 'https:' ? https : http;
    const body = JSON.stringify(jsonRpcRequest);
    const req = lib.request(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error(`Gateway returned non-JSON response (HTTP ${res.statusCode}): ${data.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  if (!line.trim()) return;
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    return; // not valid JSON-RPC, ignore
  }
  if (!GATEWAY_URL) {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id: request.id ?? null,
      error: { code: -32001, message: CONFIG_HELP },
    }) + '\n');
    return;
  }
  try {
    const response = await forward(request);
    process.stdout.write(JSON.stringify(response) + '\n');
  } catch (err) {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id: request.id ?? null,
      error: { code: -32000, message: `Cannot reach Maxion gateway at ${GATEWAY_URL} — ${err.message}` },
    }) + '\n');
  }
});

if (GATEWAY_URL) {
  process.stderr.write(`Maxion MCP stdio bridge started, forwarding to ${GATEWAY_URL}\n`);
} else {
  process.stderr.write(`Maxion MCP stdio bridge: ${CONFIG_HELP}\n`);
}
