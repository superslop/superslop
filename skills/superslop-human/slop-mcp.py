#!/usr/bin/env python3
"""
✨🚀 SuperSlop MCP Server (slop-mcp.py)
Zero-dependency JSON-RPC 2.0 stdio MCP server exposing:
  1. superslop_contrast_check(foreground, background)
  2. superslop_audit_text(text)
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import importlib.util

_spec = importlib.util.spec_from_file_location(
    "slop_check", Path(__file__).resolve().parent / "slop-check.py"
)
slop_check = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(slop_check)

TOOLS = [
    {
        "name": "superslop_contrast_check",
        "description": "Verify WCAG 2.2 AA/AAA contrast ratio between two hex colors for SuperSlop neon gradients and dark glass surfaces.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "foreground": {"type": "string", "description": "Foreground hex color (e.g. #d8b4fe)"},
                "background": {"type": "string", "description": "Background hex color (e.g. #09090b)"},
            },
            "required": ["foreground", "background"],
        },
    },
    {
        "name": "superslop_audit_text",
        "description": "Score a snippet of prose, UI code, or source code for SuperSlop Synthetic Density (0-100).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "text": {"type": "string", "description": "Text or code to score for SuperSlop tropes"},
            },
            "required": ["text"],
        },
    },
]

