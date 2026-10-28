#!/usr/bin/env node
// ============================================================================
// 🚀 SUPERSLOP CLI: INTERACTIVE SKILL.MD INSTALLER & SLOP-O-METER ✨
// ============================================================================
// Zero-dependency Node.js (>=18) ESM CLI mirroring the antislop-ai workflow
// in a 100% clean-room superslop way.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import readline from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = fs.existsSync(path.join(__dirname, '..', 'skills', 'superslop', 'SKILL.md'))
  ? path.resolve(__dirname, '..')
  : __dirname

const VERSION = fs.existsSync(path.join(REPO_ROOT, 'VERSION'))
  ? fs.readFileSync(path.join(REPO_ROOT, 'VERSION'), 'utf8').trim()
  : '1.0.0'

const AGENTS = [
  { id: 'antigravity', label: 'Antigravity (agy)', dir: '.agents/skills', globalDir: '.gemini/antigravity/skills', entry: 'GEMINI.md' },
  { id: 'claude', label: 'Claude Code', dir: '.claude/skills', globalDir: '.claude/skills', entry: 'CLAUDE.md' },
  { id: 'cursor', label: 'Cursor', dir: '.cursor/skills', globalDir: '.cursor/skills', entry: 'AGENTS.md' },
  { id: 'codex', label: 'Codex CLI', dir: '.agents/skills', globalDir: '.codex/skills', entry: 'AGENTS.md' },
  { id: 'windsurf', label: 'Windsurf', dir: '.windsurf/skills', globalDir: '.codeium/windsurf/skills', entry: 'AGENTS.md' },
  { id: 'cline', label: 'Cline', dir: '.cline/skills', globalDir: '.cline/skills', entry: 'AGENTS.md' },
  { id: 'opencode', label: 'OpenCode', dir: '.opencode/skills', globalDir: '.config/opencode/skills', entry: 'AGENTS.md' },
  { id: 'kimi', label: 'Kimi CLI', dir: '.kimi/skills', globalDir: '.kimi/skills', entry: 'AGENTS.md' },
]

const EXTRA_SKILLS = [
  { value: 'superslop-ui', label: 'superslop-ui', hint: 'neon purple gradients, glassmorphism, 3-card Bento grids' },
  { value: 'superslop-copywriting', label: 'superslop-copywriting', hint: "'delve into the tapestry', em-dashes, Rule-of-Three" },
  { value: 'superslop-human', label: 'superslop-human', hint: 'ethical WCAG AA neon contrast + slop-check.py' },
  { value: 'superslop-layoutmobile', label: 'superslop-layoutmobile', hint: '7-layer SaaS hero shrine & zero-overflow mobile reflow' },
  { value: 'superslop-code', label: 'superslop-code', hint: 'Captain-Obvious code narration & ASCII megabanners' },
]

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  indigo: '\x1b[38;5;99m',
  purple: '\x1b[38;5;135m',
  pink: '\x1b[38;5;205m',
  cyan: '\x1b[38;5;87m',
  green: '\x1b[38;5;84m',
}

function printBanner() {
  console.log(`\n${c.bold}${c.indigo}  ╔══════════════════════════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.bold}${c.purple}  ║  ✨🚀  S U P E R S L O P   v${VERSION.padEnd(36)} ║${c.reset}`)
  console.log(`${c.bold}${c.pink}  ║  Maximalist AI Cliché Rules for AI Coding Agents                 ║${c.reset}`)
  console.log(`${c.bold}${c.indigo}  ╚══════════════════════════════════════════════════════════════════╝${c.reset}\n`)
}

function copyRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dst, entry.name)
    if (entry.isDirectory()) copyRecursive(s, d)
    else fs.copyFileSync(s, d)
  }
}

function updatePointer(entryPath, skillNames) {
  const start = '<!-- superslop:start -->'
  const end = '<!-- superslop:end -->'
  const block = [
    start,
    '## superslop (Active Parody / Synthetic Maximalism Mode)',
    '',
    'Before generating UI, copywriting, or code comments, read the installed `superslop` skill (`skills/superslop/SKILL.md`).',
    `Installed skills: ${skillNames.join(', ')}.`,
    'Announce `superslop active: <inject|audit> (<global preference|session override>) ✨🚀` once per task.',
    end,
  ].join('\n')

  if (!fs.existsSync(entryPath)) {
    fs.writeFileSync(entryPath, block + '\n', 'utf8')
    return
  }
  const existing = fs.readFileSync(entryPath, 'utf8')
  const sIdx = existing.indexOf(start)
  const eIdx = existing.indexOf(end)
  if (sIdx !== -1 && eIdx !== -1 && eIdx > sIdx) {
    const next = existing.slice(0, sIdx) + block + existing.slice(eIdx + end.length)
    fs.writeFileSync(entryPath, next, 'utf8')
  } else {
    fs.writeFileSync(entryPath, existing.replace(/\s*$/, '\n\n') + block + '\n', 'utf8')
  }
}

function installToTarget(baseDir, entryFile, skills, writeEntry = true) {
  for (const sk of skills) {
    const src = path.join(REPO_ROOT, 'skills', sk)
    const dst = path.join(baseDir, sk)
    copyRecursive(src, dst)
    console.log(`  ${c.green}✓${c.reset} Installed ${c.bold}${sk}${c.reset} → ${dst}`)
  }
  if (writeEntry && entryFile) {
    updatePointer(entryFile, skills)
    console.log(`  ${c.green}✓${c.reset} Updated pointer block in ${c.bold}${entryFile}${c.reset}`)
  }
}

