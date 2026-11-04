#!/usr/bin/env python3
from pathlib import Path
import json,hashlib,re
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'assets_manifest.json').read_text())
for name, meta in data['assets'].items():
 p=root/name
 assert p.is_file(), f'Missing: {name}'
 assert p.stat().st_size==meta['size'],f'Size mismatch: {name}'
 assert hashlib.sha256(p.read_bytes()).hexdigest()==meta['sha256'],f'Hash mismatch: {name}'
for page in root.glob('*.html'):
 txt=page.read_text()
 for ref in re.findall(r'(?:src|href)="(/(?:assets|js|css|icons)/[^"]+)"',txt):
  assert (root/ref[1:]).is_file(),f'{page.name}: missing {ref}'
print(f"OK: {len(data['assets'])} assets and referenced scripts/styles")
