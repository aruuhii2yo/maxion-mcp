/**
 * Maxion GitHub Action Runner
 *
 * Scans the workspace for known prompt-injection phrases and fails the step
 * when one is found (unless fail-on-threat is false).
 *
 * What it does NOT do: it does not pace or throttle the CI runner, and it
 * does not measure energy, temperature, or disk I/O. Earlier versions printed
 * an energy-saved figure (derived from the file count) and a fixed disk-write
 * reduction percentage -- neither was a measurement, so both are gone.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// No default gateway: the scan runs entirely inside the runner. A gateway is
// only contacted if the workflow passes one explicitly.
const gatewayUrl = (process.env['INPUT_GATEWAY-URL'] || '').trim();
const scanPath = process.env['INPUT_SCAN-PATH'] || '.';
const failOnThreat = (process.env['INPUT_FAIL-ON-THREAT'] || 'true').toLowerCase() === 'true';
const energyPacingRequested = (process.env['INPUT_ENERGY-PACING'] || 'false').toLowerCase() === 'true';

console.log('---------------------------------------------------------');
console.log('MAXION PROMPT-INJECTION SCAN');
console.log('---------------------------------------------------------');
console.log(`[+] Scan Target    : ${scanPath}`);
console.log(`[+] Fail On Threat : ${failOnThreat}`);
if (energyPacingRequested) {
  console.log('[i] energy-pacing is set, but this Action does not pace CI runners; the input has no effect.');
}

// Known prompt injection heuristics
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /system\s+prompt\s+override/i,
  /bypass\s+safety\s+guidelines/i,
  /you\s+are\s+now\s+in\s+dan\s+mode/i,
  /disregard\s+all\s+prior\s+prompts/i,
  /output\s+your\s+initial\s+instructions/i,
  /reveal\s+hidden\s+system\s+token/i
];

function scanFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['.git', 'node_modules', '.cache', 'dist', 'build'].includes(entry.name)) {
        scanFilesRecursively(fullPath, fileList);
      }
    } else if (/\.(md|txt|json|yaml|yml|js|ts|py|prompt)$/i.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function pingGateway(targetUrl) {
  return new Promise((resolve) => {
    try {
      const u = new URL(`${targetUrl.replace(/\/$/, '')}/health`);
      const lib = u.protocol === 'https:' ? https : http;
      const req = lib.get(u, { timeout: 4000, headers: { 'User-Agent': 'Maxion-GitHub-Action/1.1' } }, (res) => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => { req.destroy(); resolve(false); });
    } catch {
      resolve(false);
    }
  });
}

async function run() {
  console.log('\n[1/2] Scanning workspace for known prompt-injection phrases...');
  const files = scanFilesRecursively(scanPath);
  console.log(`[+] Inspecting ${files.length} candidate files.`);

  let threatsDetected = 0;
  const flagged = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      for (const pattern of INJECTION_PATTERNS) {
        if (pattern.test(content)) {
          threatsDetected++;
          flagged.push({ file, pattern: pattern.toString() });
          console.warn(`[!] Injection phrase found in ${file} matching ${pattern}`);
          break;
        }
      }
    } catch {
      // Ignore unreadable files
    }
  }

  let gatewayOnline = null;
  if (gatewayUrl) {
    console.log('\n[2/2] Checking the configured Maxion gateway...');
    gatewayOnline = await pingGateway(gatewayUrl);
    console.log(`[+] Gateway ${gatewayUrl}: ${gatewayOnline ? 'reachable' : 'NOT reachable'}`);
  } else {
    console.log('\n[2/2] No gateway-url configured; scan ran entirely inside this runner.');
  }

  // Set GitHub Action Outputs
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    fs.appendFileSync(outputFile, `status=${threatsDetected === 0 ? 'passed' : 'quarantined'}\n`);
    fs.appendFileSync(outputFile, `threats-intercepted=${threatsDetected}\n`);
  }

  // Set Step Summary
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    const gatewayRow = gatewayUrl
      ? `| **Gateway** | ${gatewayOnline ? '🟢 Reachable' : '🔴 Not reachable'} | ${gatewayUrl} |\n`
      : '';
    const summary = `
## Maxion Prompt-Injection Scan

| Check | Status | Result |
| :--- | :--- | :--- |
| **Injection scan** | ${threatsDetected === 0 ? '🟢 PASSED' : '🔴 FLAGGED'} | **${threatsDetected}** file(s) matched a known injection phrase |
| **Files scanned** | 🔍 Complete | **${files.length}** |
${gatewayRow}
${flagged.length > 0 ? `### ⚠️ Flagged files\n${flagged.map(f => `- \`${f.file}\`: matched \`${f.pattern}\``).join('\n')}` : '> No known injection phrases found. This is a pattern scan for known phrasing; it does not detect novel attacks.'}
`;
    fs.appendFileSync(summaryFile, summary);
  }

  if (threatsDetected > 0 && failOnThreat) {
    console.error(`\n[FAIL] ${threatsDetected} file(s) matched a known prompt-injection phrase. Failing step.`);
    process.exit(1);
  }

  console.log(`\n[DONE] Scan complete: ${threatsDetected} file(s) flagged.\n`);
}

run().catch((err) => {
  console.error('[FATAL ERROR]', err.message);
  process.exit(1);
});
