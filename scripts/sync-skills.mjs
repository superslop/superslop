#!/usr/bin/env node
// Syncs skills/superslop/SKILL.md to root superslop.md, rules/superslop.md,
// rules/superslop.mdc, and copies skills/ into cli/skills/ when needed.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const coreSkillPath = path.join(ROOT, 'skills', 'superslop', 'SKILL.md')
const rawCore = fs.readFileSync(coreSkillPath, 'utf8')

// Strip YAML frontmatter for standalone superslop.md and rules/superslop.md
const stripped = rawCore.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')

fs.writeFileSync(path.join(ROOT, 'superslop.md'), stripped, 'utf8')


console.log('Synced superslop.md from skills/superslop/SKILL.md')
