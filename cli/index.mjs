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

