#!/bin/bash
# ─── Portfolio Dev Server ───────────────────────────────────────────────────
# รัน: bash start.sh
# หรือ: chmod +x start.sh && ./start.sh
# ────────────────────────────────────────────────────────────────────────────

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo ""
echo "┌─────────────────────────────────────────────┐"
echo "│         3D Portfolio Dev Server             │"
echo "└─────────────────────────────────────────────┘"
echo ""

# ─── ตรวจ .env.local ──────────────────────────────────────────────────────
if [ ! -f ".env.local" ]; then
  echo "⚠  ไม่พบ .env.local — คัดลอกจาก .env.example..."
  cp .env.example .env.local
  echo "✓  สร้าง .env.local แล้ว กรุณาแก้ไข ADMIN_PASSWORD และ ADMIN_JWT_SECRET"
  echo ""
fi

# ─── ตรวจว่าตั้ง ADMIN_PASSWORD แล้วหรือยัง ─────────────────────────────
ADMIN_PASS=$(grep -E "^ADMIN_PASSWORD=" .env.local | cut -d'=' -f2)
if [ -z "$ADMIN_PASS" ]; then
  echo "⚠  ADMIN_PASSWORD ยังไม่ได้ตั้งค่าใน .env.local"
  echo "   กรุณาแก้ไขไฟล์ .env.local ก่อนใช้งาน Admin Panel"
  echo ""
fi

# ─── ตรวจ node_modules ────────────────────────────────────────────────────
if [ ! -d "node_modules" ]; then
  echo "📦 ติดตั้ง dependencies..."
  pnpm install
  echo ""
fi

# ─── แสดง URL ─────────────────────────────────────────────────────────────
echo "🚀 เริ่มต้น dev server..."
echo ""
echo "   Portfolio  →  http://localhost:3000"
echo "   Admin      →  http://localhost:3000/admin"
echo "   Login      →  http://localhost:3000/admin/login"
echo ""
echo "   กด Ctrl+C เพื่อหยุด"
echo "─────────────────────────────────────────────────"
echo ""

pnpm dev
