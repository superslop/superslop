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


console.log(`superslop ${VERSION}`)
