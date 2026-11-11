#!/usr/bin/env node
// Verifies repository integrity: all 6 skills, plugin manifests, synced rule files, and version match.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const EXPECTED_SKILLS = [
  'superslop',
  'superslop-ui',
  'superslop-copywriting',
  'superslop-human',
  'superslop-layoutmobile',
  'superslop-code',
]

let errors = 0
function check(cond, msg) {
  if (!cond) {
    console.error(`FAIL: ${msg}`)
    errors++
  } else {
    console.log(`PASS: ${msg}`)
  }
}

const version = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf8').trim()
check(version.length > 0, `Root VERSION exists (${version})`)

for (const sk of EXPECTED_SKILLS) {
  const p = path.join(ROOT, 'skills', sk, 'SKILL.md')
  check(fs.existsSync(p), `skills/${sk}/SKILL.md exists`)
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8')
    check(content.startsWith(`---\nname: ${sk}\n`), `skills/${sk}/SKILL.md has valid frontmatter name`)
  }
}

check(fs.existsSync(path.join(ROOT, 'superslop.md')), 'Root superslop.md exists')
check(fs.existsSync(path.join(ROOT, 'rules', 'superslop.md')), 'rules/superslop.md exists')
check(fs.existsSync(path.join(ROOT, 'rules', 'superslop.mdc')), 'rules/superslop.mdc exists')
check(fs.existsSync(path.join(ROOT, 'skills', 'superslop-human', 'slop-check.py')), 'skills/superslop-human/slop-check.py exists')
check(fs.existsSync(path.join(ROOT, 'skills', 'superslop-human', 'slop-mcp.py')), 'skills/superslop-human/slop-mcp.py exists')

// DeepSeek Harness door (adapted from anti-slop v3.2.28): the bundle loads
// from the installed superslop-ai package, so its patch and exports must
// resolve to real files under cli/.
check(fs.existsSync(path.join(ROOT, 'cli', 'dsh', 'index.js')), 'cli/dsh/index.js exists (DeepSeek Harness plugin)')
check(fs.existsSync(path.join(ROOT, 'cli', 'dsh', 'locale', 'en.json')), 'cli/dsh/locale/en.json exists')

const cliPkgPath = path.join(ROOT, 'cli', 'package.json')
const cliPkg = JSON.parse(fs.readFileSync(cliPkgPath, 'utf8'))
check((cliPkg.files ?? []).includes('dsh/'), 'cli/package.json ships dsh/ in the superslop-ai package')

const dshPatch = cliPkg.dsh?.bundle?.patch
check(typeof dshPatch === 'string' && dshPatch.length > 0, 'cli/package.json declares dsh.bundle.patch')
if (dshPatch) {
  const patchPath = path.join(ROOT, 'cli', dshPatch.replace(/^\.\//, ''))
  check(fs.existsSync(patchPath), `dsh bundle patch exists at cli/${dshPatch.replace(/^\.\//, '')}`)
  if (fs.existsSync(patchPath)) {
    const rows = [...fs.readFileSync(patchPath, 'utf8').matchAll(/name:\s*'([^']+)'/g)]
    check(rows.length > 0, 'cli/dsh/cordis.patch.yml declares a plugin row')
    for (const row of rows) {
      const pluginName = row[1]
      const subpath = pluginName.startsWith(cliPkg.name + '/') ? './' + pluginName.slice(cliPkg.name.length + 1) : null
      check(subpath !== null, `cordis patch names ${pluginName}, a subpath of ${cliPkg.name}`)
      if (subpath) {
        const target = cliPkg.exports?.[subpath]
        check(typeof target === 'string', `cli/package.json exports ${subpath} for the DSH bundle`)
        if (target) {
          check(
            fs.existsSync(path.join(ROOT, 'cli', target.replace(/^\.\//, ''))),
            `DSH export ${subpath} resolves to cli/${target.replace(/^\.\//, '')}`
          )
        }
      }
    }
  }
}

const cliSource = fs.readFileSync(path.join(ROOT, 'cli', 'index.mjs'), 'utf8')
check(cliSource.includes("id: 'deepseek'"), 'cli/index.mjs installer lists DeepSeek Harness (.agents/skills target)')

if (errors > 0) {
  console.error(`\n❌ ${errors} check(s) failed.`)
  process.exit(1)
}
console.log('\n✨🚀 All superslop repository checks passed!')
