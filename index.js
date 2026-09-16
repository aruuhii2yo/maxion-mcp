#!/usr/bin/env node
// Maxion MCP Gateway — stdio bridge.
//
// This is a thin, real MCP server: it speaks stdio to the client (Claude
// Desktop, Cursor, any MCP host) and forwards every request to the hosted
// Maxion gateway over Streamable HTTP. The actual engines (Maxion V16,
// Quezar, Diamonize) and the security gate run server-side.
//
// Configure the target with MAXION_GATEWAY_URL if pointing at a custom
// deployment. The default is the primary live Azure Container App gateway.

'use strict';

const readline = require('readline');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const GATEWAY_URL = process.env.MAXION_GATEWAY_URL || 'https://maxion-gateway.victoriousbush-db34cb90.eastus.azurecontainerapps.io/mcp';

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
  try {
    const response = await forward(request);
    process.stdout.write(JSON.stringify(response) + '\n');
  } catch (err) {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id: request.id ?? null,
      error: { code: -32000, message: `Bridge error: ${err.message}` },
    }) + '\n');
  }
});

process.stderr.write(`Maxion MCP stdio bridge started, forwarding to ${GATEWAY_URL}\n`);
