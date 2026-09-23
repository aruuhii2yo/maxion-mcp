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
//
// Unconfigured, the bridge still completes the MCP handshake (initialize,
// ping, an empty tools/list) and returns setup instructions, so clients and
// registries see a working server that explains what it needs rather than
// one that fails before it can say anything. Every other request gets the
// same instructions as an error.

'use strict';

const readline = require('readline');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { version: PKG_VERSION } = require('./package.json');

const GATEWAY_URL = process.env.MAXION_GATEWAY_URL;
const SERVER_INFO = { name: 'maxion-mcp', version: PKG_VERSION };
const DEFAULT_PROTOCOL_VERSION = '2025-06-18';

const CONFIG_HELP =
  'MAXION_GATEWAY_URL is not set. Point it at a Maxion gateway endpoint, e.g.\n' +
  '  MAXION_GATEWAY_URL=https://your-host.example.com/mcp\n' +
  'See https://github.com/aruuhii2yo/maxion-mcp for hosting options.';

// JSON-RPC: a message without an "id" member is a notification and must
// never get a response.
function isNotification(msg) {
  return !Object.prototype.hasOwnProperty.call(msg, 'id');
}

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

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
        if (!data.trim()) return resolve(null); // e.g. 202 Accepted for a notification
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

// What the bridge answers itself when no gateway is configured.
function answerUnconfigured(request) {
  switch (request.method) {
    case 'initialize':
      return {
        result: {
          protocolVersion: (request.params && request.params.protocolVersion) || DEFAULT_PROTOCOL_VERSION,
          capabilities: { tools: {} },
          serverInfo: SERVER_INFO,
          instructions: CONFIG_HELP,
        },
      };
    case 'ping':
      return { result: {} };
    case 'tools/list':
      return { result: { tools: [] } };
    default:
      return { error: { code: -32001, message: CONFIG_HELP } };
  }
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
  const notification = isNotification(request);

  if (!GATEWAY_URL) {
    if (notification) return;
    send({ jsonrpc: '2.0', id: request.id, ...answerUnconfigured(request) });
    return;
  }

  try {
    const response = await forward(request);
    if (!notification && response) send(response);
  } catch (err) {
    if (notification) {
      process.stderr.write(`Maxion bridge: notification ${request.method} not delivered — ${err.message}\n`);
      return;
    }
    send({
      jsonrpc: '2.0',
      id: request.id,
      error: { code: -32000, message: `Cannot reach Maxion gateway at ${GATEWAY_URL} — ${err.message}` },
    });
  }
});

if (GATEWAY_URL) {
  process.stderr.write(`Maxion MCP stdio bridge started, forwarding to ${GATEWAY_URL}\n`);
} else {
  process.stderr.write(`Maxion MCP stdio bridge: ${CONFIG_HELP}\n`);
}
