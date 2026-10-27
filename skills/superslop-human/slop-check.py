#!/usr/bin/env python3
"""
✨🚀 SuperSlop Ethical Contrast & Slop-O-Meter Checker (slop-check.py)
Zero-dependency Python 3 utility for skills/superslop-human.

Usage:
  python3 skills/superslop-human/slop-check.py "#09090b" "#d8b4fe"
  python3 skills/superslop-human/slop-check.py --audit path/to/file_or_dir
"""

import math
import os
import re
import sys
from pathlib import Path


def parse_hex(hex_str: str) -> tuple[float, float, float]:
    cleaned = hex_str.strip().lstrip("#")
    if len(cleaned) != 6 or not re.fullmatch(r"[0-9a-fA-F]{6}", cleaned):
        raise ValueError(f"Invalid hex color: {hex_str!r} (expected #RRGGBB)")
    r = int(cleaned[0:2], 16) / 255.0
    g = int(cleaned[2:4], 16) / 255.0
    b = int(cleaned[4:6], 16) / 255.0
    return r, g, b
