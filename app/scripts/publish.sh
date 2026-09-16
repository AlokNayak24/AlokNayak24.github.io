#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."          # -> app/
npm run build

ROOT="../"                        # -> alok/
rm -rf "$ROOT/css" "$ROOT/javascript"   # old hand-written site, fully replaced
cp dist/index.html "$ROOT/index.html"
cp dist/case-study.html "$ROOT/case-study.html"
rm -rf "$ROOT/assets"
cp -R dist/assets "$ROOT/assets"
# Deliberately NOT copying dist/img, dist/resume, dist/logo — the real files
# already live at $ROOT/img, $ROOT/resume, $ROOT/logo and must never be touched.
echo "Published. Run 'git status' in the repo root to review before committing."
