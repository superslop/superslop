#!/usr/bin/env node
// Launches the zero-dependency Python MCP server for superslop-human
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const scriptPath = path.resolve(__dirname, '..', 'skills', 'superslop-human', 'slop-mcp.py')

const child = spawn('python3', [scriptPath], { stdio: 'inherit' })
child.on('exit', (code) => process.exit(code ?? 0))
